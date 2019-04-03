import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from '../shared';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(
        take(1),
        map(bool => !bool)
      );
  }
}
