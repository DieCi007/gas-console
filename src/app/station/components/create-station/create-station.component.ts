import { Component, Inject, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation } from 'angular-animations';
import { GasStationService } from '../../service/gas-station.service';
import { IModalInjectionData, MODAL_DATA, ModalService } from '../../../ui/modal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GasStationStatus } from '../../model/IGasStationAnalyticsResponse';
import { catchError, finalize } from 'rxjs/operators';
import { OverlayRef } from '@angular/cdk/overlay';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-create-station',
  templateUrl: './create-station.component.html',
  styleUrls: ['./create-station.component.scss'],
  animations: [fadeInOnEnterAnimation({duration: 300})]
})
export class CreateStationComponent implements OnInit {

  data: string;
  loading = false;
  stationForm: FormGroup;
  overlayRef: OverlayRef;

  constructor(
    private service: GasStationService,
    @Inject(MODAL_DATA) data: IModalInjectionData,
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.data = data?.data;
    this.overlayRef = data?.overlayRef;
  }

  ngOnInit(): void {
    this.stationForm = this.fb.group({
      id: [null, [Validators.required]],
      owner: [null, [Validators.required]],
      flag: [null, [Validators.required]],
      type: [null, [Validators.required]],
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      municipality: [null, [Validators.required]],
      province: [null, [Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
      status: [false],
    });
  }

  onSubmit(): void {
    this.loading = true;
    this.service.createStation({
      ...this.stationForm.value,
      status: this.stationForm.value.status ? GasStationStatus.ACTIVE : GasStationStatus.INACTIVE
    }).pipe(
      finalize(() => {
        this.loading = false;
        this.overlayRef.dispose();
      }),
      catchError(err => {
        this.loading = false;
        this.overlayRef.dispose();
        this.modalService.handleError(err.error);
        return throwError(err);
      })
    ).subscribe();
  }
}
