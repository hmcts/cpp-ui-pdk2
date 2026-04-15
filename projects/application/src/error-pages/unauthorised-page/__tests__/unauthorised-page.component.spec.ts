import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UnauthorisedPageComponent } from '../unauthorised-page.component';

describe('cpp-application-unauthorised-page', () => {
  let fixture: ComponentFixture<UnauthorisedPageTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnauthorisedPageTestComponent],
      imports: [UnauthorisedPageComponent]
    });

    fixture = TestBed.createComponent(UnauthorisedPageTestComponent);
    fixture.detectChanges();
  });

  it('should render page', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'cpp-application-unauthorised-page-test',
  template: ` <cpp-application-unauthorised-page></cpp-application-unauthorised-page> `,
  standalone: false
})
class UnauthorisedPageTestComponent {}
