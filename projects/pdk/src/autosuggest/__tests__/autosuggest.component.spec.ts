import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PdkAutosuggestComponent } from '../autosuggest.component';

interface Suggestion {
  id: string;
  label: string;
}

describe('PdkAutosuggestComponent', () => {
  let fixture: ComponentFixture<AutosuggestTestComponent>;
  let component: PdkAutosuggestComponent<Suggestion>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AutosuggestTestComponent] });
    fixture = TestBed.createComponent(AutosuggestTestComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(PdkAutosuggestComponent)).componentInstance;
  });

  it('constrains the list when suggestions exceed the visible limit', () => {
    expect(component.isScrollable).toBe(true);
    expect(component.suggestionsViewportHeight).toBe(480);

    const container = fixture.debugElement.query(By.css('.pdk-autosuggest__suggestions-container'))
      .nativeElement as HTMLElement;
    expect(container.classList).toContain('pdk-autosuggest__suggestions-container--scrollable');
    expect(container.style.maxHeight).toBe('480px');
  });

  it('keeps the keyboard-highlighted suggestion visible', () => {
    const options = fixture.debugElement.queryAll(By.css('[role="option"]'));
    const scrollIntoView = jest.fn();
    options[1].nativeElement.scrollIntoView = scrollIntoView;

    component.openSuggestions();
    component.handleKeydownInput(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

    expect(component.highlightedSuggestion).toEqual(fixture.componentInstance.suggestions[1]);
    expect(scrollIntoView).toHaveBeenCalledWith({ block: 'nearest' });
  });

  it('does not close while the scrollbar or suggestions container is being used', () => {
    component.openSuggestions();
    const container = fixture.debugElement.query(By.css('.pdk-autosuggest__suggestions-container'))
      .nativeElement as HTMLElement;
    component.handleSuggestionsMousedown({ target: container } as unknown as MouseEvent);

    component.handleBlurInput();

    expect(component.didOpenSuggestions).toBe(true);
    component.handleSuggestionsMouseup();
  });
});

@Component({
  template: `
    <form>
      <pdk-autosuggest
        name="person"
        ngModel
        [suggestions]="suggestions"
        [mapSuggestionToKey]="mapSuggestionToKey"
        [mapSuggestionToLabel]="mapSuggestionToLabel"
        [maxVisibleSuggestions]="10"
      ></pdk-autosuggest>
    </form>
  `,
  imports: [FormsModule, PdkAutosuggestComponent]
})
class AutosuggestTestComponent {
  suggestions = Array.from({ length: 12 }, (_, index) => ({
    id: `person-${index}`,
    label: `Person ${index}`
  }));

  mapSuggestionToKey = (suggestion: Suggestion) => suggestion.id;
  mapSuggestionToLabel = (suggestion: Suggestion) => suggestion.label;
}
