import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { catchError, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) {
  }

  isRefreshing = false;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getAccessToken();
    if (token) {
      return next.handle(this.addTokenToRequest(request, token))
        .pipe(
          catchError(this.retryOnTokenExpired(request, next)),
          tap({
            error: (err: HttpErrorResponse) => {
              if (err.status === 401) {
                this.logout();
              }
            }
          })
        );
    }
    return next.handle(request);
  }

  addTokenToRequest(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
    return request.clone({
      setHeaders: {
        Authorization: token
      }
    });
  }

  retryOnTokenExpired(request: HttpRequest<unknown>, next: HttpHandler): (response: any) => Observable<any> {
    return response => {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        const refreshToken = this.authService.getRefreshToken();
        if (response.status === 401 && !refreshToken || response.status !== 401) {
          throw response;
        }
        return this.authService.refresh({token: refreshToken}).pipe(
          mergeMap(res => next.handle(this.addTokenToRequest(request, res.authToken))),
        );
      } else {
        return next.handle(request);
      }
    };
  }

  private logout(): void {
    this.authService.logout();
  }
}
