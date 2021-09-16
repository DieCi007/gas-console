import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BreakpointService } from '../../shared/service/breakpoint.service';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

export interface ITableHeaderData {
  name: string;
  sortable: boolean;
  property: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit, OnDestroy {

  @Input() headerData: ITableHeaderData[];
  @Input() expandedHeaderData: ITableHeaderData[];
  @Input() data: T[];
  @Input() noDataMessage = 'No items to display';
  @Input() cardMode = false;
  @Input() maxHeightPC = '50rem';
  @Input() maxHeightMobile = '38rem';
  @Input() changeAtPx = 1200;
  mobileStyle = false;
  private bp$: Subscription;

  constructor(
    private bp: BreakpointService,
  ) {
  }


  ngOnInit(): void {
    this.bp.customMaxWidth(this.changeAtPx).pipe(
      distinctUntilChanged(),
      tap(bp => bp.matches ? this.mobileStyle = true :
        this.mobileStyle = false),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.bp$.unsubscribe();
  }

  activateAccordion(accordion: HTMLTableDataCellElement): void {
    if (accordion.style.display === 'table-cell') {
      accordion.style.display = 'none';
    } else {
      accordion.style.display = 'table-cell';
    }
  }
}
