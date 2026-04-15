import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkFocusableDirective, PdkFocusedDirective } from '../focusable';

describe('pdk-focused', () => {
  let fixture: ComponentFixture<PdkFocusedTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PdkFocusedTestComponent);
    fixture.detectChanges();
  });

  it('should render with the default props', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render the focused styles', () => {
    fixture.componentInstance.focused = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-focused-test',
  template: ` <div pdk-focusable [pdk-focused]="focused"></div> `,
  imports: [PdkFocusableDirective, PdkFocusedDirective]
})
class PdkFocusedTestComponent {
  focused = false;
}
