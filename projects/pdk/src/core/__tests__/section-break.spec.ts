import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkSectionBreakDirective } from '../section-break';

describe('pdk-section', () => {
  let fixture: ComponentFixture<SectionTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-section-test',
  template: `
    <div pdk-section="small"></div>
    <div pdk-section="medium"></div>
    <div pdk-section="large"></div>
    <div pdk-section="xlarge"></div>
  `,
  imports: [PdkSectionBreakDirective]
})
class SectionTestComponent {}
