import { Component, Directive, HostBinding, Input, forwardRef } from '@angular/core';
import { PdkMarginDirective } from './spacing';

@Component({
  selector: 'pdk-main',
  template: `
    <main
      class="govuk-main-wrapper"
      tabindex="-1"
      [attr.id]="contentId"
      pdk-container
      pdk-margin-bottom="9"
    >
      <ng-content></ng-content>
    </main>
  `,
  styles: [
    `
      main:focus-visible {
        outline-width: 0;
      }
    `
  ],
  imports: [forwardRef(() => PdkContainerStyleDirective), PdkMarginDirective]
})
export class PdkMainComponent {
  @Input() contentId: string;
}

@Directive({ selector: 'pdk-container, [pdk-container]' })
export class PdkContainerStyleDirective {
  @HostBinding('style.display') display = 'block';
  @HostBinding('class.govuk-width-container') container = true;
}
