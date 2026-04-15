import { Component, Directive, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'pdk-form-group',
  styleUrls: ['./form.scss'],
  template: ` <ng-content></ng-content> `,
  encapsulation: ViewEncapsulation.None
})
export class PdkFormGroupComponent {}

@Directive({ selector: 'pdk-form-group' })
export class PdkFormGroupDirective {
  @HostBinding('class.pdk-form-group') formGroup = true;
  @HostBinding('class.govuk-form-group--error') @Input() hasError = false;
}
