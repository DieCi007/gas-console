import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { ButtonModule } from '../../../../gas-angular-ui/dist/g-ui';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorComponent } from './paginator/paginator.component';
import { DefaultModalComponent } from './default-modal/default-modal.component';
import { TrustHtmlPipe } from './trust-html.pipe';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputFieldModule } from 'g-ui';


@NgModule({
    declarations: [TableComponent, PaginatorComponent, DefaultModalComponent, TrustHtmlPipe, InputComponent],
  exports: [
    TableComponent,
    PaginatorComponent
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
