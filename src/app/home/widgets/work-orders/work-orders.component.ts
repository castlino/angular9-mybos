import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss']
})
export class WorkOrdersComponent implements OnInit {
  allItems: any = [
    { label: "WO#281 - A", title: 'ABC Roofing' },
    { label: "WO#294 - A", title: 'ABC Plumbing' },
    { label: "WO#192 - A", title: 'Kone Elevators' },
    { label: "WO#278 - A", title: 'ABC Roofing' },
    { label: "WO#258 - A", title: 'Bells Locksmits' },
    { label: "WO#723 - A", title: 'Aplus Electrical' },
    { label: "WO#281 - A", title: 'ABC Roofing' },
    { label: "WO#294 - A", title: 'ABC Plumbing' },
    { label: "WO#192 - A", title: 'Kone Elevators' },
    { label: "WO#278 - A", title: 'ABC Roofing' },
    { label: "WO#258 - A", title: 'Bells Locksmits' },
    { label: "WO#723 - A", title: 'Aplus Electrical' },
    { label: "WO#281 - A", title: 'ABC Roofing' },
    { label: "WO#294 - A", title: 'ABC Plumbing' },
    { label: "WO#192 - A", title: 'Kone Elevators' },
    { label: "WO#278 - A", title: 'ABC Roofing' },
    { label: "WO#258 - A", title: 'Bells Locksmits' },
    { label: "WO#723 - A", title: 'Aplus Electrical' },
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
