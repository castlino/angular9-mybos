import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})

export class DoughnutChartComponent {

  doughnutChartLabels: Label[] = ['Repair & Maintenance', 'Gardening', 'Renovations', 'Quotes', 'Other'];
  doughnutChartData: MultiDataSet = [
    [15, 10, 23, 2, 50]
  ];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartLegend: false;

}