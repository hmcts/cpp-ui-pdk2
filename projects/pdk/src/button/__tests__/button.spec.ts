import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonType } from '../button';
import { PdkButton } from '..';

describe('pdk-button', () => {
  let fixture: ComponentFixture<ButtonTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTestComponent);
    fixture.detectChanges();
  });

  it('should render a default button', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render a disabled button', () => {
    fixture.componentInstance.disabled = undefined;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render a start variation', () => {
    fixture.componentInstance.type = 'start';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render a secondary variation', () => {
    fixture.componentInstance.type = 'secondary';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-button-test',
  template: ` <button [disabled]="disabled" [type]="type" pdk-button></button> `,
  imports: [PdkButton]
})
class ButtonTestComponent {
  disabled = false;
  type: ButtonType;
}
