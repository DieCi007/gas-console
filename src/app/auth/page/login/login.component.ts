import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { BreakpointService } from '../../../shared/service/breakpoint.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { AuthService } from '../../service/auth.service';

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

    constructor(
        private fb: FormBuilder,
        private bpService: BreakpointService,
        private authService: AuthService
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
    }

    get username(): AbstractControl {
        return this.loginForm.get('username');
    }

    get password(): AbstractControl {
        return this.loginForm.get('password');
    }


    onSubmit(): void {
        this.authService.login(this.loginForm.value).pipe(
            switchMap(() => this.authService.getMe())
        ).subscribe();
    }

    ngOnDestroy(): void {
        this.mobileSubscription.unsubscribe();
    }
}
