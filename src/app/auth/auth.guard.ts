import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './service/auth.service';
import { AuthStoreService } from './service/auth-store.service';
import { map, switchMap } from 'rxjs/operators';
import { LS_AUTH_TOKEN } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private authStore: AuthStoreService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return of(this.authStore.me).pipe(
      map(me => !!me),
      switchMap(isLoggedIn => {
        if (isLoggedIn) {
          return of(isLoggedIn);
        } else if (!localStorage.getItem(LS_AUTH_TOKEN)) {
          this.authService.logout();
          return of(false);
        } else {
          return this.authService.getMe().pipe(
            map(me => !!me)
          );
        }
      })
    );
  }

}
