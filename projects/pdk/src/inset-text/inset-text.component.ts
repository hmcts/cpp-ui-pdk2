import { Component, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '../util/index';

@Component({
  selector: 'pdk-inset-text',
  template: `
    <div class="govuk-inset-text" [style.padding-right]="spacing">
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./inset-text.scss']
})
export class PdkInsetTextComponent {
  @Input()
  set compound(enabled: boolean) {
    this._compound = coerceBooleanProperty(enabled);
  }
  get spacing(): number {
    return this._compound ? 0 : null;
  }

  private _compound: boolean;
}
