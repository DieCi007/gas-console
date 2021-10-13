import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { AuthGuard } from '../auth/auth.guard';
import { FuelAssignComponent } from './page/fuel-assign/fuel-assign.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {path: '', component: FuelAssignComponent, pathMatch: 'full'},
      {path: '**', component: FuelAssignComponent, pathMatch: 'full'}
    ],
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuelRoutingModule {
}
