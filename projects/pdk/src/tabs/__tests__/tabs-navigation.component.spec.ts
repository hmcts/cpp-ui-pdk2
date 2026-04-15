import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkTabs } from '..';

describe('pdk-tabs-navigation', () => {
  let fixture: ComponentFixture<TabsNavigationTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsNavigationTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-tabs-navigation-test',
  template: `
    <pdk-tabs-navigation>
      <pdk-tabs-nav-item [selected]="true">
        <a href="#" pdk-tabs-link>Tab one</a>
      </pdk-tabs-nav-item>
      <pdk-tabs-nav-item> <a href="#" pdk-tabs-link>Tab two</a> </pdk-tabs-nav-item>
    </pdk-tabs-navigation>
  `,
  imports: [PdkTabs]
})
class TabsNavigationTestComponent {}
