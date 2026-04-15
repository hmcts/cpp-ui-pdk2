import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkDividerComponent } from '../divider.component';

describe('pdk-divider', () => {
  let fixture: ComponentFixture<DividerTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DividerTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-divider-test',
  template: `
    <pdk-divider></pdk-divider>
    <pdk-divider dark></pdk-divider>
    <pdk-divider hero></pdk-divider>
  `,
  imports: [PdkDividerComponent]
})
class DividerTestComponent {}
