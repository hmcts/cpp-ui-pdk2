import { Component } from '@angular/core';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavItem } from './common/common.interfaces';
import { MobileNavItem } from './common/navigation-mobile/mobile-nav.component';
import { navSections as components } from './components/components.navigation';
import { navSections as gettingStarted } from './getting-started/getting-started.navigation';
import { navSections as patterns } from './patterns/patterns.navigation';
import { navSections as styles } from './styles/styles.navigation';

const { version } = require('../../../../package.json');

@Component({
  selector: 'docs-root',
  template: `
    <pdk-provider>
      <pdk-skip-link target="main-content"></pdk-skip-link>
      <pdk-header>
        <docs-navigation-toggle
          id="docs-navigation-toggle"
          label="Toggle mobile menu"
          target="docs-navigation"
          pdk-mobile
          [toggled]="toggledMobileNav"
          (toggle)="toggledMobileNav = !toggledMobileNav"
        >
        </docs-navigation-toggle>
        <a pdk-header-title routerLink="/"> Common Platform Development Kit </a>
        <div aria-label="PDK version">
          <b>{{ version }}</b>
        </div>
      </pdk-header>
      <docs-pane>
        @if (toggledMobileNav) {
        <docs-mobile-nav
          ariaLabelledBy="docs-navigation-toggle"
          [mobileNavItems]="mobileNavItems"
          pdk-mobile
        >
        </docs-mobile-nav>
        }
        <docs-navigation [navItems]="navItems" pdk-mobile="false"> </docs-navigation>
      </docs-pane>

      <pdk-main id="main-content" pdk-typography="body"> <router-outlet></router-outlet> </pdk-main>
      <pdk-footer>
        <pdk-footer-meta>
          <h2 pdk-typography="heading-medium">Help desk</h2>
          <dl>
            <dt>Telephone</dt>
            <dd>0207 633 4140</dd>
            <dd>Monday to Friday, 8am to 6pm (excluding public holidays)</dd>
          </dl>
          <h3>Help by email</h3>
          <dl pdk-margin-bottom="0">
            <dt>CPS (Crown Prosecution Service) users only</dt>
            <dd>
              <a
                pdk-footer-link
                href="mailto:CJSCP-ServiceDesk@hmcts.gsi.gov.uk?Subject=General%20enquiry"
              >
                CJSCP-ServiceDesk&#64;hmcts.gsi.gov.uk
              </a>
            </dd>
            <dt>All other users</dt>
            <dd>
              <a
                pdk-footer-link
                href="mailto:CJSCP-ServiceDesk@hmcts.net?Subject=General%20enquiry"
              >
                CJSCP-ServiceDesk&#64;hmcts.net
              </a>
            </dd>
          </dl>
        </pdk-footer-meta>
        <pdk-footer-list>
          <pdk-footer-list-item>
            <a pdk-footer-link href="javascript:void(0)" target="_blank">Terms and conditions</a>
          </pdk-footer-list-item>
          <pdk-footer-list-item>
            <a pdk-footer-link href="https://www.gov.uk/help/cookies" target="_blank">Cookies</a>
          </pdk-footer-list-item>
        </pdk-footer-list>
      </pdk-footer>
    </pdk-provider>
  `,
  standalone: false
})
export class AppComponent {
  mobileNavItems: MobileNavItem[];
  navItems: NavItem[];
  toggledMobileNav = false;
  version = version;

  constructor(router: Router) {
    this.mobileNavItems = [
      {
        title: 'Getting started',
        navSections: [
          {
            navItems: [
              {
                title: 'Getting started overview',
                routerLink: ['/getting-started']
              }
            ]
          },
          ...gettingStarted
        ]
      },
      {
        title: 'Styles',
        navSections: [
          {
            navItems: [
              {
                title: 'Styles overview',
                routerLink: ['/styles']
              }
            ]
          },
          ...styles
        ]
      },
      {
        title: 'Components',
        navSections: [
          {
            navItems: [
              {
                title: 'Components overview',
                routerLink: ['/components']
              }
            ]
          },
          ...components
        ]
      },
      {
        title: 'Patterns',
        navSections: [
          {
            navItems: [
              {
                title: 'Patterns overview',
                routerLink: ['/patterns']
              }
            ]
          },
          ...patterns
        ]
      }
    ];

    this.navItems = this.mobileNavItems.map(({ title, navSections }) => ({
      title,
      routerLink: navSections[0].navItems[0].routerLink[0]
    }));

    router.events.pipe(filter((event) => event instanceof ActivationStart)).subscribe((event) => {
      if (
        (event as ActivationStart).snapshot.routeConfig.data &&
        (event as ActivationStart).snapshot.routeConfig.data.title
      ) {
        document.title = (event as ActivationStart).snapshot.routeConfig.data.title;
      }
    });

    router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((e) => {
      this.toggledMobileNav = false;
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  }
}
