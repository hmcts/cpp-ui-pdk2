import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PdkPaginationComponent } from '../pagination';

describe('PaginationComponent', () => {
  let fixture: ComponentFixture<PaginationTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationTestComponent);
  });

  it('should compile correctly when on the first page', () => {
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should cap the visible pages according to the `maxPages` flag', () => {
    fixture.componentInstance.maxPages = 5;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    fixture.componentInstance.currentPage = 1;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit a `pageChange` event when earlier pages are available', () => {
    fixture.componentInstance.currentPage = 2;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    fixture.debugElement.query(By.css('a[rel=Previous]')).nativeElement.click();
    expect(fixture.componentInstance.pageChange).toHaveBeenCalledWith(1);
  });

  it('should emit a `pageChange` event when later pages are available', () => {
    fixture.componentInstance.currentPage = 1;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    fixture.debugElement.query(By.css('a[rel=Next]')).nativeElement.click();
    expect(fixture.componentInstance.pageChange).toHaveBeenCalledWith(2);
  });

  @Component({
    selector: 'pdk-pagination-test',
    template: `
      <pdk-pagination
        [currentPage]="currentPage"
        [maxPages]="maxPages"
        [pageSize]="pageSize"
        [totalResults]="totalResults"
        (pageChange)="pageChange($event)"
      >
      </pdk-pagination>
    `,
    imports: [PdkPaginationComponent]
  })
  class PaginationTestComponent {
    currentPage = 1;
    maxPages?: number;
    pageSize = 10;
    totalResults = 90;
    pageChange = jest.fn();
  }
});
