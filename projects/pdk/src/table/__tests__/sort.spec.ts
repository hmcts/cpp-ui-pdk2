import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PdkTable } from '..';
describe('pdkSort', () => {
  let fixture: ComponentFixture<SortTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SortTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should change sort direction when clicked', async () => {
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(fixture.componentInstance.directionChangeMock).toHaveBeenCalledWith('desc');
  });
});

@Component({
  selector: 'pdk-sort-test',
  template: `
    <table pdk-table>
      <caption pdk-table-caption>
        Dates and amounts
      </caption>
      <thead pdk-table-head>
        <tr pdk-table-row>
          <th
            pdk-table-header
            pdk-sortable-header
            [direction]="direction"
            (directionChange)="directionChangeMock($event)"
          >
            Date
          </th>
        </tr>
      </thead>
      <tbody pdk-table-body>
        <tr pdk-table-row>
          <td pdk-table-cell>20 August 2021</td>
        </tr>
      </tbody>
    </table>
  `,
  imports: [PdkTable]
})
class SortTestComponent {
  direction = 'asc';
  directionChangeMock = jest.fn();
}
