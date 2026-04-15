import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  PdkBorderColorDirective,
  PdkFillColorDirective,
  PdkColor,
  PdkTextColorDirective
} from '../colour';

describe('pdk-fill-colour', () => {
  let fixture: ComponentFixture<PdkFillColourTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PdkFillColourTestComponent);
    fixture.detectChanges();
  });

  it('should render the provided fill colour', () => {
    fixture.componentInstance.colour = 'purple';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    fixture.componentInstance.colour = 'red';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

describe('pdk-text-colour', () => {
  let fixture: ComponentFixture<PdkTextColourComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PdkTextColourComponent);
    fixture.detectChanges();
  });

  it('should render the provided text colour', () => {
    fixture.componentInstance.colour = 'purple';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    fixture.componentInstance.colour = 'red';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

describe('pdk-border-colour', () => {
  let fixture: ComponentFixture<PdkBorderColourComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PdkBorderColourComponent);
    fixture.detectChanges();
  });

  it('should render the provided border colour', () => {
    fixture.componentInstance.colour = 'purple';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    fixture.componentInstance.colour = 'red';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-fill-colour-test',
  template: ` <div [pdk-fill-colour]="colour"></div> `,
  imports: [PdkFillColorDirective]
})
class PdkFillColourTestComponent {
  colour: PdkColor;
}

@Component({
  selector: 'pdk-text-colour-test',
  template: ` <p [pdk-text-colour]="colour"></p> `,
  imports: [PdkTextColorDirective]
})
class PdkTextColourComponent {
  colour: PdkColor;
}

@Component({
  selector: 'pdk-border-colour-test',
  template: ` <p [pdk-border-colour]="colour"></p> `,
  imports: [PdkBorderColorDirective]
})
class PdkBorderColourComponent {
  colour: PdkColor;
}
