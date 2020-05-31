import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action-items',
  templateUrl: './action-items.component.html',
  styleUrls: ['./action-items.component.scss']
})
export class ActionItemsComponent implements OnInit {
  allItems: any = [
    { label: "Overdue Cases", count: 114 },
    { label: "Asset Warranty Expiring", count: 9 },
    { label: "Pending Bookings", count: 387 },
    { label: "Maintenance Requests", count: 145 },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
