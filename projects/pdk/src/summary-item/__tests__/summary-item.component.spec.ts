import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkSummaryItemComponent } from '../summary-item.component';

describe('pdk-summary-item', () => {
  let fixture: ComponentFixture<SummaryItemTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryItemTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-summary-item-test',
  template: `
    <pdk-summary-item count="2" label="Items"></pdk-summary-item>
    <pdk-summary-item count="2" label="Items" inline hero></pdk-summary-item>
  `,
  imports: [PdkSummaryItemComponent]
})
class SummaryItemTestComponent {}
