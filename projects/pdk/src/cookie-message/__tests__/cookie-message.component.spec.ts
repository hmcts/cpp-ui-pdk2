import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkCookieMessageComponent } from '../cookie-message.component';

describe('pdk-cookie-message', () => {
  let fixture: ComponentFixture<CookieMessageTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CookieMessageTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-cookie-message-test',
  template: ` <pdk-cookie-message></pdk-cookie-message> `,
  imports: [PdkCookieMessageComponent]
})
class CookieMessageTestComponent {}
