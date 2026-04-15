import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { NavSection } from '../common.interfaces';
import { PdkTypographyDirective, PdkMarginDirective, PdkLinkDirective } from '@cpp/pdk';

import { RouterLinkActive, RouterLink } from '@angular/router';

@Component({
  selector: 'docs-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="docs-sidebar" pdk-typography="body-small">
      @for (section of navSections; track section.heading) { @if (section.heading) {
      <h4 class="docs-sidebar__heading">{{ section.heading }}</h4>
      }
      <ul class="docs-sidebar__section">
        @for (navItem of section.navItems; track navItem.title) { @if (navItem.routerLink) {
        <li
          class="docs-sidebar__section-item"
          pdk-margin-bottom="2"
          routerLinkActive="docs-sidebar__section-item--current-page"
        >
          <a pdk-link unvisited [routerLink]="navItem.routerLink"> {{ navItem.title }} </a>
        </li>
        } @if (!navItem.routerLink) {
        <li>
          <span>{{ navItem.title }}</span>
        </li>
        } }
      </ul>
      }
    </nav>
  `,
  styleUrls: ['./sidebar.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    PdkTypographyDirective,
    PdkMarginDirective,
    RouterLinkActive,
    PdkLinkDirective,
    RouterLink
  ]
})
export class SidebarComponent {
  @Input() navSections: NavSection[] = [];
}
