import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { CasesService } from '../services/cases.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})

export class DoughnutChartComponent {

  doughnutChartLabels: Label[] = ['Other', 'gardening', 'Defects', 'Renovations', 'Cleaning', 'Repair & Maintenance'];
  doughnutChartData: MultiDataSet = [ [0, 0, 0, 0, 0, 0] ];
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartLegend: false;
  
  timeFrame: string;
  
  constructor(
    private caseService: CasesService
  ) { }
  
  ngOnInit(): void {  
    this.timeFrame = '-1 month';
    this.getCaseTypeStats();
  }
  
  getCaseTypeStats(): void {
    this.caseService.getCaseTypeStats(this.timeFrame = '-1 month')
        //.pipe( delay(1000) )  // test loader display by adding delay.
        .subscribe(
          caseTypeStats => {
            console.log(caseTypeStats);
            this.doughnutChartLabels = caseTypeStats.types;
            this.doughnutChartData = [caseTypeStats.percentage];
          }
    );
  }
  
  public onTimeFrameChange() {
    this.getCaseTypeStats();
  }

}