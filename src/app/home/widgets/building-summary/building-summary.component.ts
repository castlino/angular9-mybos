import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-building-summary',
  templateUrl: './building-summary.component.html',
  styleUrls: ['./building-summary.component.scss']
})
export class BuildingSummaryComponent implements OnInit {
  allItems: any = [
    { label: "Residents", count: 38 },
    { label: "Assets", count: 208 },
    { label: "Contractors", count: 7 },
    { label: "Active Cases", count: 114 },
    { label: "Work Orders Sent", count: 6 },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
