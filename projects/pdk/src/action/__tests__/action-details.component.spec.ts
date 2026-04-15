import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkAction } from '..';

describe('pdk-action-details', () => {
  let fixture: ComponentFixture<TestPdkActionDetailsComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPdkActionDetailsComponent);
    fixture.detectChanges();
  });

  it('should render with the default action-details', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render highlighted action details', () => {
    fixture.componentInstance.highlighted = undefined;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-action-details-test',
  template: `
    <pdk-action-details [highlighted]="highlighted">
      <pdk-action-title>Action title!</pdk-action-title>
      <pdk-action-body>Action body!</pdk-action-body>
      <pdk-action-options>Action options!</pdk-action-options>
    </pdk-action-details>
  `,
  imports: [PdkAction]
})
class TestPdkActionDetailsComponent {
  highlighted = false;
}
