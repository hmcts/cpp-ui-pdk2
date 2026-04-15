import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkTypographyDirective } from '../typography';

describe('pdk-typography', () => {
  let fixture: ComponentFixture<TypographyTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TypographyTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-typography-test',
  template: `
    <span pdk-typography="heading-xlarge"></span>
    <span pdk-typography="heading-large"></span>
    <span pdk-typography="heading-medium"></span>
    <span pdk-typography="heading-small"></span>
    <span pdk-typography="caption-xlarge"></span>
    <span pdk-typography="caption-large"></span>
    <span pdk-typography="caption-medium"></span>
    <span pdk-typography="body-large"></span>
    <span pdk-typography="body-medium"></span>
    <span pdk-typography="body-small"></span>
    <span pdk-typography="body-xsmall"></span>
    <span pdk-typography="body"></span>
    <span pdk-typography="body-lead"></span>
    <span pdk-typography></span>
  `,
  imports: [PdkTypographyDirective]
})
class TypographyTestComponent {}
