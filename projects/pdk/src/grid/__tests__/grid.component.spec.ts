import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkGrid } from '..';

describe('pdk-grid', () => {
  let fixture: ComponentFixture<GridTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GridTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-grid-test',
  template: `
    <pdk-grid container>
      <pdk-grid full></pdk-grid>
      <pdk-grid one-half></pdk-grid>
      <pdk-grid one-third></pdk-grid>
      <pdk-grid two-thirds></pdk-grid>
      <pdk-grid one-quarter></pdk-grid>
      <pdk-grid three-quarters></pdk-grid>
      <pdk-grid offset-one-half></pdk-grid>
      <pdk-grid offset-one-third></pdk-grid>
      <pdk-grid offset-two-thirds></pdk-grid>
      <pdk-grid offset-one-quarter></pdk-grid>
      <pdk-grid offset-three-quarters></pdk-grid>
    </pdk-grid>
  `,
  imports: [PdkGrid]
})
class GridTestComponent {}
