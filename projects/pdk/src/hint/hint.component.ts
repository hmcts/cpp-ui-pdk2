import { Component, Input, HostBinding, ViewEncapsulation } from '@angular/core';

export type HintTypes = 'date' | 'time' | 'checkbox-group';

@Component({
  selector: '[pdk-hint], pdk-hint',
  template: `
    <div>
      @if (hint) {
      {{ hintText }}
      } @if (!hint) {
      <ng-content></ng-content>
      }
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./hint.scss']
})
export class PdkHintComponent {
  @HostBinding('class.govuk-hint') h = true;
  @Input() hint: HintTypes;

  get hintText(): string {
    switch (this.hint) {
      case 'date':
        return 'For example, 23 10 2017';

      case 'time':
        return 'For example, 10 30';

      case 'checkbox-group':
        return 'Select all that apply.';

      default:
        throw new Error(`'${this.hint}' is not a recognised hint type!`);
    }
  }
}
