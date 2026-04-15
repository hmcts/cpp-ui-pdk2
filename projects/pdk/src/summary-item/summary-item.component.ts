import { ChangeDetectionStrategy, Component, ViewEncapsulation, Input } from '@angular/core';
import { coerceBooleanProperty } from '../util/index';

@Component({
  selector: 'pdk-summary-item',
  styleUrls: ['./summary-item.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dl class="pdk-summary-item" [class.pdk-summary-item--inline]="inline">
      <dt class="pdk-summary-item__number" [class.pdk-summary-item__number--hero]="hero">
        {{ count }}
      </dt>
      <dd class="pdk-summary-item__label">{{ label }}</dd>
    </dl>
  `
})
export class PdkSummaryItemComponent {
  @Input() count: number;
  @Input() label: string;

  @Input()
  get inline() {
    return this._inline;
  }
  set inline(on: boolean) {
    this._inline = coerceBooleanProperty(on);
  }

  @Input()
  get hero() {
    return this._hero;
  }
  set hero(on: boolean) {
    this._hero = coerceBooleanProperty(on);
  }

  private _inline = false;
  private _hero = false;
}
