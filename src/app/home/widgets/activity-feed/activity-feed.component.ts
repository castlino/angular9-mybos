import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-feed',
  templateUrl: './activity-feed.component.html',
  styleUrls: ['./activity-feed.component.scss']
})
export class ActivityFeedComponent implements OnInit {
  allItems: any = [
    { date: "30/05/2020", activities: [{ time: "12:05pm", activity: "Update case 291 status", user: "Demo Manager" }] },
    { date: "30/05/2020", activities: [{ time: "12:05pm", activity: "Update case 291 status", user: "Demo Manager" }] },
    { date: "30/05/2020", activities: [
        { time: "12:05pm", activity: "Update case 291 status", user: "Demo Manager" },
        { time: "1:30pm", activity: "Remove attachment 2639191 from case 295 ", user: "Facility Manager" }
      ] 
    },
    { date: "30/05/2020", activities: [{ time: "12:05pm", activity: "Update case 291 status", user: "Demo Manager" }] },
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}
