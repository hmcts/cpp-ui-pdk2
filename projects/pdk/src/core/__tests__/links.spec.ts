import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkLinkDirective } from '../links';

describe('pdk-link', () => {
  let fixture: ComponentFixture<LinkTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkTestComponent);
    fixture.detectChanges();
  });

  it('should render with the default props', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render the muted style', () => {
    fixture.componentInstance.muted = undefined;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render the text style', () => {
    fixture.componentInstance.text = undefined;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render the unvisited style', () => {
    fixture.componentInstance.unvisited = undefined;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-link-test',
  template: ` <a pdk-link [muted]="muted" [text]="text" [unvisited]="unvisited"> My link! </a> `,
  imports: [PdkLinkDirective]
})
class LinkTestComponent {
  muted = false;
  text = false;
  unvisited = false;
}
