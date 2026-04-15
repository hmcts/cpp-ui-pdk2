import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PdkPasswordInputComponent } from '../password-input';

describe('pdk-password-input', () => {
  let fixture: ComponentFixture<PasswordInputTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordInputTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should display an error when submitted with an invalid model', () => {
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-password-input-test',
  template: `
    <form>
      <pdk-password-input
        name="test"
        ngModel
        id="TEXT_INPUT_ID"
        ariaDescribedby="ARIA_DESCRIBED_BY"
        required
      ></pdk-password-input>
      <button type="submit"></button>
    </form>
  `,
  imports: [PdkPasswordInputComponent, FormsModule]
})
class PasswordInputTestComponent {}
