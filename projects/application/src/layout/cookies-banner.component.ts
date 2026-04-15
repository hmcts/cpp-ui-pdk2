import { Component, Input } from '@angular/core';
import { CookiesService } from '@cpp/core';
import { PdkButton, PdkCookieBanner, PdkCore } from '@cpp/pdk';

@Component({
  selector: 'cpp-application-cookies-banner',
  template: `
    @if (cookiePreferencesUnknown) {
    <pdk-cookie-banner heading="Cookies on Common Platform">
      <pdk-cookie-banner-content>
        <p pdk-typography="body">We use some essential cookies to make the application work.</p>
        <p pdk-typography="body">
          We’d like to set additional cookies to understand how you use Common Platform, remember
          your settings and improve your experience.
        </p>
      </pdk-cookie-banner-content>
      <pdk-button-group>
        <button data-test-id="acceptCookies" pdk-button (click)="handleAcceptCookies()">
          Accept additional cookies
        </button>
        <button data-test-id="rejectCookies" pdk-button (click)="handleRejectCookies()">
          Reject additional cookies
        </button>
        <a [attr.href]="cookiesLink" pdk-link>View cookies</a>
      </pdk-button-group>
    </pdk-cookie-banner>
    } @if (didAcceptCookies) {
    <pdk-cookie-banner>
      <pdk-cookie-banner-content>
        <p pdk-typography="body">
          You have accepted additional cookies. You can
          <a pdk-link [href]="cookiesLink">change your cookie settings</a> at any time.
        </p></pdk-cookie-banner-content
      >
      <pdk-button-group>
        <button
          aria-label="Hide cookies message"
          data-test-id="hideCookiesBanner"
          pdk-button
          (click)="didAcceptCookies = false"
        >
          Hide this message
        </button>
      </pdk-button-group>
    </pdk-cookie-banner>
    } @if (didRejectCookies) {
    <pdk-cookie-banner>
      <pdk-cookie-banner-content>
        <p>
          You have rejected additional cookies. You can
          <a pdk-link [href]="cookiesLink">change your cookie settings</a> at any time.
        </p></pdk-cookie-banner-content
      >
      <pdk-button-group>
        <button
          aria-label="Hide cookies message"
          data-test-id="hideCookiesBanner"
          pdk-button
          (click)="didRejectCookies = false"
        >
          Hide this message
        </button>
      </pdk-button-group>
    </pdk-cookie-banner>
    }
  `,
  standalone: true,
  imports: [PdkCore, PdkButton, PdkCookieBanner]
})
export class CookiesBannerComponent {
  @Input() cookiesLink: string;

  didAcceptCookies = false;
  didRejectCookies = false;

  constructor(private cookiesService: CookiesService) {}

  get cookiePreferencesUnknown(): boolean {
    return !this.cookiesService.getCookiePreferencesExist();
  }

  handleAcceptCookies() {
    this.cookiesService.setAllCookiesEnabled();
    this.cookiesService.restart();
    this.didAcceptCookies = true;
  }

  handleRejectCookies() {
    this.cookiesService.setAllCookiesDisabled();
    this.cookiesService.restart();
    this.didRejectCookies = true;
  }
}
