import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkListDirective, ListType } from '../lists';

describe('pdk-list', () => {
  let fixture: ComponentFixture<ListTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTestComponent);
    fixture.detectChanges();
  });

  it('should render a numbered list', () => {
    fixture.componentInstance.type = 'number';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render a bulleted list', () => {
    fixture.componentInstance.type = 'bullet';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-list-test',
  template: `
    <ul [pdk-list]="type">
      <li>My list item</li>
    </ul>
  `,
  imports: [PdkListDirective]
})
class ListTestComponent {
  type: ListType;
}
