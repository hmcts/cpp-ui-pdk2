import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { CookiesService } from '@cpp/core';
import { Observable } from 'rxjs';
import { SystemAnnouncement, SystemAnnouncementsService } from '@cpp/users-groups';
import { map, take } from 'rxjs/operators';
import {
  PdkAlertComponent,
  PdkActivityIndicator,
  PdkCore,
  PdkFooter,
  PdkHeader,
  PdkSearchBar,
  PdkPhaseBannerComponent,
  PdkSkipLinkComponent
} from '@cpp/pdk';
import { AsyncPipe } from '@angular/common';
import { SystemAnnouncementsBannerComponent } from './system-announcements';
import { FormsModule } from '@angular/forms';
import { CookiesBannerComponent } from './cookies-banner.component';

export interface HeaderNavItem {
  title: string;
  href?: string;
  onClick?: () => void;
}

export interface SupportEmailItem {
  title: string;
  email: string;
  href: string;
}

@Component({
  selector: 'cpp-application-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-provider [wide]="wide">
      @if (activity) {
      <pdk-activity-indicator></pdk-activity-indicator>
      } @if (apiError || offline) {
      <pdk-alert>
        @if (apiError && !offline) {
        <span> There’s a technical problem. You can’t save anything new – try again later. </span>
        } @if (offline) {
        <span>
          You are offline. You cannot save anything new - check your connection and try again.
        </span>
        }
      </pdk-alert>
      }
      <pdk-skip-link target="main-content"></pdk-skip-link>
      <cpp-application-cookies-banner
        [cookiesLink]="cookiesLinkWithReferrer"
      ></cpp-application-cookies-banner>
      <pdk-header>
        <a pdk-header-title [href]="serviceLink">{{ serviceName }}</a>
        @if (searchEnabled) {
        <form #form="ngForm" class="cpp-layout__search" (submit)="handleSearch(form.value.q)">
          <pdk-searchbar
            #q="ngModel"
            name="q"
            ngModel
            borderless
            [ariaLabel]="searchLabel"
            [placeholder]="searchPlaceholder"
          >
          </pdk-searchbar>
        </form>
        } @if (headerNavItems.length !== 0) {
        <pdk-header-nav>
          @for (navItem of headerNavItems; track navItem.title) {
          <pdk-header-nav-item>
            <a
              [href]="navItem.href || 'javascript:void(0)' | pdkSanitize : 'url'"
              pdk-header-link
              (click)="handleNavItemClick(navItem)"
            >
              {{ navItem.title }}
            </a>
          </pdk-header-nav-item>
          }
        </pdk-header-nav>
        }
      </pdk-header>
      <pdk-container>
        <pdk-phase-banner [type]="phaseType">This is a new service</pdk-phase-banner>
        @if (systemAnnouncements$ | async; as announcements) { @if (announcements?.length > 0 &&
        showDownTimeBanner) {
        <cpp-application-system-announcements-banner [announcements]="announcements">
        </cpp-application-system-announcements-banner>
        } }
      </pdk-container>
      <pdk-main contentId="main-content" pdk-typography="body">
        <ng-content></ng-content>
      </pdk-main>
      <pdk-footer>
        <pdk-footer-meta>
          <h2 pdk-typography="heading-medium">Help desk</h2>
          <div>HMCTS DTS IT Service Desk</div>
          <dl>
            <dt>Telephone</dt>
            <dd>0203 989 6060</dd>
            <dd>
              Monday to Friday, 8am to 8pm and Saturday, 8am to 2pm (excluding public holidays)
            </dd>
          </dl>
          @if (supportEmails.length) {
          <dl pdk-margin-bottom="0">
            @for (emailItem of supportEmails; track emailItem?.email) {
            <dt>{{ emailItem.title }}</dt>
            <dd>
              <a pdk-footer-link [href]="emailItem.href"> {{ emailItem.email }} </a>
            </dd>
            }
          </dl>
          }
        </pdk-footer-meta>
        <pdk-footer-list>
          @if (termsLink) {
          <pdk-footer-list-item>
            <a pdk-footer-link [href]="termsLink" target="_blank">Terms and conditions</a>
          </pdk-footer-list-item>
          } @if (cookiesLink) {
          <pdk-footer-list-item>
            <a pdk-footer-link [href]="cookiesLink">Cookies</a>
          </pdk-footer-list-item>
          } @if (accessibilityLink) {
          <pdk-footer-list-item>
            <a pdk-footer-link [href]="accessibilityLink" target="_blank">Accessibility</a>
          </pdk-footer-list-item>
          }
        </pdk-footer-list>
      </pdk-footer>
    </pdk-provider>
  `,
  styleUrls: ['./layout.scss'],
  standalone: true,
  imports: [
    PdkSearchBar,
    PdkCore,
    PdkHeader,
    PdkFooter,
    SystemAnnouncementsBannerComponent,
    CookiesBannerComponent,
    AsyncPipe,
    FormsModule,
    PdkActivityIndicator,
    PdkPhaseBannerComponent,
    PdkSkipLinkComponent,
    PdkAlertComponent
  ]
})
export class LayoutComponent implements OnInit, OnChanges {
  private readonly defaultSupportEmails: SupportEmailItem[] = [
    {
      title: 'Email',
      email: 'CJSCP-ServiceDesk@hmcts.net',
      href: 'mailto:CJSCP-ServiceDesk@hmcts.net?Subject=General%20enquiry'
    }
  ];

  @Input() accessibilityLink?: string;
  @Input() activity = false;
  @Input() apiError = false;
  @Input() cookiesLink = '/cookies';
  @Input() offline = false;
  @Input() searchEnabled = false;
  @Input() searchLabel = 'Search';
  @Input() serviceLink = '#';
  @Input() searchPlaceholder = '';
  @Input() serviceName = 'Common Platform';
  @Input() supportEmails: SupportEmailItem[] = this.defaultSupportEmails;
  @Input() termsLink = '/terms-and-conditions';
  @Input() headerNavItems: HeaderNavItem[] = [];
  @Input() phaseType = 'beta';
  @Input() showDownTimeBanner = true;
  @Input() wide = false;
  @Output() search = new EventEmitter<string>();

  spinningWheelActionName = 'spinning-wheel-action';
  spinningWheelActionId: number | null;
  systemAnnouncements$: Observable<SystemAnnouncement[]>;

  constructor(
    private cookiesService: CookiesService,
    private systemAnnouncementsService: SystemAnnouncementsService
  ) {}

  get cookiesLinkWithReferrer(): string {
    return `${this.cookiesLink}?referrer=${encodeURIComponent(document.baseURI)}`;
  }

  ngOnInit() {
    this.cookiesService.start();
    this.systemAnnouncements$ = this.systemAnnouncementsService.getSystemAnnouncements().pipe(
      map((response) => response || []),
      take(1)
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.activity) {
      if (this.activity) {
        if (!!this.spinningWheelActionId) {
          return;
        }
        this.spinningWheelActionId = this.cookiesService.enterAction(this.spinningWheelActionName);
      } else if (!!this.spinningWheelActionId) {
        this.cookiesService.leaveAction(this.spinningWheelActionId);
        this.spinningWheelActionId = null;
      }
    }
  }

  handleNavItemClick(navItem: HeaderNavItem) {
    if (navItem.onClick) {
      navItem.onClick();
    }
  }

  handleSearch(q: string) {
    if (q) {
      this.search.emit(q);
    }
  }
}
