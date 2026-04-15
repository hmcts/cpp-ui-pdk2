import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import {
  PdkContextPanelComponent,
  ContextPanelIconType,
  ContextPanelType
} from '../context-panel.component';

describe('pdk-context-panel', () => {
  let component: TestContextPanelComponent;
  let fixture: ComponentFixture<TestContextPanelComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestContextPanelComponent);
    component = fixture.componentInstance;
  });

  it('should render correctly', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render correctly when type is set to "confirmation"', () => {
    component.type = 'confirmation';
    component.icon = 'tick';

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render correctly when type is set to "success" and icon set to tick', () => {
    component.type = 'success';
    component.icon = 'tick';

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render correctly when type set to "invalid" and icon set to "warn"', () => {
    component.type = 'invalid';
    component.icon = 'warn';

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render correctly when type is set to "important" ', () => {
    component.type = 'important';

    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-context-panel-test',
  template: `
    <pdk-context-panel title="Panel title" [icon]="icon" [type]="type">
      Panel content here
    </pdk-context-panel>
  `,
  imports: [PdkContextPanelComponent]
})
class TestContextPanelComponent {
  icon: ContextPanelIconType;
  type: ContextPanelType;
}
