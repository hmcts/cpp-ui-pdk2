import { Component, Directive, HostBinding, Input, ViewEncapsulation } from '@angular/core';

export type ButtonType = 'start' | 'default' | 'secondary' | 'warning' | 'inverse';

@Component({
  selector: `[pdk-button]`,
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./button.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkButtonComponent {}

@Directive({ selector: '[pdk-button]' })
export class PdkButtonDirective {
  @Input('pdk-button') type: ButtonType = 'default';
  @Input() disabled = false;

  @HostBinding('class.govuk-button') button = true;

  @HostBinding('attr.disabled')
  get disabledAttribute() {
    return this.disabled ? 'disabled' : null;
  }

  @HostBinding('class.govuk-button--start')
  get start() {
    return this.type === 'start';
  }
  @HostBinding('class.govuk-button--secondary')
  get secondary() {
    return this.type === 'secondary';
  }

  @HostBinding('class.govuk-button--warning')
  get warning() {
    return this.type === 'warning';
  }

  @HostBinding('class.govuk-button--inverse')
  get inverse() {
    return this.type === 'inverse';
  }
}
