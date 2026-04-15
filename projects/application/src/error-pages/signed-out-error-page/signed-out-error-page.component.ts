import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorRouteState } from '../error-route-state.interface';
import { PdkLinkDirective, PdkTextColorDirective, PdkTypographyDirective } from '@cpp/pdk';

@Component({
  selector: '[cpp-application-signed-out-page], cpp-application-signed-out-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1 pdk-typography="heading-xlarge">You've been signed out</h1>
    <p pdk-typography="body-small">This is because you have been signed in for 8 hours.</p>
    <div>
      <button
        type="button"
        pdk-link
        [pdk-text-colour]="focused ? 'black' : 'blue'"
        (focus)="handleFocus()"
        (blur)="handleFocus()"
        (click)="navigateToRedirect()"
      >
        Sign in again
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
export class SignedOutErrorPageComponent {
  set redirectUrl(url: string) {
    this._redirectUrl = [url, `timestamp=_${Date.now()}`].join(url.indexOf('?') === -1 ? '?' : '&');
  }

  get redirectUrl() {
    return this._redirectUrl;
  }

  private _redirectUrl = '/';
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

  navigateToRedirect() {
    window.open(this.redirectUrl, '_self');
  }
}
