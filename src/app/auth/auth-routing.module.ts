import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { MainComponent } from './page/main/main.component';

const routes: Routes = [
  {
    path: 'login', component: MainComponent,
    children: [
      {path: '', component: LoginComponent, pathMatch: 'full'},
      {path: '**', redirectTo: 'login', pathMatch: 'full'}
    ]
  },
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
