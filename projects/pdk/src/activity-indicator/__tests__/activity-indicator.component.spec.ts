import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkActivityIndicatorComponent } from '../activity-indicator.component';

describe('pdk-activity-indicator', () => {
  let fixture: ComponentFixture<ActivityIndicatorTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityIndicatorTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-activity-indicator-test',
  template: ` <pdk-activity-indicator></pdk-activity-indicator> `,
  imports: [PdkActivityIndicatorComponent]
})
class ActivityIndicatorTestComponent {}
