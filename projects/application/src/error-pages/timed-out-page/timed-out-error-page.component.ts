import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorRouteState } from '../error-route-state.interface';
import { PdkTypographyDirective, PdkTextColorDirective, PdkLinkDirective } from '@cpp/pdk';

@Component({
  selector: '[cpp-application-timed-out-page], cpp-application-timed-out-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 pdk-typography="heading-xlarge">Timed out</h1>
    <p pdk-typography="body-small">
      Your request timed out. Go back and make sure your work has been saved.
    </p>
    <div>
      <button
        type="button"
        pdk-link
        [pdk-text-colour]="focused ? 'black' : 'blue'"
        (focus)="handleFocus()"
        (blur)="handleFocus()"
        (click)="navigateToRedirect()"
      >
        Back
      </button>
    </div>
  `,
  styles: [
    `
      button {
        position: relative;
        cursor: pointer;
        background: transparent;
        text-decoration: underline;
        border-width: 0;
        font-weight: inherit;
        font-size: inherit;
        padding-left: 0;
      }
    `
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [PdkTypographyDirective, PdkTextColorDirective, PdkLinkDirective]
})
export class TimedOutErrorPageComponent {
  redirectUrl = '/';
  focused = false;

  constructor(private router: Router) {
    const { extras } = this.router.getCurrentNavigation();
    const { state } = extras as { state: ErrorRouteState };

    if (!!state && state.redirectUrl) {
      this.redirectUrl = state.redirectUrl;
    }
  }

  handleFocus() {
    this.focused = !this.focused;
  }

  // We need to do a hard reload in order to load guards and state
  navigateToRedirect() {
    window.open(this.redirectUrl, '_self');
  }
}
