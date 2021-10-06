import { Component, Inject, OnInit } from '@angular/core';
import { IModalInjectionData, MODAL_DATA } from '../../../ui/modal.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { GasStationService } from '../../service/gas-station.service';
import { IGasStationAnalyticsResponse } from '../../model/IGasStationAnalyticsResponse';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-station',
  templateUrl: './edit-station.component.html',
  styleUrls: ['./edit-station.component.scss']
})
export class EditStationComponent implements OnInit {

  overlayRef: OverlayRef;
  station: IGasStationAnalyticsResponse;
  stationForm: FormGroup;

  constructor(
    @Inject(MODAL_DATA) public data: IModalInjectionData,
    private fb: FormBuilder,
    private service: GasStationService
  ) {
    this.station = data?.station;
    this.overlayRef = data?.overlayRef;
  }

  ngOnInit(): void {
    this.stationForm = this.fb.group({
      id: [this.station?.id, [Validators.required]],
      owner: [this.station?.owner, [Validators.required]],
      flag: [this.station?.flag, [Validators.required]],
      type: [this.station?.type, [Validators.required]],
      name: [this.station?.name, [Validators.required]],
      address: [this.station?.address, [Validators.required]],
      municipality: [this.station?.municipality, [Validators.required]],
      province: [this.station?.province, [Validators.required]],
      latitude: [this.station?.latitude, [Validators.required]],
      longitude: [this.station?.longitude, [Validators.required]],
    });
  }

  get owner(): AbstractControl {
    return this.stationForm.get('owner');
  }

  get flag(): AbstractControl {
    return this.stationForm.get('flag');
  }

  get type(): AbstractControl {
    return this.stationForm.get('type');
  }

  get name(): AbstractControl {
    return this.stationForm.get('name');
  }

  get address(): AbstractControl {
    return this.stationForm.get('address');
  }

  get municipality(): AbstractControl {
    return this.stationForm.get('municipality');
  }

  get province(): AbstractControl {
    return this.stationForm.get('province');
  }

  get latitude(): AbstractControl {
    return this.stationForm.get('latitude');
  }

  get longitude(): AbstractControl {
    return this.stationForm.get('longitude');
  }

}
