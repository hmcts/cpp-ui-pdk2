import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadErrorPageComponent } from '../download-error-page.component';
import { provideRouter } from '@angular/router';

describe('cpp-application-download-error-page', () => {
  let fixture: ComponentFixture<DownloadErrorPageTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DownloadErrorPageTestComponent],
      imports: [DownloadErrorPageComponent],
      providers: [provideRouter([])]
    });

    fixture = TestBed.createComponent(DownloadErrorPageTestComponent);
    fixture.detectChanges();
  });

  it('should render page', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'cpp-application-download-error-page-test',
  template: ` <cpp-application-download-error-page></cpp-application-download-error-page> `,
  standalone: false
})
class DownloadErrorPageTestComponent {}
