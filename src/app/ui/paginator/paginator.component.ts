import { Component, Input, Output, EventEmitter } from '@angular/core';

export interface IPageStatus {
  page: number;
  size: number;
}

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() selectedPage = 0;
  @Input() totalPages = 1;
  @Input() sizeOptions: number[] = [10, 25, 50];
  @Input() selectedSize = 10;
  @Input() hideLabel = false;
  @Input() perPageLabel = 'Per page';
  @Input() currentPageLabel = 'Current page';
  @Output() valueChange = new EventEmitter<IPageStatus>();

  onPageChange(selectedPage: number): void {
    if (this.selectedPage !== selectedPage) {
      this.valueChange.emit({
        size: this.selectedSize,
        page: selectedPage
      });
    }
  }

  onPageSizeChange(selectedSize: number): void {
    if (this.selectedSize !== selectedSize) {
      this.valueChange.emit({
        size: selectedSize,
        page: 0
      });
    }
  }

  onFirstClick(): void {
    if (this.selectedPage > 0) {
      this.onPageChange(0);
    }
  }

  onBackClick(): void {
    if (this.selectedPage > 0) {
      this.onPageChange(this.selectedPage - 1);
    }
  }

  onNextClick(): void {
    if (this.selectedPage + 1 < this.totalPages) {
      this.onPageChange(this.selectedPage + 1);
    }
  }

  onLastClick(): void {
    if (this.selectedPage + 1 < this.totalPages) {
      this.onPageChange(this.totalPages - 1);
    }
  }
}
