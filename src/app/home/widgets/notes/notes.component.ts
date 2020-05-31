import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  allItems: any = [
    { label: "Ridwanul Hafiz - 16/03/2020", body: 'this is a test' },
    { label: "Ridwanul Hafiz - 16/03/2020", body: 'this is <br/> a test' },
    { label: "Ridwanul Hafiz - 16/03/2020", body: 'this is <br/> a test' },
    { label: "Ridwanul Hafiz - 16/03/2020", body: 'this is a test' },
    { label: "Ridwanul Hafiz - 16/03/2020", body: 'this is a test' },
    { label: "Ridwanul Hafiz - 16/03/2020", body: 'this is <br/> a test' },
    { label: "Ridwanul Hafiz - 16/03/2020", body: 'this is a test' },
    { label: "Ridwanul Hafiz - 16/03/2020", body: 'this is a test' },
    { label: "Ridwanul Hafiz - 16/03/2020", body: 'this is a test' },
    { label: "Ridwanul Hafiz - 16/03/2020", body: 'this is a test' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
