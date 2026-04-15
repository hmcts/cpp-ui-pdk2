import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkNotificationBanner } from '..';

describe('pdk-notification-banner', () => {
  let fixture: ComponentFixture<NotificationBannerTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationBannerTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-notification-banner-test',
  template: `
    <pdk-notification-banner title="Important information">
      Here is the notification banner content!
    </pdk-notification-banner>
  `,
  imports: [PdkNotificationBanner]
})
class NotificationBannerTestComponent {}
