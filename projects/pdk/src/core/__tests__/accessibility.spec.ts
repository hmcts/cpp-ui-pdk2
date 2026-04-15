import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkVisuallyHiddenDirective } from '../accessibility';

describe('pdk-visually-hidden', () => {
  let fixture: ComponentFixture<PdkAccessibilityTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PdkAccessibilityTestComponent);
    fixture.detectChanges();
  });

  it('should render with the default props', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render the content as accessible for coerced boolean', () => {
    fixture.componentInstance.accessible = undefined;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-accessibility-test',
  template: ` <div [pdk-visually-hidden]="accessible"></div> `,
  imports: [PdkVisuallyHiddenDirective]
})
class PdkAccessibilityTestComponent {
  accessible = false;
}
