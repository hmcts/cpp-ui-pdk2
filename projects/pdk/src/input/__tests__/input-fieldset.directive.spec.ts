import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkFieldsetComponent, PdkFieldsetLegendDirective } from '../input-fieldset.directive';

describe('pdk-fieldset / pdk-legend', () => {
  let fixture: ComponentFixture<FieldsetTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldsetTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-fieldset-test',
  template: `
    <fieldset pdk-fieldset>
      <legend pdk-legend></legend>
      <legend pdk-legend="small"></legend>
      <legend pdk-legend="medium"></legend>
      <legend pdk-legend="large"></legend>
      <legend pdk-legend="xlarge"></legend>
    </fieldset>
  `,
  imports: [PdkFieldsetComponent, PdkFieldsetLegendDirective]
})
class FieldsetTestComponent {}
