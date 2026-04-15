import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { generateId, PdkLinkDirective, PdkPaddingDirective, PdkMarginDirective } from '@cpp/pdk';
import { NavItem, NavSection } from '../common.interfaces';

import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'docs-mobile-subnav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="docs-mobile-subnav__toggler" [class.docs-nav-mobile--toggler-active]="toggled">
      <a
        [attr.id]="id + '-toggler'"
        [attr.aria-controls]="id + '-subnav'"
        [attr.aria-expanded]="toggled"
        [attr.aria-label]="'Toggle subnavigation for ' + title"
        href="javascript:void(0)"
        pdk-link
        unvisited
        (click)="toggled = !toggled"
      >
        {{ title }}
      </a>
    </div>
    @if (toggled) {
    <ul
      [attr.id]="id + '-subnav'"
      [attr.aria-labelledby]="id + '-toggler'"
      class="docs-mobile-subnav"
    >
      @for (section of navSections; track section.heading) { @if (section.heading) {
      <li>
        <h4 class="docs-mobile-subnav__heading">{{ section.heading }}</h4>
        <ul class="docs-mobile-subnav__nav">
          @for (navItem of section.navItems; track navItem.title) {
          <li
            routerLinkActive="docs-mobile-subnav--current-page"
            pdk-padding-vertical="1"
            pdk-margin-bottom="2"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <a pdk-link unvisited [routerLink]="navItem.routerLink"> {{ navItem.title }} </a>
          </li>
          }
        </ul>
      </li>
      } @if (!section.heading) { @for (navItem of section.navItems; track navItem.title) {
      <li
        pdk-padding-vertical="1"
        pdk-margin-bottom="2"
        routerLinkActive="docs-mobile-subnav--current-page"
        [routerLinkActiveOptions]="{ exact: true }"
      >
        <a pdk-link unvisited [routerLink]="navItem.routerLink"> {{ navItem.title }} </a>
      </li>
      } } }
    </ul>
    }
  `,
  imports: [PdkLinkDirective, RouterLinkActive, PdkPaddingDirective, PdkMarginDirective, RouterLink]
})
export class MobileSubnavComponent {
  @Input() ariaLabelledBy: string;
  @Input() navSections: Array<NavSection> = [];
  @Input() title: string;

  id = generateId('docs-mobile-subnav');
  toggled = false;
}

export interface MobileNavItem {
  title: string;
  navSections: NavSection[];
}

@Component({
  selector: 'docs-mobile-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav [attr.aria-labelledby]="ariaLabelledBy" class="docs-mobile-nav" role="navigation">
      <ul class="docs-mobile-nav__list">
        @for (mobileNavItem of mobileNavItems; track mobileNavItem.title) {
        <li>
          <docs-mobile-subnav
            [title]="mobileNavItem.title"
            [navSections]="mobileNavItem.navSections"
          >
          </docs-mobile-subnav>
        </li>
        }
      </ul>
    </nav>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./mobile-nav.scss'],
  imports: [MobileSubnavComponent]
})
export class MobileNavComponent {
  @Input() ariaLabelledBy: string;
  @Input() mobileNavItems: MobileNavItem[] = [];
}
