import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PdkTabs } from '..';

describe('pdk-tabs', () => {
  let fixture: ComponentFixture<TabsTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should change tab according to the `selectedTabIndex`', () => {
    fixture.componentInstance.selectedTabIndex = 1;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should change tab when click a tab heading', () => {
    const tabHeadings = fixture.debugElement.queryAll(By.css('[role=tab]'));
    tabHeadings[1].nativeElement.click();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit tab changed', () => {
    expect(fixture.componentInstance.tabChange).toHaveBeenCalledTimes(1);
    fixture.detectChanges();
    const tabHeadings = fixture.debugElement.queryAll(By.css('[role=tab]'));
    tabHeadings[1].nativeElement.click();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.componentInstance.tabChange).toHaveBeenCalledTimes(2);
    tabHeadings[0].nativeElement.click();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.componentInstance.tabChange).toHaveBeenCalledTimes(3);
  });
});

@Component({
  selector: 'pdk-tabs-test',
  template: `
    <pdk-tabs [selectedTabIndex]="selectedTabIndex" (selectedTabChange)="tabChange($event)">
      <pdk-tab heading="Tab one"><p>First tab</p></pdk-tab>
      <pdk-tab>
        <pdk-tab-heading>Tab two</pdk-tab-heading>
        <p>Second tab</p>
      </pdk-tab>
    </pdk-tabs>
  `,
  imports: [PdkTabs]
})
class TabsTestComponent {
  selectedTabIndex: number;
  tabChange = jest.fn();
}
