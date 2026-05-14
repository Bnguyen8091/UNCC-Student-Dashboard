import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Check for the token
    if (token) {
      console.log('AuthGuard: Token found, allowing access.');
      return true; // Allow access if token exists
    }
    console.warn('AuthGuard: No token found, redirecting to login.');
    this.router.navigate(['/login']); // Redirect to login if no token
    return false;
  }
}
