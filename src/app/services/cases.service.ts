import { Injectable } from '@angular/core';
import { Case } from '../model/case';
import { PaginatedCases } from '../model/paginated-cases';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CasesService {
  caseUrl = `${environment.laravelApiUrl}/api/cases/paginated`;
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
  
  getCase(id: number): Observable<Case> {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({
        fromObject: { id: id.toString() }
      })
    };
    this.options.headers = this.options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.get<Case>(`${environment.laravelApiUrl}/api/case/get-by-id`, this.options)
      .pipe(
        tap(_ => console.log('fetched cases...')),
        catchError(this.handleError<any>('getCase', []))
      );
  }
  
  setCaseStatus(id: number, status: string): Observable<string> {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({
        fromObject: { id: id.toString(), status: status }
      })
    };
    this.options.headers = this.options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.post<any>(
      `${environment.laravelApiUrl}/api/case/set-status`,
      { id: id.toString(), status: status },
      this.options
    )
      .pipe(
        tap(_ => console.log('set case status...')),
        catchError(this.handleError<any>('setCaseStatus', []))
      );
  }
  
  setCaseStar(id: number, star: number): Observable<string> {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    this.options.headers = this.options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.post<any>(
      `${environment.laravelApiUrl}/api/case/set-star`,
      { id: id.toString(), starStatus: star.toString() },
      this.options
    )
      .pipe(
        tap(_ => console.log('set case star...')),
        catchError(this.handleError<any>('setCaseStar', []))
      );
  }
  
  createCase(data: any): Observable<any> {
    this.options = {
      headers: new HttpHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      })
    };
    this.options.headers = this.options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.post<any>(
      `${environment.laravelApiUrl}/api/case/create-new`,
      data,
      this.options
    )
      .pipe(
        tap(_ => console.log('create new case status...')),
        catchError(this.handleError<any>('createCase', []))
      );
  }
  
  getPaginatedCases(count: number, page: number, keywords: string): Observable<PaginatedCases> {
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
          keywords: keywords,
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
  
  getCaseTypeStats(period: string): Observable<any> {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams({
        fromObject: { period: period }
      })
    };
    
    this.options.headers = this.options.headers.append('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    return this.http.get<any>(`${environment.laravelApiUrl}/api/cases/get-type-stats`, this.options)
      .pipe(
        tap(_ => console.log('fetched case type stats...')),
        catchError(this.handleError<any>('getCaseTypeStats', []))
        
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
