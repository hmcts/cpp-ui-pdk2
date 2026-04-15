import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkSummaryList } from '..';

describe('pdk-summary-list', () => {
  let fixture: ComponentFixture<SummaryListTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryListTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-summary-list-test',
  template: `
    <dl pdk-summary-list>
      <div pdk-summary-list-item>
        <dt pdk-summary-list-key>Name</dt>
        <dd pdk-summary-list-value>Sarah Phillips</dd>
        <dd pdk-summary-list-action>
          <a pdk-link href="javascript:void(0)">Change<span pdk-visually-hidden> name</span></a>
        </dd>
      </div>
      <div pdk-summary-list-item>
        <dt pdk-summary-list-key>Date of birth</dt>
        <dd pdk-summary-list-value>5 January 1978</dd>
      </div>
      <div pdk-summary-list-item borderless>
        <dt pdk-summary-list-key>Contact information</dt>
        <dd pdk-summary-list-value>72 Guild Street<br />London<br />SE23 6FH</dd>
      </div>
      <div pdk-summary-list-item borderless>
        <dt pdk-summary-list-key pdk-visually-hidden>Contact information</dt>
        <dd pdk-summary-list-value>72 Guild Street<br />London<br />SE23 6FH</dd>
      </div>
    </dl>
  `,
  imports: [PdkSummaryList]
})
class SummaryListTestComponent {}
