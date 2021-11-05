import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ILoginRequest } from '../model/ILoginRequest';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IRefreshTokenRequest } from '../model/IRefreshTokenRequest';
import { IRefreshTokenResponse } from '../model/IRefreshTokenResponse';
import { map, tap } from 'rxjs/operators';
import { AuthStoreService, IUserState } from './auth-store.service';
import { HEADER_AUTH, HEADER_REFRESH, LS_AUTH_TOKEN, LS_REFRESH_TOKEN, URL_LOGIN } from '../../shared/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private authStore: AuthStoreService,
    private router: Router
  ) {
  }

  login(request: ILoginRequest): Observable<void> {
    return this.http.post<void>(environment.apiBaseUrl + 'login', request, {observe: 'response'}).pipe(
      tap(res => {
        localStorage.setItem(LS_AUTH_TOKEN, res.headers.get(HEADER_AUTH));
        localStorage.setItem(LS_REFRESH_TOKEN, res.headers.get(HEADER_REFRESH));
      }),
      map(res => res.body)
    );
  }

  refresh(request: IRefreshTokenRequest): Observable<IRefreshTokenResponse> {
    return this.http.post<IRefreshTokenResponse>(environment.apiBaseUrl + 'refresh', request).pipe(
      tap(res => {
        localStorage.setItem(LS_AUTH_TOKEN, res.authToken);
        localStorage.setItem(LS_REFRESH_TOKEN, res.refreshToken);
      })
    );
  }

  getMe(): Observable<IUserState> {
    return this.http.get<IUserState>(environment.apiBaseUrl + 'me').pipe(
      tap(me => this.authStore.setMe(me))
    );
  }

  getAccessToken(): string {
    return localStorage.getItem(LS_AUTH_TOKEN);
  }

  getRefreshToken(): string {
    return localStorage.getItem(LS_REFRESH_TOKEN);
  }

  isLoggedIn(): boolean {
    return !!this.authStore.me;
  }

  logout(): void {
    this.authStore.clearState();
    localStorage.clear();
    this.router.navigateByUrl(URL_LOGIN);
  }
}
