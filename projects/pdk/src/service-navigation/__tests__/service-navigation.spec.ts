import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkServiceNavigation } from '..';

describe('pdk-service-nav', () => {
  let fixture: ComponentFixture<ServiceNavigationTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceNavigationTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-service-nav-test',
  template: `
    <nav pdk-service-nav>
      <ul pdk-service-nav-list>
        <li pdk-service-nav-list-item [selected]="true">
          <a href="javascript:void(0)">Service item 1</a>
        </li>
        <li pdk-service-nav-list-item><a href="javascript:void(0)">Service item 2</a></li>
        <li pdk-service-nav-list-item><a href="javascript:void(0)">Service item 3</a></li>
      </ul>
    </nav>
  `,
  imports: [PdkServiceNavigation]
})
class ServiceNavigationTestComponent {}
