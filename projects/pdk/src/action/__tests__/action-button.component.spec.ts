import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PdkActionButtonComponent } from '../action-button.component';

describe('pdk-action-button', () => {
  let fixture: ComponentFixture<ActionButtonTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonTestComponent);
    fixture.detectChanges();
  });

  it('should render the default action button', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render an `inverted` action button', () => {
    fixture.componentInstance.inverted = undefined;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render a `disabled` action button', () => {
    fixture.componentInstance.disabled = undefined;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render an `error` action button', () => {
    fixture.componentInstance.error = undefined;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should handle focusing the button while it is not disabled', () => {
    const a = fixture.debugElement.query(By.css('a'));
    a.nativeElement.dispatchEvent(new Event('focus'));
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-action-button-test',
  template: `
    <a pdk-action-button [disabled]="disabled" [error]="error" [inverted]="inverted">
      Action button
    </a>
  `,
  imports: [PdkActionButtonComponent]
})
class ActionButtonTestComponent {
  disabled = false;
  error = false;
  inverted = false;
}
