import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PdkTextInputDirective } from '../text-input.directive';

describe('pdk-text-input', () => {
  let fixture: ComponentFixture<TextInputTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TextInputTestComponent);
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
  selector: 'pdk-text-input-test',
  template: `
    <form>
      <input
        name="test"
        ngModel
        pdk-text-input
        id="TEXT_INPUT_ID"
        ariaDescribedby="ARIA_DESCRIBED_BY"
        required
      />
      <button type="submit"></button>
    </form>
  `,
  imports: [PdkTextInputDirective, FormsModule]
})
class TextInputTestComponent {}
