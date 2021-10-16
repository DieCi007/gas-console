import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceRoutingModule } from './price-routing.module';
import { MainComponent } from './page/main/main.component';
import { PriceListComponent } from './page/price-list/price-list.component';
import { UiModule } from '../ui/ui.module';
import { PaginatorModule, SpinnerModule, TableModule } from 'g-ui';


@NgModule({
  declarations: [MainComponent, PriceListComponent],
  imports: [
    CommonModule,
    PriceRoutingModule,
    UiModule,
    SpinnerModule,
    TableModule,
    PaginatorModule
  ]
})
export class PriceModule {
}
