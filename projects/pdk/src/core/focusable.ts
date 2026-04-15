import { Directive, HostBinding, Input } from '@angular/core';

@Directive({ selector: '[pdk-focused]' })
export class PdkFocusedDirective {
  @HostBinding('class.pdk--focused')
  @Input('pdk-focused')
  focused = false;
}

@Directive({ selector: '[pdk-focusable]' })
export class PdkFocusableDirective {
  @HostBinding('attr.tabindex') tabindex = 0;
  @HostBinding('class.pdk-focusable') focusable = true;
}
