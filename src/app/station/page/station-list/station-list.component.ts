import { Component, OnInit } from '@angular/core';
import { GasStationService } from '../../service/gas-station.service';
import { SortType } from '../../../shared/model/SortType';
import { IGasStationAnalyticsResponse } from '../../model/IGasStationAnalyticsResponse';
import { IPaginatedRequest } from '../../../shared/model/IPaginatedRequest';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { ITableHeaderData } from '../../../ui/table/table.component';

const initialPageRequest: IPaginatedRequest = {
  sortType: SortType.ASC,
  sortBy: '',
  size: 10,
  page: 0
};

const tableHeaderData: ITableHeaderData[] = [
  {name: 'ID', property: 'id', sortable: true},
  {name: 'Bandiera', property: 'flag', sortable: true},
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
  stations: IGasStationAnalyticsResponse[];
  isLoading = false;
  totalPages: number;
  totalElements: number;

  ngOnInit(): void {
    this.paginatedRequest$.pipe(
      tap(() => this.isLoading = true),
      switchMap(res => this.service.getStations(res)),
      tap(res => {
        this.stations = res.values;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
      }),
      catchError(err => {
        this.isLoading = false;
        return throwError(err);
      }),
    ).subscribe(() => this.isLoading = false);
  }

}
