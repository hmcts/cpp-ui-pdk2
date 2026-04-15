import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkRelatedComponent } from '../related.component';

describe('pdk-related', () => {
  let fixture: ComponentFixture<RelatedTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-related-test',
  template: ` <pdk-related>Content!</pdk-related> `,
  imports: [PdkRelatedComponent]
})
class RelatedTestComponent {}
