import { Component, Input, OnInit } from '@angular/core';

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
export class TableComponent<T> implements OnInit {

  @Input() headerData: ITableHeaderData[];
  @Input() data: T[];
  @Input() noDataMessage = 'No items to display';
  @Input() cardMode = false;
  constructor() {
  }


  ngOnInit(): void {
  }

}
