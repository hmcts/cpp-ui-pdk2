import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AnnouncementCategory, AnnouncementType, SystemAnnouncement } from '@cpp/users-groups';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AsyncPipe, NgClass, NgPlural, NgPluralCase } from '@angular/common';
import { PdkCore, PdkNotificationBanner } from '@cpp/pdk';

const SYSTEM_ANNOUNCEMENTS_ROUTE = '/system-announcements/notifications';
const MAX_VISIBLE_ANNOUNCEMENTS = 2;

@Component({
  selector: 'cpp-application-system-announcements-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (showBanner$ | async) {
    <div
      class="cpp-system-announcement"
      [ngClass]="ANNOUNCEMENT_TYPE_MAP[visibleAnnouncements[0].type].class"
      data-test-id="system-announcement-banner"
    >
      <pdk-notification-banner [title]="ANNOUNCEMENT_TYPE_MAP[visibleAnnouncements[0].type].title">
        @if (visibleAnnouncements.length === 1) {
        <h3
          pdk-typography="heading-small"
          pdk-margin-top="0"
          [attr.pdk-margin-bottom]="!hasAdditionalDetails() ? '0' : '3'"
          class="announcement-item"
        >
          {{ visibleAnnouncements[0].title }}
        </h3>
        } @if (visibleAnnouncements.length > 1) {
        <ol pdk-list="number" pdk-typography="heading-small" pdk-margin-top="0">
          @for (announcement of visibleAnnouncements; track announcement.id; let last = $last) {
          <li
            [attr.pdk-margin-bottom]="last && !hasAdditionalDetails() ? '0' : '3'"
            class="announcement-item"
          >
            <h3 pdk-margin-top="0" pdk-typography="heading-small">{{ announcement.title }}</h3>
          </li>
          }
        </ol>
        } @if (hasAdditionalDetails()) {
        <div>
          <a
            pdk-link
            unvisited
            href="javascript:void(0)"
            pdk-typography="heading-small"
            pdk-margin-bottom="0"
            (click)="navigateToDetailsPage()"
          >
            <ng-container [ngPlural]="announcements.length">
              <ng-template ngPluralCase="1">Find more details about this issue</ng-template>
              <ng-template ngPluralCase="other">View additional information</ng-template>
            </ng-container>
          </a>
        </div>
        }
      </pdk-notification-banner>
    </div>
    }
  `,
  styleUrls: ['./system-announcements.scss'],
  imports: [PdkNotificationBanner, PdkCore, AsyncPipe, NgPlural, NgPluralCase, NgClass]
})
export class SystemAnnouncementsBannerComponent implements OnInit {
  // Note: This component does not currently display dates or times. Announcements are managed through cpp.ui.manage-permissions,
  // where dates are sent to the backend in UTC format. If date/time information needs to be displayed in this component in the future,
  // it should be properly transformed to the user's local timezone before rendering.
  @Input() announcements: SystemAnnouncement[] = [];

  showBanner$: Observable<boolean>;

  ANNOUNCEMENT_TYPE_MAP = {
    [AnnouncementType.CRITICAL]: {
      title: 'Critical',
      class: 'cpp-system-announcement--critical'
    },
    [AnnouncementType.WARNING]: {
      title: 'Warning',
      class: 'cpp-system-announcement--warning'
    },
    [AnnouncementType.INFORMATION]: {
      title: 'Information',
      class: 'cpp-system-announcement--information'
    }
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.showBanner$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => !event.url.endsWith(SYSTEM_ANNOUNCEMENTS_ROUTE))
    );
  }

  get visibleAnnouncements(): SystemAnnouncement[] {
    return this.announcements.slice(0, MAX_VISIBLE_ANNOUNCEMENTS);
  }

  get plannedAnnouncements(): SystemAnnouncement[] {
    return this.announcements.filter(
      (announcement) => announcement.category === AnnouncementCategory.PLANNED
    );
  }

  get unplannedAnnouncements(): SystemAnnouncement[] {
    return this.announcements.filter(
      (announcement) => announcement.category === AnnouncementCategory.UNPLANNED
    );
  }

  hasAdditionalDetails(): boolean {
    return (
      this.announcements?.length > MAX_VISIBLE_ANNOUNCEMENTS ||
      this.visibleAnnouncements.some((announcement) => !!announcement.details)
    );
  }

  navigateToDetailsPage(): void {
    this.router.navigate([SYSTEM_ANNOUNCEMENTS_ROUTE], {
      state: {
        announcements: this.announcements
      }
    });
  }
}
