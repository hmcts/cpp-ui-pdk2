import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnicalErrorPageComponent } from '../technical-error-page.component';
import { provideRouter } from '@angular/router';

describe('cpp-application-technical-error-page', () => {
  let fixture: ComponentFixture<TechnicalErrorPageTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TechnicalErrorPageTestComponent],
      imports: [TechnicalErrorPageComponent],
      providers: [provideRouter([])]
    });

    fixture = TestBed.createComponent(TechnicalErrorPageTestComponent);
    fixture.detectChanges();
  });

  it('should render page', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'cpp-application-technical-error-page-test',
  template: ` <cpp-application-technical-error-page></cpp-application-technical-error-page> `,
  standalone: false
})
class TechnicalErrorPageTestComponent {}
