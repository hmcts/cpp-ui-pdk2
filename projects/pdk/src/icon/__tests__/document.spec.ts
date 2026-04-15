import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkDocumentIconComponent } from '../document';

describe('pdk-document-icon', () => {
  let fixture: ComponentFixture<DocumentIconTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentIconTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-document-icon-test',
  template: ` <pdk-document-icon [size]="size"> </pdk-document-icon> `,
  imports: [PdkDocumentIconComponent]
})
class DocumentIconTestComponent {
  size = 24;
}
