import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkErrorSummaryComponent } from '../error-summary.component';

describe('pdk-error-summary', () => {
  let fixture: ComponentFixture<ErrorSummaryTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorSummaryTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render with a custom title', () => {
    fixture.componentInstance.title = 'Custom title!';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-error-message-test',
  template: ` <pdk-error-summary [errors]="errors" [title]="title"> </pdk-error-summary> `,
  imports: [PdkErrorSummaryComponent]
})
class ErrorSummaryTestComponent {
  errors = [
    { id: '1', message: 'First error' },
    { id: '2', message: 'Second error' }
  ];
  title: string;
}
