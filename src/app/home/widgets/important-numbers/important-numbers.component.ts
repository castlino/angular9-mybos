import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-important-numbers',
  templateUrl: './important-numbers.component.html',
  styleUrls: ['./important-numbers.component.scss']
})
export class ImportantNumbersComponent implements OnInit {
  allItems: any = [
    { name: "Yello", number: '0172837465' },
    { name: "John", number: '02 4487 8898' },
    { name: "Shahin", number: '28374687' },
    { name: "Yello", number: '0172837465' },
    { name: "John", number: '02 4487 8898' },
    { name: "Shahin", number: '28374687' },
    { name: "Yello", number: '0172837465' },
    { name: "John", number: '02 4487 8898' },
    { name: "Shahin", number: '28374687' },
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
