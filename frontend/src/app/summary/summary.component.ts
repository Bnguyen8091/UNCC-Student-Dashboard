import { Component } from '@angular/core';
import { ChartConfiguration, ChartType, ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, NgChartsModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent {
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Undergraduate', 'Graduate', 'First-Year', 'Transfer'],
    datasets: [
      {
        label: 'Student Enrollment',
        data: [23981, 6317, 4501, 2348],
        backgroundColor: ['#005035', '#A49665', '#4CAF50', '#8BC34A'],
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  public barChartType: 'bar' = 'bar';

  public barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(0,0,0,0.05)' },
        ticks: { font: { size: 12 } },
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
    },
  };

  navigateToAdmissions(): void {
    window.open('https://admissions.charlotte.edu/explore/', '_blank');
  }
}
