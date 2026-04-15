import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkHintComponent } from '../hint.component';

describe('pdk-hint', () => {
  let fixture: ComponentFixture<HintTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HintTestComponent);
    fixture.detectChanges();
  });

  it('should render a hint', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render a default date hint', () => {
    fixture.componentInstance.hintType = 'date';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render a default time hint', () => {
    fixture.componentInstance.hintType = 'time';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-hint-test',
  template: ` <pdk-hint [hint]="hintType">This is a hint!</pdk-hint> `,
  imports: [PdkHintComponent]
})
class HintTestComponent {
  hintType: string;
}
