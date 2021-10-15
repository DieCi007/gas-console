import { Component, OnInit } from '@angular/core';
import {
  fadeOutOnLeaveAnimation,
  slideInRightOnEnterAnimation,
} from 'angular-animations';
import { UnresolvedStationService } from '../../service/unresolved-station.service';
import { IUnresolvedStationResponse } from '../../model/IUnresolvedStationResponse';
import { catchError, finalize, tap } from 'rxjs/operators';
import { ModalService } from '../../../ui/modal.service';
import { throwError } from 'rxjs';
import { IButtonClickData, ITableButtonData, ITableHeaderData, TableButtonType } from '../../../ui/table/table.component';
import { CreateStationComponent } from '../../components/create-station/create-station.component';

const headerData: ITableHeaderData[] = [
  {name: 'ID', property: 'id', isBold: true},
  {
    name: 'Risolto', property: 'isResolved', render: row => {
      const isSolved = row.isResolved;
      const color = isSolved ? '#43a047' : '#d0021b';
      const icon = 'pi pi-circle-on';
      return `<i class="${icon}" style="color: ${color}"></i>`;
    }
  },
  {name: 'Info', property: 'value'},
];

const buttonData: ITableButtonData[] = [
  {
    type: TableButtonType.ICON, id: 'create', color: 'secondary',
    icon: 'pi-plus', tooltip: 'Crea distributore'
  },
  {
    type: TableButtonType.ICON, id: 'mark-solved', color: '#43a047',
    icon: 'pi-check-circle', tooltip: 'Segnala come risolto'
  },
  {
    type: TableButtonType.ICON, id: 'mark-not-solved', color: 'danger',
    icon: 'pi-times-circle', tooltip: 'Segnala come non risolto'
  },
];

@Component({
  selector: 'app-unresolved-stations',
  templateUrl: './unresolved-stations.component.html',
  styleUrls: ['./unresolved-stations.component.scss'],
  animations: [
    slideInRightOnEnterAnimation({duration: 300}),
    fadeOutOnLeaveAnimation({duration: 300})
  ]
})
export class UnresolvedStationsComponent implements OnInit {

  loading = false;
  unresolvedStations: IUnresolvedStationResponse[];
  tableHeaderData = headerData;
  buttonData = buttonData;

  constructor(
    private unresolvedStationService: UnresolvedStationService,
    private modalService: ModalService
  ) {
  }

  ngOnInit(): void {
    this.loadStations();
  }

  loadStations(): void {
    this.loading = true;
    this.unresolvedStationService.getAllStations().pipe(
      tap(res => this.unresolvedStations = res),
      catchError(err => {
        this.loading = false;
        this.modalService.handleError(err.error);
        return throwError(err);
      }),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  onButtonClick(data: IButtonClickData<IUnresolvedStationResponse>): void {
    if (data.buttonId === 'create') {
      this.modalService.createFromComponent(CreateStationComponent, {data: data?.rowData?.value});
    } else if (data.buttonId === 'mark-solved') {
      this.changeStationStatus(true, data.rowData.id);
    } else if (data.buttonId === 'mark-not-solved') {
      this.changeStationStatus(false, data.rowData.id);
    }
  }

  calcMaxHeight(): string {
    return `calc(${window.innerHeight}px - 9rem)`;
  }

  changeStationStatus(isResolved: boolean, stationId: number): void {
    this.loading = true;
    this.unresolvedStationService.changeStationStatus(stationId, {isResolved}).pipe(
      finalize(() => this.loadStations()),
      catchError(err => {
        this.loading = false;
        this.modalService.handleError(err.error);
        return throwError(err);
      })
    ).subscribe();
  }
}
