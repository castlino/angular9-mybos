import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {NgbDateStruct, NgbCalendar, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  model: NgbDateStruct;
  date: {year: number, month: number};
  @ViewChild('dp') dp: NgbDatepicker;

  constructor(
    private router: Router,
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
  }
  
  selectToday() {
    this.model = this.calendar.getToday();
  }
  
}
