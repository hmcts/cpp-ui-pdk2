import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkPageHeader } from '..';

describe('pdk-page-header', () => {
  let fixture: ComponentFixture<PageHeaderTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PageHeaderTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-page-header-test',
  template: `
    <pdk-page-header>
      <pdk-page-header-content marker="MARKER" reference="1230DAMDAS2">
        <span pdk-typography="body-small">My title</span>
      </pdk-page-header-content>
      <pdk-page-header-nav>
        <a pdk-page-header-nav-item>Navigation link</a>
      </pdk-page-header-nav>
    </pdk-page-header>
  `,
  imports: [PdkPageHeader]
})
class PageHeaderTestComponent {}
