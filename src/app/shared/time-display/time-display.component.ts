import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-time-display',
  templateUrl: './time-display.component.html',
  styleUrls: ['./time-display.component.scss']
})
export class TimeDisplayComponent implements OnInit {
  name = 'Angular';
  time = new Date();
  timer;

  ngOnInit() {
    this.timer = setInterval(() => {
      this.time = new Date();
    }, 30000);
  }

  ngOnDestroy(){
    clearInterval(this.timer);
  }
}
