import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkHeader } from '..';
import { BreakpointObserver } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

describe('pdk-header', () => {
  let fixture: ComponentFixture<HeaderTestComponent>;
  let observe: jest.Mock;
  const mockSubject = new BehaviorSubject<{ matches: boolean }>({ matches: false });

  beforeEach(() => {
    observe = jest.fn(() => mockSubject);
    TestBed.overrideComponent(HeaderTestComponent, {
      set: {
        providers: [
          {
            provide: BreakpointObserver,
            useValue: { observe }
          }
        ]
      }
    });
    fixture = TestBed.createComponent(HeaderTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render links when in desktop mode', async () => {
    mockSubject.next({ matches: true });
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render menu when not in desktop mode', () => {
    mockSubject.next({ matches: false });
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-header-test',
  template: `
    <pdk-header>
      <a pdk-header-title href="#">SERVICE NAME</a>
      <pdk-header-nav>
        <pdk-header-nav-item>
          <a href="#" pdk-header-link>HEADER LINK</a>
        </pdk-header-nav-item>
      </pdk-header-nav>
    </pdk-header>
  `,
  imports: [PdkHeader]
})
class HeaderTestComponent {}
