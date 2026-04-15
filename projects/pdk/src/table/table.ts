import { Component, Directive, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '../util/index';

@Component({
  selector: 'table[pdk-table]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./table.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkTableComponent {
  @HostBinding('class.govuk-table') table = true;
}

@Directive({ selector: 'caption[pdk-table-caption]' })
export class PdkTableCaptionDirective {
  @HostBinding('class.govuk-table__caption') caption = true;
}

@Directive({ selector: 'thead[pdk-table-head]' })
export class PdkTableHeadDirective {
  @HostBinding('class.govuk-table__head') row = true;
}

@Directive({ selector: 'th[pdk-table-header]' })
export class PdkTableHeaderDirective {
  private scope: 'row' | 'col' = 'col';

  @Input('pdk-table-header') set row(scope: any) {
    this.scope = scope === 'row' ? 'row' : 'col';
  }
  @HostBinding('class.govuk-table__cell') cell = true;
  @HostBinding('attr.scope')
  get attr() {
    return this.scope;
  }
}

@Directive({ selector: 'tbody[pdk-table-body]' })
export class PdkTableBodyDirective {
  @HostBinding('class.govuk-table__body') body = true;
}

@Directive({ selector: 'tr[pdk-table-row]' })
export class PdkTableRowDirective {
  @HostBinding('class.govuk-table__row') row = true;
  @HostBinding('class.pdk-table__row--hover-highlight')
  get hasHighlight() {
    return this._interactive || this._highlightOnHover;
  }
  @HostBinding('class.pdk-table__row--interactive')
  get hasInteractive() {
    return this._interactive;
  }

  @Input()
  set interactive(on: boolean) {
    this._interactive = coerceBooleanProperty(on);
  }
  @Input()
  set highlightOnHover(on: boolean) {
    this._highlightOnHover = coerceBooleanProperty(on);
  }

  private _highlightOnHover = false;
  private _interactive = false;
}

@Directive({ selector: 'td[pdk-table-cell]' })
export class PdkTableCellDirective {
  @HostBinding('class.govuk-table__cell') cell = true;
}
