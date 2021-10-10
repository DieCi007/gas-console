import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StationRoutingModule } from './station-routing.module';
import { MainComponent } from './page/main/main.component';
import { StationListComponent } from './page/station-list/station-list.component';
import { UiModule } from '../ui/ui.module';
import { ButtonModule, InputFieldModule, SpinnerModule } from '../../../../gas-angular-ui/dist/g-ui';
import { EditStationComponent } from './components/edit-station/edit-station.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MainComponent, StationListComponent, EditStationComponent],
    imports: [
        CommonModule,
        StationRoutingModule,
        UiModule,
        SpinnerModule,
        InputFieldModule,
        ReactiveFormsModule,
        ButtonModule
    ],
  entryComponents: [
  ]
})
export class StationModule {
}
