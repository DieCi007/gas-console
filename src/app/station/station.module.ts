import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationRoutingModule } from './station-routing.module';
import { MainComponent } from './page/main/main.component';
import { StationListComponent } from './page/station-list/station-list.component';
import { UiModule } from '../ui/ui.module';
import { SpinnerModule } from '../../../../gas-angular-ui/dist/g-ui';


@NgModule({
  declarations: [MainComponent, StationListComponent],
  imports: [
    CommonModule,
    StationRoutingModule,
    UiModule,
    SpinnerModule
  ]
})
export class StationModule { }
