import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PdkFileDownloadIconComponent } from '../file-download';

describe('pdk-file-download-icon', () => {
  let fixture: ComponentFixture<FileDownloadIconTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FileDownloadIconTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-file-download-icon-test',
  template: ` <pdk-file-download-icon [color]="color" [size]="size"> </pdk-file-download-icon> `,
  imports: [PdkFileDownloadIconComponent]
})
class FileDownloadIconTestComponent {
  color = 'green';
  size = 24;
}
