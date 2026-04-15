import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkMarginDirective, PdkPaddingDirective } from '../spacing';

describe('pdk-margin', () => {
  let fixture: ComponentFixture<MarginTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarginTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

describe('pdk-padding', () => {
  let fixture: ComponentFixture<PaddingTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaddingTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-margin-test',
  template: `
    <div pdk-margin="1"></div>
    <div pdk-margin-top="1"></div>
    <div pdk-margin-right="1"></div>
    <div pdk-margin-bottom="1"></div>
    <div pdk-margin-left="1"></div>
    <div pdk-margin-horizontal="1"></div>
    <div pdk-margin-vertical="1"></div>
    <div pdk-margin="-1"></div>
    <div pdk-margin-top="-1"></div>
    <div pdk-margin-right="-1"></div>
    <div pdk-margin-bottom="-1"></div>
    <div pdk-margin-left="-1"></div>
    <div pdk-margin-horizontal="-1"></div>
    <div pdk-margin-vertical="-1"></div>
  `,
  imports: [PdkMarginDirective]
})
class MarginTestComponent {}

@Component({
  selector: 'pdk-padding-test',
  template: `
    <div pdk-padding="1"></div>
    <div pdk-padding-top="1"></div>
    <div pdk-padding-right="1"></div>
    <div pdk-padding-bottom="1"></div>
    <div pdk-padding-left="1"></div>
    <div pdk-padding-horizontal="1"></div>
    <div pdk-padding-vertical="1"></div>
  `,
  imports: [PdkPaddingDirective]
})
class PaddingTestComponent {}
