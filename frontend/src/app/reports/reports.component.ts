import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, NgChartsModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent {
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Raised Funds', 'Individual Gifts'],
    datasets: [
      {
        data: [4684513, 6088],
        backgroundColor: ['#005035', '#A49665'],
        hoverBackgroundColor: ['#007a52', '#c4b280'],
        borderWidth: 0,
      },
    ],
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { font: { size: 13 }, padding: 16 },
      },
    },
  };

  public pieChartType: 'pie' = 'pie';
}
