import { Component, Directive, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '[pdk-back-link]',
  encapsulation: ViewEncapsulation.None,
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./back-link.scss']
})
export class PdkBackLinkComponent {}

@Directive({ selector: '[pdk-back-link]' })
export class PdkBackLinkDirective {
  @HostBinding('class.govuk-back-link') backLink = true;
}
