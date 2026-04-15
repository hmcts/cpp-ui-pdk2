import { Component, Input } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CookiesService } from '@cpp/core';
import {
  AnnouncementCategory,
  AnnouncementType,
  SystemAnnouncementsService,
  SystemAnnouncement
} from '@cpp/users-groups';
import { of } from 'rxjs';
import { LayoutComponent, SupportEmailItem } from '../layout.component';
import { SystemAnnouncementsBannerComponent } from '../system-announcements';
import { JsonPipe } from '@angular/common';

describe('cpp-application-layout', () => {
  let cookies: CookiesService;
  let systemAnnouncementsService: { getSystemAnnouncements: jest.Mock<unknown> };

  beforeEach(() => {
    cookies = {
      getCookiePreferencesExist: () => true,
      setAllCookiesEnabled: jest.fn(),
      setAllCookiesDisabled: jest.fn(),
      start: jest.fn(),
      stop: jest.fn(),
      restart: jest.fn(),
      enterAction: jest.fn(),
      leaveAction: jest.fn()
    } as unknown as CookiesService;

    systemAnnouncementsService = {
      getSystemAnnouncements: jest.fn().mockReturnValue(of([]))
    };

    Date.now = jest.fn(() => Date.parse('2022-02-26'));

    TestBed.configureTestingModule({
      imports: [LayoutComponent],
      declarations: [LayoutTestComponent],
      providers: [
        {
          provide: CookiesService,
          useValue: cookies
        },
        {
          provide: SystemAnnouncementsService,
          useValue: systemAnnouncementsService
        }
      ]
    }).overrideComponent(LayoutComponent, {
      remove: {
        imports: [SystemAnnouncementsBannerComponent]
      },
      add: {
        imports: [MockSystemAnnouncementsBannerComponent]
      }
    });
  });

  const createFixture = () => {
    return TestBed.createComponent(LayoutTestComponent);
  };

  it('should render the default view', () => {
    const fixture = createFixture();
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render a custom service name', () => {
    const fixture = createFixture();
    fixture.componentInstance.serviceName = 'My CPP Service!';
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render an accessibility link', () => {
    const fixture = createFixture();
    fixture.componentInstance.accessibilityLink = 'http://test.tld';
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render a terms link', () => {
    const fixture = createFixture();
    fixture.componentInstance.termsLink = 'http://test.tld';
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render an activity indicator', () => {
    const fixture = createFixture();
    fixture.componentInstance.activity = true;
    fixture.detectChanges();

    expect(cookies.enterAction).toHaveBeenCalled();
    expect(fixture).toMatchSnapshot();
  });

  it('should call dynatrace leaveAction', () => {
    (cookies.enterAction as jest.Mock).mockReturnValue('dynatraceId');

    const fixture = createFixture();

    // Show the spinner
    fixture.componentInstance.activity = true;
    fixture.detectChanges();

    // Hide the spinner
    fixture.componentInstance.activity = false;
    fixture.detectChanges();

    expect(cookies.leaveAction).toHaveBeenCalledWith('dynatraceId');
  });

  it('should render an api error', () => {
    const fixture = createFixture();
    fixture.componentInstance.activity = true;
    fixture.detectChanges();

    expect(cookies.enterAction).toHaveBeenCalled();
    expect(fixture).toMatchSnapshot();
  });

  it('should render an offline warning', () => {
    const fixture = createFixture();
    fixture.componentInstance.offline = true;
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render a phase', () => {
    const fixture = createFixture();
    fixture.componentInstance.phaseType = 'alpha';
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render a searchbar', () => {
    const fixture = createFixture();
    fixture.componentInstance.searchEnabled = true;
    fixture.componentInstance.searchLabel = 'Search label';
    fixture.componentInstance.searchPlaceholder = 'Search placeholder';
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  // todo: why does this test not work?
  it.skip('should emit a `search` event when submitting the search with a value', fakeAsync(() => {
    const fixture = createFixture();
    fixture.componentInstance.searchEnabled = true;
    fixture.detectChanges();
    fixture.debugElement.query(By.css('pdk-searchbar button[type=submit]')).nativeElement.click();

    expect(fixture.componentInstance.search).not.toHaveBeenCalled();

    fixture.debugElement.query(By.css('pdk-searchbar input')).nativeElement.value = '*';
    fixture.debugElement
      .query(By.css('pdk-searchbar input'))
      .nativeElement.dispatchEvent(new Event('input'));
    fixture.debugElement.query(By.css('pdk-searchbar button')).nativeElement.click();

    expect(fixture.componentInstance.search).toHaveBeenCalledWith('*');
  }));

  it('should render a navigation menu', () => {
    const fixture = createFixture();
    fixture.componentInstance.headerNavItems = [
      { href: '#1', title: 'One' },
      { href: '#2', title: 'Two' }
    ];
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should render with support emails', () => {
    const fixture = createFixture();
    fixture.componentInstance.supportEmails = [
      {
        title: 'Defence practitioners',
        email: 'defence@hmcts.gsi.gov.uk',
        href: 'mailto:defence@hmcts.gsi.gov.uk?Subject=General%20enquiry'
      }
    ];
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  describe('cookies', () => {
    it('should start the cookies service after initialisation', () => {
      const fixture = createFixture();
      fixture.detectChanges();

      expect(cookies.start).toHaveBeenCalled();
    });

    describe('when the cookies preferences are not yet set', () => {
      beforeEach(() => {
        cookies.getCookiePreferencesExist = () => false;
      });

      it('should display the cookies banner', () => {
        const fixture = createFixture();
        fixture.detectChanges();

        expect(fixture).toMatchSnapshot();
      });

      it('should accept all cookies when prompted', () => {
        const fixture = createFixture();
        fixture.detectChanges();
        fixture.debugElement.query(By.css('[data-test-id="acceptCookies"]')).nativeElement.click();
        fixture.detectChanges();

        expect(cookies.setAllCookiesEnabled).toHaveBeenCalled();
        expect(cookies.restart).toHaveBeenCalled();
        expect(fixture).toMatchSnapshot();
      });

      it('should accept reject all cookies when prompted', () => {
        const fixture = createFixture();
        fixture.detectChanges();
        fixture.debugElement.query(By.css('[data-test-id="rejectCookies"]')).nativeElement.click();
        fixture.detectChanges();

        expect(cookies.setAllCookiesDisabled).toHaveBeenCalled();
        expect(cookies.restart).toHaveBeenCalled();
        expect(fixture).toMatchSnapshot();
      });
    });
  });

  describe('system announcements banner', () => {
    it('should render without announcement banner', () => {
      const fixture = createFixture();
      fixture.detectChanges();

      expect(systemAnnouncementsService.getSystemAnnouncements).toHaveBeenCalled();

      const bannerElement = fixture.debugElement.query(
        By.css('cpp-application-system-announcements-banner')
      );
      expect(bannerElement).toBeFalsy();
      expect(fixture).toMatchSnapshot();
    });

    it('should render with announcement banner when announcements are available', () => {
      const mockSystemAnnouncements: SystemAnnouncement[] = [
        {
          title: 'Planned System Maintenance',
          details: 'The system will be unavailable during this time',
          type: AnnouncementType.WARNING,
          category: AnnouncementCategory.PLANNED
        }
      ];

      systemAnnouncementsService.getSystemAnnouncements.mockReturnValue(
        of(mockSystemAnnouncements)
      );

      const fixture = createFixture();
      fixture.componentInstance.showDownTimeBanner = true;

      fixture.detectChanges();

      expect(systemAnnouncementsService.getSystemAnnouncements).toHaveBeenCalled();

      const bannerElement = fixture.debugElement.query(
        By.css('cpp-application-system-announcements-banner')
      );
      expect(bannerElement).toBeTruthy();
      expect(fixture).toMatchSnapshot();
    });

    it('should not render announcement banner if showDownTimeBanner is false, even when announcements exist', () => {
      const mockSystemAnnouncements: SystemAnnouncement[] = [
        {
          title: 'Planned System Maintenance',
          details: 'The system will be unavailable during this time',
          type: AnnouncementType.WARNING,
          category: AnnouncementCategory.PLANNED
        }
      ];

      systemAnnouncementsService.getSystemAnnouncements.mockReturnValue(
        of(mockSystemAnnouncements)
      );

      const fixture = createFixture();
      fixture.componentInstance.showDownTimeBanner = false;
      fixture.detectChanges();

      expect(systemAnnouncementsService.getSystemAnnouncements).toHaveBeenCalled();

      const bannerElement = fixture.debugElement.query(
        By.css('cpp-application-system-announcements-banner')
      );
      expect(bannerElement).toBeFalsy();
      expect(fixture).toMatchSnapshot();
    });
  });
});

@Component({
  selector: 'cpp-application-layout-test',
  template: `
    <cpp-application-layout
      [accessibilityLink]="accessibilityLink"
      [activity]="activity"
      cookiesLink="/cookies"
      [apiError]="apiError"
      [offline]="offline"
      [serviceName]="serviceName"
      [phaseType]="phaseType"
      [headerNavItems]="headerNavItems"
      [searchEnabled]="searchEnabled"
      [searchLabel]="searchLabel"
      [searchPlaceholder]="searchPlaceholder"
      [supportEmails]="supportEmails"
      [termsLink]="termsLink"
      [showDownTimeBanner]="showDownTimeBanner"
      (feedback)="feedback($event)"
      (search)="search($event)"
    >
    </cpp-application-layout>
  `,
  standalone: false
})
class LayoutTestComponent {
  accessibilityLink = '';
  activity = false;
  cookieMessage = true;
  apiError = false;
  offline = false;
  serviceName = 'Common Platform Programme';
  phaseType = 'beta';
  headerNavItems = [];
  searchEnabled = false;
  searchLabel = '';
  searchPlaceholder = '';
  showDownTimeBanner = true;
  supportEmails: SupportEmailItem[] = [
    {
      title: 'CPS (Crown Prosecution Service) users only',
      email: 'CJSCP-ServiceDesk@hmcts.gsi.gov.uk',
      href: 'mailto:CJSCP-ServiceDesk@hmcts.gsi.gov.uk?Subject=General%20enquiry'
    },
    {
      title: 'All other users',
      email: 'CJSCP-ServiceDesk@hmcts.net',
      href: 'mailto:CJSCP-ServiceDesk@hmcts.net?Subject=General%20enquiry'
    }
  ];
  termsLink = '';
  feedback = jest.fn();
  search = jest.fn();
}

@Component({
  selector: 'cpp-application-system-announcements-banner',
  template: `
    <div>Mock System Announcements Banner</div>
    <div>{{ announcements | json }}</div>
  `,
  imports: [JsonPipe]
})
class MockSystemAnnouncementsBannerComponent {
  @Input() announcements: SystemAnnouncement[] = [];
}
