import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PdkCollapsable } from '..';

describe('pdk-collapsable', () => {
  let fixture: ComponentFixture<CollapsableTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsableTestComponent);
    fixture.detectChanges();
  });

  it('should render with the default props', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render with custom labels', () => {
    fixture.componentInstance.ariaLabel = 'ARIA_LABEL';
    fixture.componentInstance.collapsedLabel = 'COLLAPSED_LABEL';
    fixture.componentInstance.expandedLabel = 'UNCOLLAPSED_LABEL';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should toggle the collapsable content', () => {
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.componentInstance.change).toHaveBeenCalledTimes(1);
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.componentInstance.change).toHaveBeenCalledTimes(2);
  });

  it('should collapse content using the `collapsed` prop', () => {
    fixture.componentInstance.collapsed = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-collapsable-test',
  template: `
    <pdk-collapsable
      [ariaLabel]="ariaLabel"
      [collapsed]="collapsed"
      [collapsedLabel]="collapsedLabel"
      [expandedLabel]="expandedLabel"
      (collapseChange)="change($event)"
    >
      <p>This content cannot collapse.</p>
      <p pdk-collapse>This content will collapse.</p>
    </pdk-collapsable>
  `,
  imports: [PdkCollapsable]
})
class CollapsableTestComponent {
  ariaLabel: string;
  collapsed: boolean;
  collapsedLabel: string;
  expandedLabel: string;
  change = jest.fn();
}
