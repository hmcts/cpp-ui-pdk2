import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkTable } from '..';

describe('pdk-table', () => {
  let fixture: ComponentFixture<TableTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-table-test',
  template: `
    <table pdk-table>
      <caption pdk-table-caption>
        Dates and amounts
      </caption>
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th pdk-table-header>Date</th>
          <th pdk-table-header>Amount</th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        <tr pdk-table-row>
          <th pdk-table-header="row">First 6 weeks</th>
          <td pdk-table-cell>£109.80 per week</td>
        </tr>
      </tbody>
    </table>
  `,
  imports: [PdkTable]
})
class TableTestComponent {}
