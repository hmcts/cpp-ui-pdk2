import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { SystemAnnouncementsBannerComponent } from '../system-announcements-banner.component';
import { PdkNotificationBannerComponent } from '@cpp/pdk';
import { AnnouncementCategory, AnnouncementType, SystemAnnouncement } from '@cpp/users-groups';

const SYSTEM_ANNOUNCEMENTS_ROUTE = '/system-announcements/notifications';

describe('SystemAnnouncementsBannerComponent', () => {
  let component: SystemAnnouncementsBannerComponent;
  let fixture: ComponentFixture<SystemAnnouncementsBannerComponent>;
  let router: Router;
  let routerEventsSubject: Subject<any>;

  const mockAnnouncements: SystemAnnouncement[] = [
    {
      title: 'Critical Announcement',
      details: 'Critical details',
      type: AnnouncementType.CRITICAL,
      category: AnnouncementCategory.UNPLANNED
    },
    {
      title: 'Warning Announcement',
      details: 'Warning details',
      type: AnnouncementType.WARNING,
      category: AnnouncementCategory.PLANNED
    },
    {
      title: 'Information Announcement',
      details: 'Information details',
      type: AnnouncementType.INFORMATION,
      category: AnnouncementCategory.PLANNED
    }
  ];

  beforeEach(() => {
    routerEventsSubject = new Subject();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: {
            events: routerEventsSubject.asObservable(),
            navigate: jest.fn(),
            routerState: { root: {} }
          }
        }
      ]
    });

    fixture = TestBed.createComponent(SystemAnnouncementsBannerComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  describe('banner type', () => {
    it('should render a critical announcement banner', fakeAsync(() => {
      component.announcements = [mockAnnouncements[0]];
      component.ngOnInit();
      fixture.detectChanges();

      routerEventsSubject.next(new NavigationEnd(1, '/home', ''));
      tick();
      fixture.detectChanges();

      const bannerElement = fixture.debugElement.query(By.css('.cpp-system-announcement'));
      const pdkBannerDE = fixture.debugElement.query(By.directive(PdkNotificationBannerComponent));

      expect(
        bannerElement.nativeElement.classList.contains('cpp-system-announcement--critical')
      ).toBe(true);
      expect(pdkBannerDE.componentInstance.title).toBe('Critical');
    }));

    it('should render a warning announcement banner', fakeAsync(() => {
      component.announcements = [mockAnnouncements[1]];
      component.ngOnInit();
      fixture.detectChanges();

      routerEventsSubject.next(new NavigationEnd(1, '/home', ''));
      tick();
      fixture.detectChanges();

      const bannerElement = fixture.debugElement.query(By.css('.cpp-system-announcement'));
      const pdkBannerDE = fixture.debugElement.query(By.directive(PdkNotificationBannerComponent));

      expect(
        bannerElement.nativeElement.classList.contains('cpp-system-announcement--warning')
      ).toBe(true);
      expect(pdkBannerDE.componentInstance.title).toBe('Warning');
    }));

    it('should render an information announcement banner', fakeAsync(() => {
      component.announcements = [mockAnnouncements[2]];
      component.ngOnInit();
      fixture.detectChanges();

      routerEventsSubject.next(new NavigationEnd(1, '/home', ''));
      tick();
      fixture.detectChanges();

      const bannerElement = fixture.debugElement.query(By.css('.cpp-system-announcement'));
      const pdkBannerDE = fixture.debugElement.query(By.directive(PdkNotificationBannerComponent));

      expect(
        bannerElement.nativeElement.classList.contains('cpp-system-announcement--information')
      ).toBe(true);
      expect(pdkBannerDE.componentInstance.title).toBe('Information');
    }));
  });

  it('should limit visible announcements to 2', () => {
    component.announcements = mockAnnouncements;
    fixture.detectChanges();
    expect(component.visibleAnnouncements.length).toBe(2);
    expect(component.visibleAnnouncements[0]).toEqual(mockAnnouncements[0]);
    expect(component.visibleAnnouncements[1]).toEqual(mockAnnouncements[1]);
  });

  it('should filter announcements by category correctly', () => {
    component.announcements = mockAnnouncements;
    fixture.detectChanges();
    expect(component.plannedAnnouncements.length).toBe(2);
    expect(component.unplannedAnnouncements.length).toBe(1);
  });

  describe('hasAdditionalDetails', () => {
    it('returns true if announcements exceed max visible count', () => {
      component.announcements = mockAnnouncements;
      fixture.detectChanges();
      expect(component.hasAdditionalDetails()).toBe(true);
    });

    it('returns true if announcements have details, even if <= max visible', () => {
      component.announcements = mockAnnouncements.slice(0, 2);
      fixture.detectChanges();
      expect(component.hasAdditionalDetails()).toBe(true);
    });

    it('returns false if announcements do not exceed max visible & have no details', () => {
      const noDetails = [
        { ...mockAnnouncements[0], details: undefined },
        { ...mockAnnouncements[1], details: undefined }
      ];
      component.announcements = noDetails;
      fixture.detectChanges();
      expect(component.hasAdditionalDetails()).toBe(false);
    });
  });

  describe('navigateToDetailsPage', () => {
    it('should navigate to details page with announcements in router state', () => {
      component.announcements = mockAnnouncements;
      component.ngOnInit();
      fixture.detectChanges();

      component.navigateToDetailsPage();
      expect(router.navigate).toHaveBeenCalledWith([SYSTEM_ANNOUNCEMENTS_ROUTE], {
        state: { announcements: mockAnnouncements }
      });
    });
  });

  describe('showBanner$ observable behavior', () => {
    beforeEach(() => {
      component.announcements = mockAnnouncements;
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('shows banner (true) when not on system announcements page', fakeAsync(() => {
      let bannerVisible: boolean | null = null;
      component.showBanner$.subscribe((visible) => {
        bannerVisible = visible;
      });

      routerEventsSubject.next(new NavigationEnd(2, '/home', ''));
      tick();

      expect(bannerVisible).toBe(true);
    }));

    it('hides banner (false) when on system announcements page', fakeAsync(() => {
      let bannerVisible: boolean | null = null;
      component.showBanner$.subscribe((visible) => {
        bannerVisible = visible;
      });

      routerEventsSubject.next(new NavigationEnd(2, SYSTEM_ANNOUNCEMENTS_ROUTE, ''));
      tick();

      expect(bannerVisible).toBe(false);
    }));

    it('shows banner again if we navigate away from system announcements', fakeAsync(() => {
      let bannerVisible: boolean | null = null;
      component.showBanner$.subscribe((visible) => {
        bannerVisible = visible;
      });

      routerEventsSubject.next(new NavigationEnd(2, SYSTEM_ANNOUNCEMENTS_ROUTE, ''));
      tick();
      expect(bannerVisible).toBe(false);

      routerEventsSubject.next(new NavigationEnd(3, '/another-route', ''));
      tick();
      expect(bannerVisible).toBe(true);
    }));
  });
});
