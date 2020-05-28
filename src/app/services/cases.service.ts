import { Injectable } from '@angular/core';
import { Case } from '../model/case';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CasesService {
  caseUrl = 'http://lara7-mybos.test/api/cases';
  options: any;

  constructor(
    private http: HttpClient
  ) { }
  
  getCases(): Observable<Case[]> {
    // Pass authentication token.
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    this.options.headers = this.options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.get<Case[]>(this.caseUrl, this.options)
      .pipe(
        tap(_ => console.log('fetched cases...')),
        catchError(this.handleError<any>('getCases', []))
        
      );
  }
  
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
  
}
