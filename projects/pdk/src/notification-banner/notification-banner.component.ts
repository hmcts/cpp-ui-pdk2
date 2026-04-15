import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { generateId } from '../util';

export type NotificationType = 'success' | 'neutral';
export type NotificationRoleType = 'region' | 'alert';
@Component({
  selector: 'pdk-notification-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="govuk-notification-banner__header">
      <h2 class="govuk-notification-banner__title" [attr.id]="titleId">{{ title }}</h2>
    </div>
    <div class="govuk-notification-banner__content">
      <div class="govuk-notification-banner__heading"><ng-content></ng-content></div>
    </div>
  `,
  styleUrls: ['./notification-banner.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkNotificationBannerComponent {
  @Input() title: string;

  @Input() titleId = generateId('pdk-notification-banner-title');

  @Input() type: NotificationType = 'neutral';

  @HostBinding('attr.role')
  @Input()
  role: NotificationRoleType = 'region';

  @HostBinding('attr.aria-labelledby') get ariaLabelledBy() {
    return this.titleId;
  }

  @HostBinding('class.govuk-notification-banner--success')
  get success() {
    return this.type === 'success';
  }
}

@Directive({ selector: 'a[pdk-notification-banner-link]' })
export class PdkNotificationBannerLinkDirective {
  @HostBinding('class.govuk-notification-banner__link') link = true;
}
