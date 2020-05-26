import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Variables
    // authUrl = 'http://localhost:8000/oauth/token';
    // apiUrl = 'http://localhost:8000/api';
    authUrl = 'http://lara7-mybos.test/oauth/token';
    apiUrl = 'http://lara7-mybos.test/api';
    options: any;
    /**
     * Constructor
     * @param http The http client object
     */
    constructor(
      private http: HttpClient
    ) {
      this.options = {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/json'
        })
      };
    }
    
    /**
     * Get an access token
     * @param e The email address
     * @param p The password string
     */
    login(e: string, p: string) {
      return this.http.post(this.authUrl, {
        grant_type: 'password',
        client_id: '2',
        client_secret: `${environment.passportOauthSecretKey}`,
        username: e,
        email: e,
        password: p,
        scope: ''
      }, this.options);
    }
    
    /**
     * Revoke the authenticated user token
     */
    logout() {
      //console.log(localStorage.getItem('access_token'));
      //this.options.headers.Authorization = 'Bearer ' + localStorage.getItem('access_token');
      this.options.headers = this.options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
      return this.http.get(this.apiUrl + '/token/revoke', this.options);
    }
    
}
