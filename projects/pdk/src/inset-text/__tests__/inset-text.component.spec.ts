import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkInsetTextComponent } from '../inset-text.component';

describe('pdk-inset-text', () => {
  let fixture: ComponentFixture<InsetTextTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InsetTextTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-inset-text-test',
  template: `
    <pdk-inset-text>My content</pdk-inset-text>
    <pdk-inset-text compound>My content</pdk-inset-text>
  `,
  imports: [PdkInsetTextComponent]
})
class InsetTextTestComponent {}
