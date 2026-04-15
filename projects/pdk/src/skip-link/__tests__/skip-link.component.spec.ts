import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkSkipLinkComponent } from '../skip-link.component';

describe('pdk-skip-link', () => {
  let fixture: ComponentFixture<SkipLinkTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipLinkTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-skip-link-test',
  template: ` <pdk-skip-link target="target-id"></pdk-skip-link> `,
  imports: [PdkSkipLinkComponent]
})
class SkipLinkTestComponent {}
