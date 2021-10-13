import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { PriceListComponent } from './page/price-list/price-list.component';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {path: '', component: PriceListComponent, pathMatch: 'full'},
      {path: '**', component: PriceListComponent, pathMatch: 'full'}
    ],
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PriceRoutingModule {
}
