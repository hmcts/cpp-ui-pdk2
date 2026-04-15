import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SignedOutErrorPageComponent } from '../signed-out-error-page.component';
describe('SignedOutErrorPageComponent', () => {
  let fixture: ComponentFixture<SignedOutErrorPageTestComponent>;
  const getCurrentNavigation = jest
    .fn()
    .mockReturnValue({ extras: { state: { redirectUrl: 'http://test.com' } } });
  const windowOpenMock = jest.fn();
  const nativeDate = Date.now;
  const mockDate = new Date('2020-02-07T10:20:30Z');

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignedOutErrorPageTestComponent],
      imports: [SignedOutErrorPageComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            getCurrentNavigation
          }
        }
      ]
    });

    fixture = TestBed.createComponent(SignedOutErrorPageTestComponent);
    window.open = windowOpenMock;
    fixture.detectChanges();
  });

  beforeEach(() => {
    global.Date.now = jest.fn(() => mockDate.getTime());
  });

  it('should render page', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should navigate to redirect page when sign in button is clicked', async () => {
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(windowOpenMock).toHaveBeenCalledWith(
      `http://test.com?timestamp=_${mockDate.getTime()}`,
      '_self'
    );
  });

  afterAll(() => {
    global.Date.now = nativeDate;
  });
});

@Component({
  selector: 'cpp-application-signed-out-page-test',
  template: ` <cpp-application-signed-out-page></cpp-application-signed-out-page> `,
  standalone: false
})
class SignedOutErrorPageTestComponent {}
