import { Component, OnInit } from '@angular/core';
import { GasStationService } from '../../service/gas-station.service';
import { SortType } from '../../../shared/model/SortType';
import { IGasStationAnalyticsResponse } from '../../model/IGasStationAnalyticsResponse';
import { IPaginatedRequest } from '../../../shared/model/IPaginatedRequest';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ISortInfo, ITableButtonData, ITableHeaderData, TableButtonType } from '../../../ui/table/table.component';
import { IPageStatus } from '../../../ui/paginator/paginator.component';

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
  {name: 'Tipo', property: 'type', sortable: true},
];

const expandedHeaderData: ITableHeaderData[] = [
  {name: 'Di', property: 'owner', sortable: true},
  {name: 'Indirizzo', property: 'address', sortable: true},
];

const buttonData: ITableButtonData[] = [
  {
    type: TableButtonType.ICON, id: 'edit', color: 'secondary',
    icon: 'pi-pencil', tooltip: 'Modifica elemento'
  },
  {
    type: TableButtonType.ICON, id: 'delete', color: 'danger',
    icon: 'pi-trash', tooltip: 'Cancella elemento'
  },
];

@Component({
  selector: 'app-station-list',
  templateUrl: './station-list.component.html',
  styleUrls: ['./station-list.component.scss']
})
export class StationListComponent implements OnInit {

  constructor(
    private service: GasStationService
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
        return throwError(err);
      }),
    ).subscribe(() => this.isLoading = false);
  }

  onButtonClick(id: string): void {
    console.log(id);
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
}
