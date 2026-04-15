import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkWarningTextComponent } from '../warning-text.component';

describe('pdk-warning-text', () => {
  let fixture: ComponentFixture<WarningTextTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(WarningTextTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-warning-text-test',
  template: ` <pdk-warning-text>Warning!</pdk-warning-text> `,
  imports: [PdkWarningTextComponent]
})
class WarningTextTestComponent {}
