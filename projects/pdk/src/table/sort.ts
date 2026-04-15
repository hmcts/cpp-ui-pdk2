import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

export type SortOrder = 'asc' | 'desc' | 'none';

@Component({
  selector: 'pdk-sortable-header, [pdk-sortable-header]',
  template: ` <button type="button" (click)="sort()"><ng-content></ng-content></button> `
})
export class PdkSortableHeaderComponent {
  readonly ariaText: Record<SortOrder, string> = {
    asc: 'ascending',
    desc: 'descending',
    none: 'none'
  };

  @HostBinding('class.pdk-sortable') sortable = true;

  @HostBinding('class.pdk-sortable_order')
  get none() {
    return this.direction === 'none';
  }

  @HostBinding('class.pdk-sortable_order__asc')
  get ascending() {
    return this.direction === 'asc';
  }

  @HostBinding('class.pdk-sortable_order__desc')
  get descending() {
    return this.direction === 'desc';
  }

  @HostBinding('attr.aria-sort')
  get ariaSort() {
    if (this._direction) {
      return this.ariaText[this._direction];
    }

    return 'none';
  }

  @Input()
  set direction(direction: SortOrder) {
    this._direction = direction;
  }

  get direction(): SortOrder {
    return this._direction;
  }

  @Output()
  directionChange = new EventEmitter<SortOrder>();

  private _direction: SortOrder = 'none';

  sort() {
    this.direction = this.direction === 'asc' ? 'desc' : 'asc';
    this.directionChange.emit(this.direction);
  }
}
