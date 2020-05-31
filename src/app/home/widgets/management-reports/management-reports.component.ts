import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-management-reports',
  templateUrl: './management-reports.component.html',
  styleUrls: ['./management-reports.component.scss']
})
export class ManagementReportsComponent implements OnInit {
  allItems: any = [
    '01/05/2018 - 31/05/2019',
    '01/03/2018 - 31/03/2019',
    '01/05/2018 - 31/05/2018',
    '01/07/2018 - 31/09/2019',
    '01/05/2018 - 31/05/2019',
    '01/03/2018 - 31/03/2019',
    '01/05/2018 - 31/05/2018',
    '01/07/2018 - 31/09/2019',
    '01/05/2018 - 31/05/2019',
    '01/03/2018 - 31/03/2019',
    '01/05/2018 - 31/05/2018',
    '01/07/2018 - 31/09/2019',
    '01/05/2018 - 31/05/2019',
    '01/03/2018 - 31/03/2019',
    '01/05/2018 - 31/05/2018',
    '01/07/2018 - 31/09/2019',
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
