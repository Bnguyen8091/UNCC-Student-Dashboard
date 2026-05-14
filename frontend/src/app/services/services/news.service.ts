import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private baseUrl = 'http://127.0.0.1:3000/news'; // API endpoint for fetching news

  constructor(private http: HttpClient) {}

  getNews(): Observable<NewsArticle[]> {
    return this.http.get<NewsArticle[]>(this.baseUrl);
  }
}
