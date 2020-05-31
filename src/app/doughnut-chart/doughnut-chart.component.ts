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
  
  chart: any;
  
  mySubscription: any;
  
  public doughnutChartOptions = {
    legend: {
      display: false
    }
  };
  
  public doughnutChartColors: Array<any> = [
    { 
      backgroundColor: [
        'rgba(254, 11, 48, 1)',
        'rgba(86, 223, 144, 1)',
        'rgba(186, 223, 86, 1)',
        'rgba(191, 86, 223, 1)',
        'rgba(235, 5, 5, 1)',
        'rgba(43, 203, 186, 1)',
        'rgba(5, 235, 235, 1)',
        'rgba(169, 86, 223, 1)',
        'rgba(252, 92, 101, 1)',
        'rgba(86, 160, 223, 1)',
        'rgba(102, 86, 223, 1)',
        'rgba(223, 86, 218, 1)'
      ]
    }
  ];
  
  timeFrame: string;
  
  constructor(
    private caseService: CasesService
  ) { 
    
  }
  
  ngOnInit(): void {  
    this.timeFrame = '-1 month';
    this.getCaseTypeStats();
  }
  
  ngAfterViewInit() { }
  
  getCaseTypeStats(): void {
    this.caseService.getCaseTypeStats( this.timeFrame )
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