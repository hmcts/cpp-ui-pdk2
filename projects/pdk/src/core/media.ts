import { Directive, HostBinding, Input } from '@angular/core';
import { coerceBooleanProperty } from '../util/index';

@Directive({ selector: '[pdk-mobile]' })
export class PdkMobileDirective {
  @Input('pdk-mobile') mobile: boolean;

  @HostBinding('class.pdk-media--mobile-visible')
  get mobileVisibile() {
    return coerceBooleanProperty(this.mobile);
  }

  @HostBinding('class.pdk-media--mobile-hidden')
  get mobileHidden() {
    return !coerceBooleanProperty(this.mobile);
  }
}
