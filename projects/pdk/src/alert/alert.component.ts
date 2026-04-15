import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '../util/index';

export type AlertType = 'success' | 'confirmation' | 'warning' | 'notice' | 'secure';

@Component({
  selector: 'pdk-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pdk-alert pdk-alert--{{ type || 'warning' }}" role="alert">
      <div class="pdk-alert__container" [class.govuk-width-container]="container">
        @if (icon) {
        <i
          class="pdk-alert__icon pdk-alert__icon--{{ iconType }}"
          role="presentation"
          aria-hidden="true"
        >
        </i>
        }
        <div class="pdk-alert__message">
          <div><ng-content></ng-content></div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./alert.scss']
})
export class PdkAlertComponent {
  @Input()
  get container(): boolean {
    return this._container;
  }
  set container(on: boolean) {
    this._container = coerceBooleanProperty(on);
  }

  @Input()
  get icon(): boolean {
    return this._icon;
  }
  set icon(on: boolean) {
    this._icon = coerceBooleanProperty(on);
  }

  @Input() type: AlertType;

  get iconType(): string {
    switch (this.type) {
      case 'success':
      case 'confirmation':
        return 'tick';
      case 'secure':
        return 'lock';
      default:
        return 'alert';
    }
  }

  _container = false;
  _icon = false;
}
