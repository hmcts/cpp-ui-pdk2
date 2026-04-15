import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkDetailsSummary } from '..';

describe('[pdk-details]', () => {
  let fixture: ComponentFixture<DetailsTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-details-test',
  template: `
    <details pdk-details>
      <summary>Test summary</summary>
      <pdk-details-text>Test text</pdk-details-text>
    </details>
  `,
  imports: [PdkDetailsSummary]
})
class DetailsTestComponent {}
