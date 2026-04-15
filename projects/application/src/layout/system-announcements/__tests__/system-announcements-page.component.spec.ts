import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AnnouncementCategory, AnnouncementType, SystemAnnouncement } from '@cpp/users-groups';
import { SystemAnnouncementsPageComponent } from '../system-announcements-page.component';
import { Location } from '@angular/common';

describe('SystemAnnouncementsPageComponent', () => {
  let component: SystemAnnouncementsPageComponent;
  let fixture: ComponentFixture<SystemAnnouncementsPageComponent>;
  let router: Router;
  let location: Location;

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
    const mockNavigation = {
      extras: {
        state: {
          announcements: mockAnnouncements
        }
      }
    };

    TestBed.configureTestingModule({
      imports: [SystemAnnouncementsPageComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
            getCurrentNavigation: jest.fn().mockReturnValue(mockNavigation),
            routerState: {
              root: {}
            }
          }
        },
        {
          provide: Location,
          useValue: {
            back: jest.fn()
          }
        }
      ]
    });

    fixture = TestBed.createComponent(SystemAnnouncementsPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should render the page with announcements', () => {
    fixture.detectChanges();
    expect(component.announcements).toEqual(mockAnnouncements);
    expect(fixture).toBeTruthy();
  });

  it('should retrieve announcements from navigation state', () => {
    fixture.detectChanges();
    expect(router.getCurrentNavigation).toHaveBeenCalled();
    expect(component.announcements).toEqual(mockAnnouncements);
  });

  it('should navigate to home if no announcements are found', () => {
    (router.getCurrentNavigation as jest.Mock).mockReturnValue({
      extras: { state: {} }
    });

    const componentFixture = TestBed.createComponent(SystemAnnouncementsPageComponent);
    componentFixture.detectChanges();

    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should filter planned announcements correctly', () => {
    fixture.detectChanges();

    expect(component.plannedAnnouncements.length).toBe(2);
    expect(component.plannedAnnouncements[0]).toEqual(mockAnnouncements[1]);
    expect(component.plannedAnnouncements[1]).toEqual(mockAnnouncements[2]);
  });

  it('should filter unplanned announcements correctly', () => {
    fixture.detectChanges();

    expect(component.unplannedAnnouncements.length).toBe(1);
    expect(component.unplannedAnnouncements[0]).toEqual(mockAnnouncements[0]);
  });

  it('should navigate back when goBack is called', () => {
    fixture.detectChanges();

    component.goBack();

    expect(location.back).toHaveBeenCalled();
  });
});
