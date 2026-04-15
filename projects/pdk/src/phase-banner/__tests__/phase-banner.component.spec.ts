import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkPhaseBannerComponent } from '../phase-banner.component';

describe('pdk-phase-banner', () => {
  let fixture: ComponentFixture<PhaseBannerTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseBannerTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-phase-banner-test',
  template: `
    <pdk-phase-banner type="PHASE_TYPE"> Here is the phase banner content! </pdk-phase-banner>
  `,
  imports: [PdkPhaseBannerComponent]
})
class PhaseBannerTestComponent {}
