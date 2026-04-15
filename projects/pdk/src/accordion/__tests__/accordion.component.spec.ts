import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PdkAccordionItemComponent, PdkAccordionComponent } from '../accordion.component';
import { PdkAccordion } from '..';

describe('pdk-accordion', () => {
  let fixture: ComponentFixture<AccordionTestComponent>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(AccordionTestComponent);
    fixture.detectChanges();
  });

  it('should render the closed accordion', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should render the fully open accordion when the `openAll` button is clicked', () => {
    const accordion = fixture.debugElement.query(By.directive(PdkAccordionComponent));
    const openAllButton = accordion.query(By.css('button[aria-expanded="false"]'));
    openAllButton.nativeElement.click();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.componentInstance.onOpenChange).toHaveBeenCalledWith([0, 1, 2]);
  });

  it('should render the fully closed accordion when the `closeAll` button is clicked', () => {
    fixture.componentInstance.open = [0, 1, 2];
    fixture.detectChanges();
    const accordion = fixture.debugElement.query(By.directive(PdkAccordionComponent));
    const closeAllButton = accordion.query(By.css('button[aria-expanded="true"]'));
    closeAllButton.nativeElement.click();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
    expect(fixture.componentInstance.onOpenChange).toHaveBeenCalledWith([]);
  });

  it('should show `closeAll` button once all accordion items are individually opened', () => {
    const items = fixture.debugElement.queryAll(By.directive(PdkAccordionItemComponent));
    items.forEach((item) => {
      const title = item.query(By.css('button'));
      title.nativeElement.click();
      fixture.detectChanges();
    });
    const accordion = fixture.debugElement.query(By.directive(PdkAccordionComponent));
    const openAllButton = accordion.query(By.css('button[aria-expanded="false"]'));
    const closeAllButton = accordion.query(By.css('button[aria-expanded="true"]'));
    expect(fixture).toMatchSnapshot();
    expect(closeAllButton).not.toBeNull();
    expect(openAllButton).toBeNull();
  });

  it('should show `openAll` button once all accordion items are individually closed', () => {
    fixture.componentInstance.open = [0, 1, 2];
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.directive(PdkAccordionItemComponent));
    items.forEach((item) => {
      const title = item.query(By.css('button'));
      title.nativeElement.click();
      fixture.detectChanges();
    });
    const accordion = fixture.debugElement.query(By.directive(PdkAccordionComponent));
    const openAllButton = accordion.query(By.css('button[aria-expanded="false"]'));
    const closeAllButton = accordion.query(By.css('button[aria-expanded="true"]'));
    expect(fixture).toMatchSnapshot();
    expect(openAllButton).not.toBeNull();
    expect(closeAllButton).toBeNull();
  });

  it('should trigger the expanded state of a section when clicking its title', () => {
    const items = fixture.debugElement.queryAll(By.directive(PdkAccordionItemComponent));
    const title = items[0].query(By.css('button'));
    title.nativeElement.click();
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should expand the sections according to the indexes in the `open` prop', () => {
    fixture.componentInstance.open = [0, 2];
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should emit `openChange` with expected `open` model when clicking its title', () => {
    const items = fixture.debugElement.queryAll(By.directive(PdkAccordionItemComponent));
    const title = items[0].query(By.css('button'));
    title.nativeElement.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.onOpenChange).toHaveBeenCalledWith([0]);
  });

  it('should emit `openChange` when the `open` property changes', () => {
    fixture.componentInstance.open = [0];
    fixture.detectChanges();
    expect(fixture.componentInstance.onOpenChange).toHaveBeenCalledWith([0]);
  });

  it('should display summary of content section when provide', () => {
    fixture.componentInstance.summary = 'Summary for content';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});

@Component({
  selector: 'pdk-accordion-test',
  template: `
    <pdk-accordion [open]="open" (openChange)="onOpenChange($event)">
      <pdk-accordion-item title="Item #1">Accordion item #1</pdk-accordion-item>
      <pdk-accordion-item title="Item #2">Accordion item #2</pdk-accordion-item>
      <pdk-accordion-item title="Item #3" [summary]="summary">Accordion item #3</pdk-accordion-item>
    </pdk-accordion>
  `,
  imports: [PdkAccordion]
})
class AccordionTestComponent {
  open: number[];
  onOpenChange = jest.fn();
  summary: string;
}
