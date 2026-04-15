import { Component, Directive, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '../util';

@Component({
  selector: 'dl[pdk-summary-list]',
  encapsulation: ViewEncapsulation.None,
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./summary-list.scss']
})
export class PdkSummaryListComponent {
  @HostBinding('class.pdk-summary-list') summaryList = true;
}

@Directive({ selector: 'div[pdk-summary-list-item]' })
export class PdkSummaryListItemDirective {
  @HostBinding('class.pdk-summary-list__row') summaryListRow = true;
  @Input()
  @HostBinding('class.pdk-summary-list--borderless')
  set borderless(borderless: boolean) {
    this._borderless = coerceBooleanProperty(borderless);
  }
  get borderless() {
    return this._borderless;
  }

  private _borderless = false;
}

@Directive({ selector: 'dt[pdk-summary-list-key]' })
export class PdkSummaryListKeyDirective {
  @HostBinding('class.pdk-summary-list__key') summaryListKey = true;
}

@Directive({ selector: 'dd[pdk-summary-list-value]' })
export class PdkSummaryListValueDirective {
  @HostBinding('class.pdk-summary-list__value') summaryListValue = true;
}

@Directive({ selector: 'dd[pdk-summary-list-action], dd[pdk-summary-list-actions]' })
export class PdkSummaryListActionsDirective {
  @HostBinding('class.pdk-summary-list__actions') summaryListActions = true;
}
