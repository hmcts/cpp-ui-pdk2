import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkFooter } from '..';
import { PdkTypographyDirective } from '../../core';

describe('pdk-footer', () => {
  let fixture: ComponentFixture<FooterTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-footer-test',
  template: `
    <pdk-footer>
      <pdk-footer-meta>
        <h2 pdk-typography="heading-medium">Help desk</h2>
        <dl>
          <dt>CPS (Crown Prosecution Service) users only</dt>
          <dd><a pdk-footer-link href="#"> CJSCP-ServiceDesk&#64;hmcts.gsi.gov.uk </a></dd>
        </dl>
      </pdk-footer-meta>
    </pdk-footer>
  `,
  imports: [PdkFooter, PdkTypographyDirective]
})
class FooterTestComponent {}
