import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceUnavailableErrorPageComponent } from '../service-unavailable-error-page.component';
import { provideRouter } from '@angular/router';

describe('cpp-application-service-unavailable-error-page', () => {
  let fixture: ComponentFixture<ServiceUnavailableErrorPageTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServiceUnavailableErrorPageTestComponent],
      imports: [ServiceUnavailableErrorPageComponent],
      providers: [provideRouter([])]
    });

    fixture = TestBed.createComponent(ServiceUnavailableErrorPageTestComponent);
    fixture.detectChanges();
  });

  it('should render page', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'cpp-application-service-unavailable-error-page-test',
  template: `
    <cpp-application-service-unavailable-error-page></cpp-application-service-unavailable-error-page>
  `,
  standalone: false
})
class ServiceUnavailableErrorPageTestComponent {}
