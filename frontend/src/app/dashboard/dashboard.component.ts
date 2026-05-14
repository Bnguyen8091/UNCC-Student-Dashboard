import { Component, OnInit } from '@angular/core';
import { NewsService, NewsArticle } from '../services/news.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  newsArticles: NewsArticle[] = [];
  errorMessage = '';
  loading = true;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getNews().subscribe({
      next: (articles) => {
        this.newsArticles = articles;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load news. Please try again later.';
        this.loading = false;
      },
    });
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src =
      'https://inside.charlotte.edu/wp-content/themes/wp-epsilon-theme-main/images/default-post-avatar-1x1.png';
  }

  openNewsHub(): void {
    window.open('https://inside.charlotte.edu/news-features/', '_blank');
  }
}
