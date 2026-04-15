import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkInputComponent, PdkInputDirective } from '../input.directive';

describe('pdk-input', () => {
  let fixture: ComponentFixture<InputTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-input-test',
  template: `
    <input pdk-input /> <input pdk-input="2" /> <input pdk-input="3" /> <input pdk-input="4" />
    <input pdk-input="5" /> <input pdk-input="10" /> <input pdk-input="20" />
    <input pdk-input="30" /> <input pdk-input [hasError]="true" />
  `,
  imports: [PdkInputComponent, PdkInputDirective]
})
class InputTestComponent {}
