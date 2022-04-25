import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAuthResult } from '../model/auth-model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.httpClient
      .post<IAuthResult>(`${environment.api}users/login`, credentials)
      .pipe(
        tap((res: IAuthResult) => this.setSession(res)),
        catchError((err) => throwError(() => err))
      );
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

  private setSession(authResult: IAuthResult) {
    localStorage.setItem('token', authResult.token);
    let tokenTime = JSON.parse(atob(authResult.token.split('.')[1]));
    tokenTime = tokenTime.exp * 1000;
    localStorage.setItem('expiresAt', tokenTime.toString());
  }
}
