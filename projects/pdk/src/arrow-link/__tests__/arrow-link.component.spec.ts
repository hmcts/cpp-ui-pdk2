import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkArrowLinkComponent, ArrowLinkDirection } from '../arrow-link.component';

describe('pdk-arrow-link', () => {
  let fixture: ComponentFixture<ArrowLinkTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrowLinkTestComponent);
    fixture.detectChanges();
  });

  it('should render a forward arrow', () => {
    fixture.componentInstance.type = 'forward';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render a backwards arrow', () => {
    fixture.componentInstance.type = 'backward';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render a custom title', () => {
    fixture.componentInstance.title = 'Onwards';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-arrow-link-test',
  template: ` <pdk-arrow-link type="type" [title]="title"> My arrow link! </pdk-arrow-link> `,
  imports: [PdkArrowLinkComponent]
})
class ArrowLinkTestComponent {
  title: string;
  type: ArrowLinkDirection;
}
