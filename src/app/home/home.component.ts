import { Component, OnInit, ViewChild } from '@angular/core';
//import { JwtHelperService } from '../services/jwt-helper.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {NgbDateStruct, NgbCalendar, NgbDatepicker} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Variables
  accessToken: any;
  accessTokenDetails: any;
  loading: boolean;
  
  model: NgbDateStruct;
  date: {year: number, month: number};
  @ViewChild('dp') dp: NgbDatepicker;

  constructor(
    //jwtHelper: JwtHelperService,
    private authService: AuthService,
    private router: Router,
    private calendar: NgbCalendar
  ) {
    this.accessToken = localStorage.getItem('access_token');
    // this.accessTokenDetails = {
    //   id: jwtHelper.id(),
    //   name: jwtHelper.name(),
    //   email: jwtHelper.email()
    // };
  }

  ngOnInit(): void { }

  /**
   * Logout the user and revoke his token
   */
  logout(): void {
    this.loading = true;
    this.authService.logout()
      .subscribe(() => {
        this.loading = false;
        localStorage.removeItem('access_token');
        this.router.navigate(['/login']);
      });
  }
  
  selectToday() {
    this.model = this.calendar.getToday();
  }

}