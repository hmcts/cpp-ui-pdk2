import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { coerceBooleanProperty } from '../util/index';

@Component({
  selector: 'pdk-action-button, [pdk-action-button]',
  template: `
    <div #header class="pdk-action-button__header">
      <span class="pdk-action-button__title"> <ng-content></ng-content> </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./action-button.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkActionButtonComponent {
  @HostBinding('class.pdk-action-button--disabled')
  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(on: boolean) {
    this._disabled = coerceBooleanProperty(on);
  }

  @HostBinding('class.pdk-action-button--error')
  @Input()
  get error() {
    return this._error;
  }
  set error(on: boolean) {
    this._error = coerceBooleanProperty(on);
  }

  @HostBinding('class.pdk-action-button--secondary')
  @Input()
  get inverted() {
    return this._inverted;
  }
  set inverted(on: boolean) {
    this._inverted = coerceBooleanProperty(on);
  }

  @ViewChild('header', { static: true }) header: ElementRef;

  @HostBinding('attr.role')
  @Input()
  role = 'button';

  @HostBinding('attr.aria-disabled')
  get ariaDisabled(): string {
    return this.disabled ? 'true' : 'false';
  }

  @HostBinding('attr.tabIndex')
  get _tabIndex(): number {
    return this.disabled ? -1 : 0;
  }

  private _disabled = false;
  private _error = false;
  private _inverted = false;
}
