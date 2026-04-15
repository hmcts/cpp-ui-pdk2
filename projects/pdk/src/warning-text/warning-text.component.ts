import { Component, Input } from '@angular/core';
import { coerceBooleanProperty } from '../util';
import { PdkVisuallyHiddenDirective } from '../core';

@Component({
  selector: 'pdk-warning-text',
  template: `
    <div class="govuk-warning-text" [class.pdk-warning-text--error]="error">
      <span class="govuk-warning-text__icon" aria-hidden="true">!</span>
      <strong class="govuk-warning-text__text">
        <span pdk-visually-hidden>Warning</span>
        <ng-content></ng-content>
      </strong>
    </div>
  `,
  imports: [PdkVisuallyHiddenDirective],
  styleUrls: ['./warning-text.scss']
})
export class PdkWarningTextComponent {
  @Input()
  get error() {
    return this._error;
  }
  set error(on: boolean) {
    this._error = coerceBooleanProperty(on);
  }

  private _error = false;
}
