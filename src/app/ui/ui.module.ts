import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../../../../gas-angular-ui/dist/g-ui';
import { TooltipModule } from 'primeng/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from 'g-ui';


@NgModule({
    declarations: [],
    exports: [
    ],
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule,
    ReactiveFormsModule,
    InputFieldModule
  ]
})
export class UiModule { }
