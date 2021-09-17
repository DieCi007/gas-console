import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { ButtonModule } from '../../../../gas-angular-ui/dist/g-ui';
import { TooltipModule } from 'primeng/tooltip';
import { PaginatorComponent } from './paginator/paginator.component';



@NgModule({
    declarations: [TableComponent, PaginatorComponent],
  exports: [
    TableComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    TooltipModule
  ]
})
export class UiModule { }
