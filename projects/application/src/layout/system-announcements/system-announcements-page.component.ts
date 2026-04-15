import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnnouncementCategory, SystemAnnouncement } from '@cpp/users-groups';
import { Location, NgTemplateOutlet } from '@angular/common';
import { PdkBackLink, PdkCore, PdkGrid } from '@cpp/pdk';

@Component({
  selector: 'cpp-application-system-announcements-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-grid container>
      <pdk-grid two-thirds>
        <div pdk-margin-top="4">
          <a pdk-back-link href="javascript:void(0)" (click)="goBack()">Back</a>
        </div>
      </pdk-grid>

      <pdk-grid two-thirds>
        <h1 pdk-typography="heading-xlarge">Platform announcements</h1>
      </pdk-grid>

      <ng-container
        *ngTemplateOutlet="
          announcementsList;
          context: { title: 'Unplanned issues', announcements: unplannedAnnouncements }
        "
      ></ng-container>

      <ng-container
        *ngTemplateOutlet="
          announcementsList;
          context: { title: 'Planned announcements', announcements: plannedAnnouncements }
        "
      ></ng-container>
    </pdk-grid>

    <ng-template #announcementsList let-title="title" let-announcements="announcements">
      @if (announcements.length > 0) {
      <pdk-grid two-thirds>
        <h2 pdk-typography="heading-large">{{ title }}</h2>
        <ol pdk-typography="heading-medium">
          @for (announcement of announcements; track announcement.id) {
          <li>
            <div pdk-typography="heading-medium">{{ announcement.title }}</div>
            @if (announcement.details) {
            <div pdk-typography="body-medium">
              {{ announcement.details }}
            </div>
            }
          </li>
          }
        </ol>
      </pdk-grid>
      }
    </ng-template>
  `,
  standalone: true,
  imports: [PdkGrid, PdkCore, PdkBackLink, NgTemplateOutlet]
})
export class SystemAnnouncementsPageComponent implements OnInit {
  announcements: SystemAnnouncement[] = [];

  constructor(private router: Router, private location: Location) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.announcements = navigation.extras.state['announcements'] || [];
    }
  }

  ngOnInit(): void {
    if (!this.announcements || this.announcements.length === 0) {
      this.router.navigate(['/']);
    }
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

  goBack(): void {
    this.location.back();
  }
}
