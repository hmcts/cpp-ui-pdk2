import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkBreadcrumbs } from '..';

describe('pdk-breadcrumb-list', () => {
  let fixture: ComponentFixture<BreadcrumbsTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsTestComponent);
    fixture.detectChanges();
  });

  it('should render with the default props', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render the active breadcrumb', () => {
    fixture.componentInstance.breadcrumb = 'active';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-breadcrumbs-test',
  template: `
    <ol pdk-breadcrumb-list>
      <li pdk-breadcrumb-list-item><a [pdk-breadcrumb]="breadcrumb">My breadcrumb!</a></li>
    </ol>
  `,
  imports: [PdkBreadcrumbs]
})
class BreadcrumbsTestComponent {
  breadcrumb = null;
}
