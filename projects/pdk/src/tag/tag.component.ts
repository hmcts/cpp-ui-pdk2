import { Component, Input, ViewEncapsulation } from '@angular/core';
import { coerceBooleanProperty } from '../util';

export type PdkTagColor =
  | 'default'
  | 'grey'
  | 'green'
  | 'turquoise'
  | 'blue'
  | 'light-blue'
  | 'purple'
  | 'pink'
  | 'red'
  | 'orange'
  | 'yellow';

@Component({
  selector: 'pdk-tag',
  styleUrls: ['./tag.scss'],
  template: `
    <div class="govuk-tag govuk-tag--{{ color }}" [class.pdk-tag--condensed]="condensed">
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None
})
export class PdkTagComponent {
  @Input() color: PdkTagColor = 'default';
  @Input()
  set condensed(condensed: boolean) {
    this._condensed = coerceBooleanProperty(condensed);
  }
  get condensed(): boolean {
    return this._condensed;
  }

  private _condensed = false;
}
