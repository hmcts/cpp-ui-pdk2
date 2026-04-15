import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkCharacterCountComponent } from '../character-count.component';

describe('pdk-character-count', () => {
  let component: PdkCharacterCountComponent;
  let fixture: ComponentFixture<CharacterCountTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterCountTestComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should render for an unknown value', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render a positive count of remaining characters', () => {
    fixture.componentInstance.value = 'A';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render a single remaining character', () => {
    fixture.componentInstance.value = 'ABCDEFGHI';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render no remaining characters', () => {
    fixture.componentInstance.value = 'ABCDEFGHIJ';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render a negative count of remaining characters', () => {
    fixture.componentInstance.value = 'ABCDEFGHIJKL';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render a single negative character', () => {
    fixture.componentInstance.value = 'ABCDEFGHIJK';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should return remaining character correctly', () => {
    fixture.componentInstance.value = 'ABCDEFGHIJK';
    fixture.componentInstance.limit = 50;
    fixture.detectChanges();
    expect(component.remaining).toBe(39);
  });
});

@Component({
  selector: 'pdk-character-count-test',
  template: ` <pdk-character-count [value]="value" [limit]="limit"> </pdk-character-count> `,
  imports: [PdkCharacterCountComponent]
})
class CharacterCountTestComponent {
  value: string;
  limit = 10;
}
