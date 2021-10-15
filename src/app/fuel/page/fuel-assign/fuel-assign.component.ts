import { Component, OnInit } from '@angular/core';
import { FuelService } from '../../service/fuel.service';
import { MinPriceService } from '../../service/min-price.service';
import { IExplicitFuel } from '../../model/IExplicitFuel';
import { catchError, finalize, tap } from 'rxjs/operators';
import { combineLatest, throwError } from 'rxjs';
import { IFuelMinPrice } from '../../model/IFuelMinPrice';
import { ModalService } from '../../../ui/modal.service';
import { CommonFuelType } from '../../model/CommonFuelType';
import * as _ from 'underscore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-fuel-assign',
  templateUrl: './fuel-assign.component.html',
  styleUrls: ['./fuel-assign.component.scss']
})
export class FuelAssignComponent implements OnInit {

  loading = false;
  groupedExplicitFuels: { [t: string]: IExplicitFuel[] };
  allExplicitFuels: IExplicitFuel[];
  minPrices: IFuelMinPrice[];
  commonFuels = Object.values(CommonFuelType);
  draggedFuel: IExplicitFuel;

  minPricesForm = this.fb.group({
    gasolio: [0, [Validators.required]],
    benzina: [0, [Validators.required]],
    gpl: [0, [Validators.required]],
    metano: [0, [Validators.required]],
  });

  constructor(
    private service: FuelService,
    private minPriceService: MinPriceService,
    private modalService: ModalService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.loadFuelsAndPrices();
  }

  loadFuelsAndPrices(): void {
    this.loading = true;
    const fuel$ = this.service.getExplicitFuels().pipe(
      tap(res => {
        this.groupedExplicitFuels = _.groupBy(res, 'type');
        this.allExplicitFuels = res;
      })
    );
    const price$ = this.minPriceService.getMinPrices().pipe(
      tap(res => {
        this.minPrices = res;
        this.patchForm();
      })
    );
    combineLatest([fuel$, price$]).pipe(
      catchError(err => {
        this.loading = false;
        this.modalService.handleError(err.error);
        return throwError(err);
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  get notAssignedFuels(): IExplicitFuel[] {
    return this.groupedExplicitFuels && this.groupedExplicitFuels['null'] || [];
  }

  getAssignedFuels(type: CommonFuelType): IExplicitFuel[] {
    return this.groupedExplicitFuels && this.groupedExplicitFuels[type] || [];
  }

  onDragStart(fuel: IExplicitFuel): void {
    this.draggedFuel = fuel;
  }

  onDrop(el: HTMLDivElement, common: CommonFuelType = null): void {
    el.classList.remove('drag-active');
    this.allExplicitFuels.map(f => {
      if (f.id === this.draggedFuel.id) {
        f.type = common;
      }
      return f;
    });
    this.groupedExplicitFuels = _.groupBy(this.allExplicitFuels, 'type');
  }

  onDragEnd(): void {
    this.draggedFuel = null;
  }

  onDragEnter(el: HTMLDivElement): void {
    el.classList.add('drag-active');
  }

  onDragLeave(el: HTMLDivElement): void {
    el.classList.remove('drag-active');
  }

  patchForm(): void {
    this.minPricesForm.patchValue({
      gasolio: this.getPrice(CommonFuelType.GASOLIO),
      benzina: this.getPrice(CommonFuelType.BENZINA),
      gpl: this.getPrice(CommonFuelType.GPL),
      metano: this.getPrice(CommonFuelType.METANO),
    });
  }

  getPrice(fuelType: CommonFuelType): number {
    return this.minPrices?.find(p => p.type === fuelType)?.minPrice || 0;
  }

  onSubmit(): void {
    this.loading = true;
    const minPrice$ = this.minPriceService.updatePrices([
      {type: CommonFuelType.METANO, minPrice: this.metano.value},
      {type: CommonFuelType.GPL, minPrice: this.gpl.value},
      {type: CommonFuelType.GASOLIO, minPrice: this.gasolio.value},
      {type: CommonFuelType.BENZINA, minPrice: this.benzina.value},
    ]);
    const fuelAssign$ = this.service.updateExplicitFuels([
      {type: CommonFuelType.METANO, fuels: this.getAssignedFuels(CommonFuelType.METANO).map(f => f.id)},
      {type: CommonFuelType.GPL, fuels: this.getAssignedFuels(CommonFuelType.GPL).map(f => f.id)},
      {type: CommonFuelType.GASOLIO, fuels: this.getAssignedFuels(CommonFuelType.GASOLIO).map(f => f.id)},
      {type: CommonFuelType.BENZINA, fuels: this.getAssignedFuels(CommonFuelType.BENZINA).map(f => f.id)},
      {type: null, fuels: this.getAssignedFuels(null).map(f => f.id)},
    ]);
    combineLatest([minPrice$, fuelAssign$]).pipe(
      catchError(err => {
        this.loading = false;
        this.modalService.handleError(err.error);
        return throwError(err);
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }


  get gasolio(): FormControl {
    return this.minPricesForm.get('gasolio') as FormControl;
  }

  get benzina(): FormControl {
    return this.minPricesForm.get('benzina') as FormControl;
  }

  get gpl(): FormControl {
    return this.minPricesForm.get('gpl') as FormControl;
  }

  get metano(): FormControl {
    return this.minPricesForm.get('metano') as FormControl;
  }
}
