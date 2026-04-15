import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkPanelComponent, PanelType } from '../panel.component';

describe('pdk-panel', () => {
  let fixture: ComponentFixture<PanelTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelTestComponent);
    fixture.detectChanges();
  });

  it('should render a confirmation panel', () => {
    fixture.componentInstance.type = 'confirmation';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-panel-test',
  template: ` <pdk-panel [type]="type" title="Panel title!"> Panel body </pdk-panel> `,
  imports: [PdkPanelComponent]
})
class PanelTestComponent {
  type: PanelType;
}
