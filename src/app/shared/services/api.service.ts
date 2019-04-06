import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtService } from './jwt.service';

@Injectable()
export class ApiService {
  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) {}

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: ''
    };

    const token = this.jwtService.getToken();

    if (token) {
      headersConfig.Authorization = `Token ${token}`;
    }

    return new HttpHeaders(headersConfig);
  }

  private handleError(error: HttpErrorResponse) {
    // return an observable with a user-facing error message
    return throwError(error.error);
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders()}
    )
      .pipe(
        catchError(this.handleError),
        map((res: Response) => {
          return res;
        })
      );
  }

  get(path: string, searchParams: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders(), params: searchParams }
    )
      .pipe(
        catchError(this.handleError),
        map((res: Response) => res)
      );
  }

  put(path: string, body: object={}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      {headers: this.setHeaders()}
    )
      .pipe(
        catchError(this.handleError),
        map((res: Response) => res)
      );
  }

}
