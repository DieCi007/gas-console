import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PriceRoutingModule } from './price-routing.module';
import { MainComponent } from './page/main/main.component';
import { PriceListComponent } from './page/price-list/price-list.component';
import { UiModule } from '../ui/ui.module';
import { SpinnerModule } from '../../../../gas-angular-ui/dist/g-ui';


@NgModule({
  declarations: [MainComponent, PriceListComponent],
  imports: [
    CommonModule,
    PriceRoutingModule,
    UiModule,
    SpinnerModule
  ]
})
export class PriceModule { }
