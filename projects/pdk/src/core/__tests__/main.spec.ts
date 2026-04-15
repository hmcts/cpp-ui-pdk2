import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkContainerStyleDirective, PdkMainComponent } from '../main';

describe('pdk-main', () => {
  let fixture: ComponentFixture<MainTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

describe('pdk-container', () => {
  let fixture: ComponentFixture<ContainerTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-main-test',
  template: ` <pdk-main contentId="id!"></pdk-main> `,
  imports: [PdkMainComponent]
})
class MainTestComponent {}

@Component({
  selector: 'pdk-container-test',
  template: ` <div pdk-container></div> `,
  imports: [PdkContainerStyleDirective]
})
class ContainerTestComponent {}
