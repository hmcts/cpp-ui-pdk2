import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TimedOutErrorPageComponent } from '../timed-out-error-page.component';

describe('cpp-application-technical-error-page', () => {
  let fixture: ComponentFixture<TimedOutErrorPageTestComponent>;
  const getCurrentNavigation = jest
    .fn()
    .mockReturnValue({ extras: { state: { redirectUrl: 'http://test.com' } } });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimedOutErrorPageTestComponent],
      imports: [TimedOutErrorPageComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            getCurrentNavigation
          }
        }
      ]
    });

    fixture = TestBed.createComponent(TimedOutErrorPageTestComponent);
    fixture.detectChanges();
  });

  it('should render page', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'cpp-application-technical-error-page-test',
  template: ` <cpp-application-timed-out-page></cpp-application-timed-out-page> `,
  standalone: false
})
class TimedOutErrorPageTestComponent {}
