import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)},
  {path: 'stations', loadChildren: () => import('./station/station.module').then(mod => mod.StationModule)},
  {path: '**', redirectTo: 'stations', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
