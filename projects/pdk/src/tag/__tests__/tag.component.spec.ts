import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkTagComponent } from '../tag.component';

describe('pdk-tag', () => {
  let fixture: ComponentFixture<TagTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TagTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-tag-test',
  template: `
    <pdk-tag>My tag!</pdk-tag>
    <pdk-tag condensed>My tag!</pdk-tag>
  `,
  imports: [PdkTagComponent]
})
class TagTestComponent {}
