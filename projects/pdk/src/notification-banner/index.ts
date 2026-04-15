import {
  PdkNotificationBannerComponent,
  PdkNotificationBannerLinkDirective,
  NotificationRoleType,
  NotificationType
} from './notification-banner.component';

export const PdkNotificationBanner = [
  PdkNotificationBannerComponent,
  PdkNotificationBannerLinkDirective
] as const;
export {
  NotificationRoleType,
  NotificationType,
  PdkNotificationBannerComponent,
  PdkNotificationBannerLinkDirective
};
