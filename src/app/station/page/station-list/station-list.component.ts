import { Component, OnDestroy, OnInit } from '@angular/core';
import { GasStationService } from '../../service/gas-station.service';
import { SortType } from '../../../shared/model/SortType';
import { GasStationStatus, IGasStationAnalyticsResponse } from '../../model/IGasStationAnalyticsResponse';
import { IPaginatedRequest } from '../../../shared/model/IPaginatedRequest';
import { BehaviorSubject, Subscription, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { IButtonClickData, ISortInfo, ITableButtonData, ITableHeaderData, TableButtonType } from '../../../ui/table/table.component';
import { IPageStatus } from '../../../ui/paginator/paginator.component';
import { ModalService } from '../../../ui/modal.service';
import { EditStationComponent } from '../../components/edit-station/edit-station.component';

const initialPageRequest: IPaginatedRequest = {
  sortType: SortType.ASC,
  sortBy: 'id',
  size: 25,
  page: 0
};

const tableHeaderData: ITableHeaderData[] = [
  {name: 'ID', property: 'id', sortable: true, isBold: true},
  {name: 'Bandiera', property: 'flag', sortable: true, isBold: true},
  {name: 'Nome', property: 'name', sortable: true},
  {name: 'Comune', property: 'municipality', sortable: true},
  {name: 'Provincia', property: 'province', sortable: true},
  {name: 'Latitudine', property: 'latitude', sortable: true},
  {name: 'Longitudine', property: 'longitude', sortable: true},
  {
    name: 'Attivo', property: 'status', sortable: true, render: row => {
      const isActive = row.status === GasStationStatus.ACTIVE;
      const color = isActive ? '#43a047' : '#d0021b';
      const icon = isActive ? 'pi pi-check' : 'pi pi-times';
      return `<i class="${icon}" style="color: ${color}"></i>`;
    }
  },
];

const expandedHeaderData: ITableHeaderData[] = [
  {name: 'Tipo', property: 'type', sortable: true},
  {name: 'Di', property: 'owner', sortable: true},
  {name: 'Indirizzo', property: 'address', sortable: true},
];

const buttonData: ITableButtonData[] = [
  {
    type: TableButtonType.ICON, id: 'edit', color: 'secondary',
    icon: 'pi-pencil', tooltip: 'Modifica elemento'
  },
];

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit, OnDestroy {

  constructor(
    private service: GasStationService,
    private modalService: ModalService
  ) {
  }

  paginatedRequest = initialPageRequest;
  paginatedRequest$ = new BehaviorSubject(this.paginatedRequest);
  tableHeaderData = tableHeaderData;
  expandedHeaderData = expandedHeaderData;
  buttonData = buttonData;
  stations: IGasStationAnalyticsResponse[];
  isLoading = false;
  totalPages: number;
  totalElements: number;
  currentPage = this.paginatedRequest.page;
  currentSize = this.paginatedRequest.size;
  sort: ISortInfo = {
    type: this.paginatedRequest.sortType,
    field: this.paginatedRequest.sortBy
  };
  _stationsUpdated: Subscription;

  ngOnInit(): void {
    this.paginatedRequest$.pipe(
      tap(() => this.isLoading = true),
      switchMap(res => this.service.getStations(res)),
      tap(res => {
        this.stations = res.values;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;
        this.currentSize = res.currentSize;
      }),
      catchError(err => {
        this.isLoading = false;
        this.modalService.handleError(err.error);
        return throwError(err);
      }),
    ).subscribe(() => this.isLoading = false);
    this._stationsUpdated = this.service.stationsUpdated$
      .subscribe(() => this.paginatedRequest$.next(this.paginatedRequest));
  }

  onButtonClick(event: IButtonClickData<IGasStationAnalyticsResponse>): void {
    if (event.buttonId === 'edit') {
      this.editElement(event.rowData);
    }
  }

  onPaginatorChange(status: IPageStatus): void {
    this.paginatedRequest = {
      ...this.paginatedRequest,
      page: status.page,
      size: status.size
    };
    this.paginatedRequest$.next(this.paginatedRequest);
  }

  onSortChange(event: ISortInfo): void {
    this.sort = event;
    this.paginatedRequest = {
      ...this.paginatedRequest,
      sortBy: event.field, sortType: event.type
    };
    this.paginatedRequest$.next(this.paginatedRequest);
  }

  editElement(rowData: IGasStationAnalyticsResponse): void {
    this.modalService.createFromComponent(EditStationComponent, {station: rowData},
      null);
  }

  onFilterChange(filter: string): void {
    this.paginatedRequest.query = filter;
    this.paginatedRequest$.next(this.paginatedRequest);
  }

  ngOnDestroy(): void {
    this._stationsUpdated.unsubscribe();
  }

  calcMaxHeight(): string {
    return window.innerHeight - 200 + 'px';
  }
}
