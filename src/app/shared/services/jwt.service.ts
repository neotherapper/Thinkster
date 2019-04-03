import { Injectable } from '@angular/core';

@Injectable()
export class JwtService {

  destroyToken(): void {
    window.localStorage.removeItem('jwtToken');
  }

  getToken(): string {
    return window.localStorage.jwtToken;
  }

  saveToken(token: string): void {
    window.localStorage.jwtToken = token;
  }
}
