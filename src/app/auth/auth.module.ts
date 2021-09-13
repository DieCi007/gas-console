import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { MainComponent } from './page/main/main.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { ButtonModule, CardModule, InputFieldModule, SpinnerModule } from 'g-ui';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MainComponent, LoginComponent],
    imports: [
        CommonModule,
        RouterModule,
        AuthRoutingModule,
        CardModule,
        InputFieldModule,
        ButtonModule,
        ReactiveFormsModule,
        SpinnerModule
    ]
})
export class AuthModule {
}
