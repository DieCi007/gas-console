import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule)},
  {path: 'stations', loadChildren: () => import('./station/station.module').then(mod => mod.StationModule)},
  {path: 'prices', loadChildren: () => import('./price/price.module').then(mod => mod.PriceModule)},
  {path: 'fuels', loadChildren: () => import('./fuel/fuel.module').then(mod => mod.FuelModule)},
  {path: '**', redirectTo: 'stations', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
