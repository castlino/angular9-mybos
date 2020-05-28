import { Injectable } from '@angular/core';
import { Case } from '../model/case';
import { PaginatedCases } from '../model/paginated-cases';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CasesService {
  caseUrl = 'http://lara7-mybos.test/api/cases/paginated';
  options: any;

  constructor(
    private http: HttpClient
  ) { }
  
  getCases(): Observable<Case[]> {
    // Pass authentication token. Ref: https://www.tektutorialshub.com/angular/angular-httpheaders/
    this.options = {
      headers: new HttpHeaders({
        //Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({
        fromObject: {
          count: '4',
          page: '2',
        }
      })
      
    };
    this.options.headers = this.options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.get<Case[]>(this.caseUrl, this.options)
      .pipe(
        tap(_ => console.log('fetched cases...')),
        catchError(this.handleError<any>('getCases', []))
        
      );
  }
  
  getPaginatedCases(count: number, page: number): Observable<PaginatedCases> {
    // Pass authentication token. Ref: https://www.tektutorialshub.com/angular/angular-httpheaders/
    this.options = {
      headers: new HttpHeaders({
        //Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({
        fromObject: {
          count: count.toString(),
          page: page.toString(),
        }
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
