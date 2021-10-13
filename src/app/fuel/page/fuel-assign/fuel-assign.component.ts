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

  constructor(
    private service: FuelService,
    private minPriceService: MinPriceService,
    private modalService: ModalService
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
      tap(res => this.minPrices = res)
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
}
