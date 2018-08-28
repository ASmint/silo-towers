import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Indicator } from '../models/indicator.model';

@Injectable()
export class TowersService {

  private apiUrl = 'api/indicators';

  constructor(private _http: HttpClient) { }

  getIndicators(): Observable<Indicator[]> {
    return this._http.get<Indicator[]>(this.apiUrl)
      .pipe(
        tap(indicators => console.log('recieve data')),
        catchError(this.handleError('getIndicators', []))
      );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
