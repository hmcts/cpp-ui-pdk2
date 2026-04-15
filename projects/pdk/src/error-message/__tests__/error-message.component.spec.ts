import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageConfig } from '../../form/form.interfaces';
import { PdkErrorMessageComponent } from '../error-message.component';

describe('pdk-error-message', () => {
  let fixture: ComponentFixture<ErrorMessageTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessageTestComponent);
    fixture.detectChanges();
  });

  it('should render a single error message from the `errors` provided', () => {
    fixture.componentInstance.errors = {
      email: true,
      required: true
    };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should accept custom error messages', () => {
    fixture.componentInstance.errors = { required: true };
    fixture.componentInstance.errorMessages = [
      {
        rule: 'required',
        message: 'A postcode is required'
      }
    ];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render an custom error message', () => {
    fixture.componentInstance.errors = {
      count: {
        expected: 5,
        actual: 10
      }
    };
    fixture.componentInstance.errorMessages = [
      {
        rule: 'count',
        message: ({ expected, actual }) => {
          return `Expected ${expected} but got ${actual}`;
        }
      }
    ];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should fallback to a default error message when the type is unknown', () => {
    fixture.componentInstance.errors = { unknown: true };
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-error-message-test',
  template: `
    <pdk-error-message [errors]="errors" [errorMessages]="errorMessages"> </pdk-error-message>
  `,
  imports: [PdkErrorMessageComponent]
})
class ErrorMessageTestComponent {
  errors: { [type: string]: any } = {};
  errorMessages: ErrorMessageConfig[];
}
