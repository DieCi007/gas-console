import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './page/main/main.component';
import { StationListComponent } from './page/station-list/station-list.component';
import { AuthGuard } from '../auth/auth.guard';
import { UnresolvedStationsComponent } from './page/unresolved-stations/unresolved-stations.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {path: '', component: StationListComponent, pathMatch: 'full'},
      {path: 'unresolved', component: UnresolvedStationsComponent, pathMatch: 'full'},
      {path: '**', component: StationListComponent, pathMatch: 'full'}
    ],
    canActivate: [AuthGuard]
  },
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StationRoutingModule {
}
