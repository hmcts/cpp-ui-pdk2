import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkMastheadComponent } from '../masthead.component';

describe('pdk-masthead', () => {
  let fixture: ComponentFixture<MastheadTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MastheadTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-masthead-test',
  template: ` <pdk-masthead>My masthead</pdk-masthead> `,
  imports: [PdkMastheadComponent]
})
class MastheadTestComponent {}
