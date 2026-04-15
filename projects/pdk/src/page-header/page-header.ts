import { Component, Directive, Input, ViewEncapsulation, HostBinding } from '@angular/core';

@Component({
  selector: 'pdk-page-header, [pdk-page-header]',
  template: ` <div class="pdk-page-header"><ng-content></ng-content></div> `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./page-header.scss']
})
export class PdkPageHeaderComponent {}

@Component({
  selector: 'pdk-page-header-content, [pdk-page-header-content]',
  template: `
    <div class="pdk-page-header__content">
      @if (marker) {
      <div class="pdk-page-header__marker">
        <span class="pdk-page-header__marker-text">{{ marker }}</span>
      </div>
      } @if (reference) {
      <div class="pdk-page-header__reference">{{ reference }}</div>
      }
      <div class="pdk-page-header__title"><ng-content></ng-content></div>
    </div>
  `
})
export class PdkPageHeaderContentComponent {
  @Input() marker: string;
  @Input() reference: string;
}

@Directive({ selector: 'pdk-page-header-nav, [pdk-page-header-nav]' })
export class PdkPageHeaderNavDirective {
  @HostBinding('attr.role') role = 'list';
  @HostBinding('class.pdk-page-header__links') nav = true;
}

@Directive({ selector: 'pdk-page-header-nav-item, [pdk-page-header-nav-item]' })
export class PdkPageHeaderNavItemDirective {
  @HostBinding('attr.role') role = 'listitem';
}
