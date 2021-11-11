import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FuelRoutingModule } from './fuel-routing.module';
import { MainComponent } from './page/main/main.component';
import { FuelAssignComponent } from './page/fuel-assign/fuel-assign.component';
import { ButtonModule, CardModule, InputFieldModule, SpinnerModule } from 'g-ui';
import { DragDropModule } from 'primeng/dragdrop';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MainComponent, FuelAssignComponent],
  imports: [
    CommonModule,
    FuelRoutingModule,
    CardModule,
    SpinnerModule,
    DragDropModule,
    TooltipModule,
    ReactiveFormsModule,
    InputFieldModule,
    ButtonModule,
    ButtonModule,
    CardModule
  ]
})
export class FuelModule { }
