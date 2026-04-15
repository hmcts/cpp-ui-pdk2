import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkButton } from '../../button';
import { PdkCookieBanner } from '..';

describe('pdk-cookie-banner', () => {
  let fixture: ComponentFixture<CookieBannerTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieBannerTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-cookie-banner-test',
  template: `
    <pdk-cookie-banner heading="Cookies on Service">
      <pdk-cookie-banner-content>
        <p>We use some essential cookies to make this service work.</p>
        <p>
          We’d like to set additional cookies so we can remember your settings, understand how
          people use the service and make improvements.
        </p>
      </pdk-cookie-banner-content>
      <pdk-button-group>
        <button pdk-button>Accept additional cookies</button>
        <button pdk-button>Reject additional cookies</button>
      </pdk-button-group>
    </pdk-cookie-banner>
  `,
  imports: [PdkButton, PdkCookieBanner]
})
class CookieBannerTestComponent {}
