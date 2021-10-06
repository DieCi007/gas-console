import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BreakpointService } from '../../shared/service/breakpoint.service';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { SortType } from '../../shared/model/SortType';
import { FormBuilder, FormGroup } from '@angular/forms';

export interface ITableHeaderData {
  name: string;
  sortable: boolean;
  property: string;
  isBold?: boolean;
}

export interface ITableButtonData {
  id: string;
  type: TableButtonType;
  color?: 'primary' | 'danger' | 'secondary' | string;
  label?: string;
  icon?: string;
  tooltip?: string;
}

export enum TableButtonType {
  LABELED = 'LABELED',
  ICON = 'ICON'
}

export interface ISortInfo {
  type: SortType;
  field: string;
}

export interface IButtonClickData<T> {
  buttonId: string;
  rowData: T;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, OnDestroy {

  @Input() headerData: ITableHeaderData[];
  @Input() expandedHeaderData: ITableHeaderData[];
  @Input() buttonData: ITableButtonData[];
  @Input() data: T[];
  @Input() noDataMessage = 'No items to display';
  @Input() cardMode = false;
  @Input() maxHeightPC = '50rem';
  @Input() maxHeightMobile = '38rem';
  @Input() changeAtPx = 812;
  @Input() buttonHeaderName = 'Actions';
  @Input() headerColor: 'primary' | 'secondary' | string = 'primary';
  @Input() hoverColor: 'primary' | 'secondary' = 'secondary';
  @Input() sort: ISortInfo;
  @Input() filterable = false;
  @Output() buttonClick = new EventEmitter<IButtonClickData<T>>();
  @Output() sortChange = new EventEmitter<ISortInfo>();
  @Output() filterChange = new EventEmitter<string>();

  mobileStyle = false;
  private bp$: Subscription;
  filterForm: FormGroup = this.fb.group({
    filter: ['']
  });
  private filterSubscription: Subscription;

  constructor(
    private bp: BreakpointService,
    private fb: FormBuilder
  ) {
  }


  ngOnInit(): void {
    this.bp$ = this.bp.customMaxWidth(this.changeAtPx).pipe(
      distinctUntilChanged(),
      tap(bp => bp.matches ? this.mobileStyle = true :
        this.mobileStyle = false),
    ).subscribe();
    this.filterSubscription = this.filterForm.valueChanges.pipe(
      map(r => r.filter),
      debounceTime(400),
      distinctUntilChanged(),
      tap(f => {
        if (this.filterable) {
          this.filterChange.emit(f);
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.bp$.unsubscribe();
    this.filterSubscription.unsubscribe();
  }

  activateAccordion(accordion: HTMLTableDataCellElement): void {
    if (accordion.style.display === 'table-cell') {
      accordion.style.display = 'none';
    } else {
      accordion.style.display = 'table-cell';
    }
  }

  get allHeaderData(): ITableHeaderData[] {
    return [...this.headerData, ...this.expandedHeaderData];
  }

  onButtonClick(event: MouseEvent, id: string, el: T): void {
    event.preventDefault();
    event.stopPropagation();
    this.buttonClick.emit({
      buttonId: id,
      rowData: el
    });
  }

  onSortChange(property: string): void {
    if (property === this.sort.field) {
      return this.sortChange.emit({
        field: property,
        type: this.sort.type === SortType.ASC ? SortType.DESC : SortType.ASC
      });
    }
    this.sortChange.emit({
      field: property,
      type: SortType.ASC
    });
  }
}
