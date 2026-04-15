import { Component, HostBinding, ViewEncapsulation, Directive } from '@angular/core';

@Component({
  selector: 'pdk-badge, [pdk-badge]',
  encapsulation: ViewEncapsulation.None,
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./badge.scss']
})
export class PdkBadgeComponent {}

@Directive({ selector: 'pdk-badge, [pdk-badge]' })
export class PdkBadgeDirective {
  @HostBinding('class.pdk-badge') badge = true;
}
