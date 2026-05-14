import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://127.0.0.1:3000/login';  // Backend login URL

  constructor(private http: HttpClient) {}

  // Login method
  login(username: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, { username, password }).pipe(
      tap((response: any) => {
        // Store the access token in localStorage after login
        if (response && response.access_token) {
          localStorage.setItem('token', response.access_token);
        }
      }),
      catchError((error) => {
        // Handle errors
        console.error('Login error:', error);
        return throwError('Invalid credentials or server error');
      })
    );
  }

  // Logout method to clear the token
  logout(): void {
    localStorage.removeItem('token');
  }

  // Check if the user is authenticated (has a valid token)
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;  // Return true if a token exists, false otherwise
  }

  // Optionally, get the current token
  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
