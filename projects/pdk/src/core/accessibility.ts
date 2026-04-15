import { Directive, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '../util/index';

@Directive({ selector: '[pdk-visually-hidden]' })
export class PdkVisuallyHiddenDirective {
  @Input('pdk-visually-hidden') hidden = true;

  @HostBinding('class.govuk-visually-hidden')
  get visuallyHidden() {
    return coerceBooleanProperty(this.hidden);
  }
}
