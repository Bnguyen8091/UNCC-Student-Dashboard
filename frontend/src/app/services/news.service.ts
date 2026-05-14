import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface NewsArticle {
  title: string;
  summary: string;
  imageUrl: string;
  link: string;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsArticle[]> {
    return this.http.get<NewsArticle[]>(`${this.baseUrl}/news`).pipe(
      catchError((error) => throwError(() => error))
    );
  }
}
