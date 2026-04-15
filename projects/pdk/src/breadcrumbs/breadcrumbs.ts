import { Component, Directive, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Directive({ selector: '[pdk-breadcrumb]' })
export class PdkBreadcrumbDirective {
  @Input('pdk-breadcrumb') active = 'inactive';
  @HostBinding('class.govuk-breadcrumbs__link') link = true;
  @HostBinding('attr.aria-current')
  get current() {
    return this.active === 'active' ? 'page' : null;
  }
}

@Directive({ selector: 'li[pdk-breadcrumb-list-item]' })
export class PdkBreadcrumbListItemDirective {
  @HostBinding('class.govuk-breadcrumbs__list-item') listItem = true;
}

@Component({
  selector: 'ol[pdk-breadcrumb-list]',
  template: ` <ng-content></ng-content> `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./breadcrumbs.scss']
})
export class PdkBreadcrumbListComponent {
  @HostBinding('class.govuk-breadcrumbs') breadcrumbs = true;
  @HostBinding('class.govuk-breadcrumbs__list') breadcrumbList = true;
}
