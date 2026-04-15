import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundPageComponent } from '../not-found-page.component';

describe('cpp-application-not-found-page', () => {
  let fixture: ComponentFixture<NotFoundPageTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotFoundPageTestComponent],
      imports: [NotFoundPageComponent]
    });

    fixture = TestBed.createComponent(NotFoundPageTestComponent);
    fixture.detectChanges();
  });

  it('should render page', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'cpp-application-not-found-page-test',
  template: ` <cpp-application-not-found-page></cpp-application-not-found-page> `,
  standalone: false
})
class NotFoundPageTestComponent {}
