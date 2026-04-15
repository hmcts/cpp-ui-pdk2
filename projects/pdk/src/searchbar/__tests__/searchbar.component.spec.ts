import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PdkSearchBar } from '..';

describe('pdk-searchbar', () => {
  let fixture: ComponentFixture<SearchbarTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchbarTestComponent);
    fixture.detectChanges();
  });

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render with an inverted style', () => {
    fixture.componentInstance.invert = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should render with a borderless style', () => {
    fixture.componentInstance.borderless = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should display an error when submitted with an invalid model', () => {
    fixture.componentInstance.required = true;
    fixture.detectChanges();
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-searchbar-test',
  template: `
    <form>
      <pdk-searchbar
        name="test"
        ngModel
        id="SEARCHBAR_ID"
        ariaDescribedBy="ARIA_DESCRIBED_BY"
        ariaLabelledBy="ARIA_LABELLED_BY"
        ariaLabel="ARIA_LABEL"
        [invert]="invert"
        [borderless]="borderless"
        placeholder="My custom placeholder"
        [required]="required"
      >
      </pdk-searchbar>
    </form>
  `,
  imports: [PdkSearchBar, FormsModule]
})
class SearchbarTestComponent {
  borderless = false;
  required: boolean;
  invert: boolean;
}
