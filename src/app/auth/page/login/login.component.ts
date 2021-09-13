import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BreakpointService } from '../../../shared/service/breakpoint.service';
import { Subscription, throwError } from 'rxjs';
import { catchError, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { AuthStoreService } from '../../service/auth-store.service';
import { LS_AUTH_TOKEN, URL_STATIONS } from '../../../shared/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  mobileStyle = {
    height: '22rem',
    width: '17rem'
  };
  defaultStyle = {
    height: '25rem',
    width: '30rem'
  };
  loading = false;
  hasResolvedLogin = false;

  constructor(
    private fb: FormBuilder,
    private bpService: BreakpointService,
    private authService: AuthService,
    private authStore: AuthStoreService,
    private router: Router,
  ) {
  }

  mobileSubscription: Subscription;

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  style: { [klass: string]: any; } = this.defaultStyle;
  hasLoginError = false;

  ngOnInit(): void {
    this.mobileSubscription = this.bpService.mobile().pipe(
      distinctUntilChanged(),
      tap(bp => bp.matches ? this.style = this.mobileStyle :
        this.style = this.defaultStyle)).subscribe();
    if (!!this.authStore.me || localStorage.getItem(LS_AUTH_TOKEN)) {
      this.router.navigateByUrl(URL_STATIONS).then(() => this.hasResolvedLogin = true);
    } else {
      this.hasResolvedLogin = true;
    }
  }

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    this.loading = true;
    this.authService.login(this.loginForm.value).pipe(
      switchMap(() => this.authService.getMe()),
      catchError(err => {
        this.loading = false;
        return throwError(err);
      }),
      finalize(() => {
        this.loading = false;
        this.router.navigateByUrl(URL_STATIONS);
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.mobileSubscription.unsubscribe();
  }
}
