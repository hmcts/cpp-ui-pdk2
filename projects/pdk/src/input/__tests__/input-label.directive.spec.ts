import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkLabelComponent, PdkLabelDirective } from '../input-label.directive';

describe('pdk-label', () => {
  let fixture: ComponentFixture<LabelTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-label-test',
  template: `
    <label pdk-label></label>
    <label pdk-label="small"></label>
    <label pdk-label="medium"></label>
    <label pdk-label="large"></label>
    <label pdk-label="xlarge"></label>
  `,
  imports: [PdkLabelComponent, PdkLabelDirective]
})
class LabelTestComponent {}
