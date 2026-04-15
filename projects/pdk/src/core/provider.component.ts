import { Component, HostBinding, input, Input, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'pdk-provider',
  template: `
    <div class="js-enabled govuk-frontend-supported govuk-template--rebranded">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./_core.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkProviderComponent {
  @Input() wide = false;
  @HostBinding('style.--container-width') get containerWidth() {
    return this.wide ? '1410px' : '1170px';
  }
  constructor(router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);

        if (!tree.fragment) {
          window.scrollTo(0, 0);
        }
      }
    });
  }
}
