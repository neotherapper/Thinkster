import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { User } from '../models';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { JwtService } from './jwt.service';

@Injectable()
export class UserService {
  private currentUserSubject = new BehaviorSubject<User>(new User());
  public currentUser = this.currentUserSubject.asObservable()
    .pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.get('/user')
        .subscribe(
          data => {
            this.setAuth(data.user);
          },
          err => {
            this.purgeAuth();
          }
        );
    } else {
      this.purgeAuth();
    }
  }

  setAuth(user: User) {
    this.jwtService.saveToken(user.token);
    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(new User());
    this.isAuthenticatedSubject.next(false);
  }

  attemptAuth(type: string, credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    return this.apiService.post('/users' + route, {user: credentials})
      .pipe(
        map(
          data => {
            this.setAuth(data.user);
            return data;
          }
        )
      );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

}
