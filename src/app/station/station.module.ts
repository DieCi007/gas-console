import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationRoutingModule } from './station-routing.module';
import { MainComponent } from './page/main/main.component';
import { StationListComponent } from './page/station-list/station-list.component';


@NgModule({
  declarations: [MainComponent, StationListComponent],
  imports: [
    CommonModule,
    StationRoutingModule
  ]
})
export class StationModule { }
