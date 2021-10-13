import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuelRoutingModule } from './fuel-routing.module';
import { MainComponent } from './page/main/main.component';
import { FuelAssignComponent } from './page/fuel-assign/fuel-assign.component';
import { CardModule, SpinnerModule } from '../../../../gas-angular-ui/dist/g-ui';
import { DragDropModule } from 'primeng/dragdrop';


@NgModule({
  declarations: [MainComponent, FuelAssignComponent],
  imports: [
    CommonModule,
    FuelRoutingModule,
    CardModule,
    SpinnerModule,
    DragDropModule
  ]
})
export class FuelModule { }
