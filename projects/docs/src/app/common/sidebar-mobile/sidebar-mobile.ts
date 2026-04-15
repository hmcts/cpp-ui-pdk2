import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavSection } from '../common.interfaces';

import { PdkTypographyDirective, PdkLinkDirective } from '@cpp/pdk';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'docs-mobile-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (section of navSections; track section.heading) { @if (section.heading) {
    <h2 pdk-typography="heading-medium">{{ section.heading }}</h2>
    }
    <ul class="docs-sidebar-layout__nav">
      @for (navItem of section.navItems; track navItem.title) {
      <li>
        <a pdk-link [routerLink]="navItem.routerLink"> {{ navItem.title }} </a>
      </li>
      }
    </ul>
    }
  `,
  imports: [PdkTypographyDirective, PdkLinkDirective, RouterLink]
})
export class MobileSidebarComponent {
  @Input() navSections: NavSection[];
}
