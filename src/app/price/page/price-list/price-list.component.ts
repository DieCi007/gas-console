import { Component, OnInit } from '@angular/core';
import { IPaginatedRequest } from '../../../shared/model/IPaginatedRequest';
import { SortType } from '../../../shared/model/SortType';
import { PriceService } from '../../service/price.service';
import { ModalService } from '../../../ui/modal.service';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, finalize, switchMap, tap } from 'rxjs/operators';
import { IButtonClickData, ISortInfo, ITableButtonData, ITableHeaderData, TableButtonType } from '../../../ui/table/table.component';
import { IPriceAnalyticsResponse } from '../../model/IPriceAnalyticsResponse';
import { IPageStatus } from '../../../ui/paginator/paginator.component';

const initialPageRequest: IPaginatedRequest = {
  sortType: SortType.DESC,
  sortBy: 'readDate',
  size: 25,
  page: 0
};

const tableHeaderData: ITableHeaderData[] = [
  {name: 'ID Distributore', property: 'stationId', isBold: true, sortable: true},
  {name: 'Data Aggiornamento', property: 'readDate', sortable: true},
  {name: 'Self Service', property: 'isSelf', sortable: true},
  {name: 'Tipo Carburante', property: 'description', sortable: true},
  {name: 'Prezzo', property: 'price', isBold: true, sortable: true},
];

const buttonData: ITableButtonData[] = [{
  type: TableButtonType.ICON, id: 'delete', color: 'danger',
  icon: 'pi-trash', tooltip: 'Cancella'
}];

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {

  constructor(
    private service: PriceService,
    private modalService: ModalService
  ) {
  }

  loading = false;
  paginatedRequest = initialPageRequest;
  buttonData = buttonData;
  tableHeaderData = tableHeaderData;
  paginatedRequest$ = new BehaviorSubject(this.paginatedRequest);
  totalPages: number;
  totalElements: number;
  currentPage = this.paginatedRequest.page;
  currentSize = this.paginatedRequest.size;
  sort: ISortInfo = {
    type: this.paginatedRequest.sortType,
    field: this.paginatedRequest.sortBy
  };
  prices: IPriceAnalyticsResponse[];

  ngOnInit(): void {
    this.paginatedRequest$.pipe(
      tap(() => this.loading = true),
      switchMap(req => this.service.getPrices(req)),
      tap(res => {
        this.prices = res.values;
        this.totalElements = res.totalElements;
        this.totalPages = res.totalPages;
        this.currentSize = res.currentSize;
        this.currentPage = res.currentPage;
      }),
      catchError(err => {
        this.loading = false;
        this.modalService.handleError(err.error);
        return throwError(err);
      })
    ).subscribe(() => this.loading = false);
  }

  onPaginatorChange(status: IPageStatus): void {
    this.paginatedRequest = {
      ...this.paginatedRequest,
      page: status.page,
      size: status.size
    };
    this.paginatedRequest$.next(this.paginatedRequest);
  }

  onSortChange(sort: ISortInfo): void {
    this.sort = sort;
    this.paginatedRequest = {
      ...this.paginatedRequest,
      sortBy: sort.field,
      sortType: sort.type
    };
    this.paginatedRequest$.next(this.paginatedRequest);
  }

  onButtonClick(event: IButtonClickData<IPriceAnalyticsResponse>): void {
    if (event.buttonId === 'delete') {
      this.deletePrice(event.rowData);
    }
  }

  deletePrice(rowData: IPriceAnalyticsResponse): void {
    const [back, confirm] = this.modalService.openDefaultModal({
      title: 'Attenzione',
      primaryText: 'Questa azione non è reversibile.',
      secondaryText: 'Continuare?',
      actions: [
        {buttonLabel: 'Indietro', buttonColor: 'secondary'},
        {buttonLabel: 'Conferma', buttonColor: 'danger'}
      ]
    });
    confirm.click.subscribe(() => {
      this.loading = true;
      this.service.deletePrice(rowData).pipe(
        finalize(() => {
          this.loading = false;
          this.paginatedRequest$.next(this.paginatedRequest);
        }),
        catchError(err => {
          this.loading = false;
          this.modalService.handleError(err.error);
          return throwError(err);
        })
      ).subscribe();
    });
  }

  onFilterChange(query: string): void {
    this.paginatedRequest.query = query;
    this.paginatedRequest$.next(this.paginatedRequest);
  }

  calcMaxHeight(): string {
    return window.innerHeight - 200 + 'px';
  }
}
