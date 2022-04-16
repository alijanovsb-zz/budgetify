import { Inject, Injectable } from '@angular/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.httpClient
      .post('http://localhost:3000/users/login', credentials)
      .pipe(tap((res: any) => this.setSession(res)));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('expiresAt');
  }

  isLoggedIn(): boolean {
    return new Date().getTime() < Number(localStorage.getItem('expiresAt'));
  }

  getToken(): string {
    return localStorage.getItem('token') || 'N/A';
  }

  private setSession(authResult: any): void {
    localStorage.setItem('token', authResult.token);
    let tokenTime = JSON.parse(atob(authResult.token.split('.')[1]));
    tokenTime = tokenTime.exp * 1000;
    localStorage.setItem('expiresAt', tokenTime.toString());
  }
}
