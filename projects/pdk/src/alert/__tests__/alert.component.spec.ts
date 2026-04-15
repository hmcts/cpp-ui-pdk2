import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkAlertComponent, AlertType } from '../alert.component';

describe('pdk-alert', () => {
  let fixture: ComponentFixture<AlertTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertTestComponent);
    fixture.detectChanges();
  });

  it('should render with the default props', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should coerce the container value from the attribute presence', () => {
    fixture.componentInstance.container = undefined;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with the alert type set to "confirmation"', () => {
    fixture.componentInstance.type = 'confirmation';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with the alert type set to "success"', () => {
    fixture.componentInstance.type = 'success';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with the alert type set to "warning"', () => {
    fixture.componentInstance.type = 'warning';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with the alert type set to "secure"', () => {
    fixture.componentInstance.type = 'secure';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with an icon', () => {
    fixture.componentInstance.type = 'warning';
    fixture.componentInstance.icon = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-alert-test',
  template: `
    <pdk-alert [container]="container" [icon]="icon" [type]="type">
      <p>Alert content here</p>
    </pdk-alert>
  `,
  imports: [PdkAlertComponent]
})
class AlertTestComponent {
  container = false;
  icon: boolean;
  type: AlertType;
}
