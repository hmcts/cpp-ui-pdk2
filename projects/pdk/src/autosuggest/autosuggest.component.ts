import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  Output,
  TemplateRef,
  Type,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import { PdkColor } from '../core/colour';
import { FormFieldControl, FormFieldControlV2 } from '../form/form.interfaces';
import { InputWidth, PdkInputComponent, PdkInputDirective } from '../input/input.directive';
import { generateId } from '../util/index';
import {
  AutosuggestSuggestionTemplateContext,
  PdkAutosuggestOptionComponent
} from './autosuggest-option.component';
import { PdkAutosuggestSectionTitleComponent } from './autosuggest-section-title.component';
import { AutosuggestSection } from './autosuggest.interfaces';
import { PdkInteractionContainerComponent } from '../core/interaction';
import { PdkVisuallyHiddenDirective } from '../core';

@Component({
  selector: 'pdk-autosuggest',
  exportAs: 'pdkAutosuggest',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <pdk-interaction-container (blur)="closeSuggestions()">
      <div class="pdk-autosuggest">
        <input
          #inputRef
          [ngModel]="inputValue"
          [ngModelOptions]="{ standalone: true }"
          [type]="inputType"
          role="combobox"
          autocomplete="off"
          aria-autocomplete="list"
          [attr.aria-controls]="suggestionsContainerId + '-listbox'"
          [attr.aria-expanded]="didOpenSuggestions && sections.length !== 0"
          [attr.aria-activedescendant]="ariaActiveDescendant"
          [attr.aria-label]="ariaLabel"
          [attr.id]="id"
          class="pdk-autosuggest__input"
          [disabled]="disabled"
          [hasError]="hasError"
          [pdk-input]="inputWidth"
          (blur)="handleBlurInput()"
          (keydown)="handleKeydownInput($event)"
          (ngModelChange)="handleInputChanged($event)"
          (search)="$event.stopPropagation()"
          [attr.aria-describedby]="ariaDescribedByComputed"
        />
        <span [id]="instructionsId" pdk-visually-hidden>
          When autocomplete results are available, use the up and down arrows to review and Enter to
          select. Touch device users, explore options with swipe gestures.
        </span>
        <span role="status" aria-live="polite" pdk-visually-hidden>
          {{ statusMessage }}
        </span>
        <div
          [attr.id]="suggestionsContainerId"
          class="pdk-autosuggest__suggestions-container"
          [pdk-input-width]="inputWidth"
          [class.pdk-autosuggest__suggestions-container--open]="
            didOpenSuggestions && sections.length !== 0
          "
        >
          @for (section of sections; let index=$index; track (section.title || index)) { @if
          (section.title) {
          <pdk-autosuggest-section-title
            [section]="section"
            [templateRef]="sectionTitleTemplateRef"
          >
          </pdk-autosuggest-section-title>
          }
          <ul
            [attr.id]="suggestionsContainerId + '-listbox-' + index"
            role="listbox"
            aria-label="Auto suggest options"
            class="pdk-autosuggest__options"
          >
            @for ( suggestion of section.suggestions; track
            trackBySuggestionKeyAndIndex(suggestionIndex, suggestion); let suggestionIndex = $index)
            {
            <li
              [attr.id]="mapSuggestionToKey(suggestion)"
              role="option"
              tabindex="-1"
              [attr.aria-posinset]="getAriaPosInset(suggestion)"
              [attr.aria-setsize]="suggestions.length"
              [attr.aria-selected]="highlightedSuggestion === suggestion"
            >
              <pdk-autosuggest-option
                [highlightColor]="highlightColor"
                [highlighted]="highlightedSuggestion === suggestion"
                [suggestion]="suggestion"
                [templateRef]="suggestionTemplateRef"
                (mousedown)="handleSuggestionMousedown($event)"
                (mouseup)="handleSuggestionMouseup($event)"
                (click)="handleSelectSuggestion(suggestion)"
                (mouseenter)="handleMouseEnterSuggestion(suggestion)"
                (mouseleave)="handleMouseLeaveSuggestion(suggestion)"
              >
              </pdk-autosuggest-option>
            </li>
            }
          </ul>
          }
        </div>
      </div>
    </pdk-interaction-container>
  `,
  providers: [
    {
      provide: FormFieldControl,
      useExisting: PdkAutosuggestComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkAutosuggestComponent),
      multi: true
    }
  ],
  styleUrls: ['./autosuggest.scss'],
  imports: [
    PdkInteractionContainerComponent,
    FormsModule,
    PdkInputComponent,
    PdkInputDirective,
    PdkAutosuggestSectionTitleComponent,
    PdkAutosuggestOptionComponent,
    PdkVisuallyHiddenDirective
  ]
})
export class PdkAutosuggestComponent<T = unknown>
  implements ControlValueAccessor, FormFieldControlV2
{
  @Input() ariaDescribedBy: string | null = null;
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledBy: string | null = null;
  @Input() disabled = false;
  @Input() hasError = false;
  @Input() highlightFirstSuggestion = true;
  @Input() highlightColor?: PdkColor;
  @Input() id = generateId('pdk-autosuggest__input');
  @Input() inputWidth?: InputWidth;
  @Input() inputType?: 'text' | 'search' = 'text';
  @Input() mapSuggestionToKey: (suggestion: T) => string | number;
  @Input() mapSuggestionToLabel: (suggestion: T) => string;
  @Input()
  set sections(sections: AutosuggestSection<T>[]) {
    this.setSections(sections);
  }
  get sections(): AutosuggestSection<T>[] {
    if (this._value) {
      for (const section of this._sections) {
        if (section.suggestions.find((suggestion) => this.getSuggestionSelected(suggestion))) {
          return [
            {
              title: section.title,
              suggestions: [this._value]
            }
          ];
        }
      }
    }
    return this._sections;
  }
  @Input() sectionTitleTemplateRef!: TemplateRef<PdkAutosuggestSectionTitleComponent<T>>;
  @Input() showActivityIndicator = false;
  @Input()
  set suggestions(suggestions: T[]) {
    this.setSections(suggestions.length !== 0 ? [{ suggestions }] : []);
  }
  get suggestions(): T[] {
    return this.sections.reduce(
      (suggestions, section) => [...suggestions, ...section.suggestions],
      [] as T[]
    );
  }
  @Input() suggestionTemplateRef!: TemplateRef<AutosuggestSuggestionTemplateContext<T>>;

  @Output() inputText = new EventEmitter<string>();

  controlRef = viewChild.required('inputRef', { read: ElementRef<HTMLInputElement> });

  get ariaDescribedByComputed(): string | null {
    if (this.ariaDescribedBy) {
      return `${this.instructionsId} ${this.ariaDescribedBy}`;
    }
    return this.instructionsId;
  }

  get ariaActiveDescendant(): string | number | null {
    if (this.highlightedSuggestion) {
      return this.mapSuggestionToKey(this.highlightedSuggestion);
    }
    return null;
  }
  get highlightedSuggestionIndex(): number {
    if (this.highlightedSuggestion) {
      return this.suggestions.findIndex((suggestion) => suggestion === this.highlightedSuggestion);
    }
    return -1;
  }

  didOpenSuggestions = false;
  didTargetSuggestion: EventTarget;
  highlightedSuggestion!: T | null;
  inputValue = '';
  multi = false;
  controlType = 'autosuggest';
  suggestionsContainerId = generateId('pdk-autosuggest__suggestions-container');
  instructionsId = generateId('pdk-autosuggest__instructions');
  statusMessage = '';

  private _value!: T | null;
  private _sections: AutosuggestSection<T>[] = [];

  constructor(private changeDetectorRef: ChangeDetectorRef, private injector: Injector) {
    this.mapSuggestionToKey = () => {
      throw new Error('`mapSuggestionToKey` must be provided');
    };
    this.mapSuggestionToLabel = () => {
      throw new Error('`mapSuggestionToLabel` must be provided');
    };
  }

  get ngControl() {
    return this.injector.get(NgControl as Type<NgControl>);
  }

  getAriaPosInset(suggestion: T) {
    const suggestionIndex = this.findSuggestionIndex(suggestion);
    return suggestionIndex + 1;
  }

  findSuggestionIndex(suggestion: T) {
    return this.suggestions.findIndex((s) => s === suggestion);
  }

  markForCheck() {
    this.changeDetectorRef.markForCheck();
  }

  getSuggestionSelected(suggestion: T) {
    if (this._value) {
      return this.mapSuggestionToKey(suggestion) === this.mapSuggestionToKey(this._value);
    }
    return false;
  }

  handleBlurInput() {
    // assert that the element is not still focused – this can be the case in some browsers
    // as a consequence of the 'blur' event being triggered when switching tabs, despite the
    // input never losing its apparent focus
    const controlRef = this.controlRef();
    if (
      !this.didTargetSuggestion &&
      this.didOpenSuggestions &&
      document.activeElement !== controlRef.nativeElement
    ) {
      this.closeSuggestions();
      this.changeDetectorRef.detectChanges();
    }
  }

  handleKeydownInput(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' && !this.didOpenSuggestions) {
      this.openSuggestions();
      return;
    }
    switch (event.key) {
      case 'ArrowDown':
        if (
          this.suggestions.length !== 0 &&
          this.highlightedSuggestionIndex < this.suggestions.length - 1
        ) {
          this.highlightedSuggestion = this.suggestions[this.highlightedSuggestionIndex + 1];
        }
        event.preventDefault();
        break;

      case 'ArrowUp':
        if (this.suggestions.length > 1 && this.highlightedSuggestionIndex !== 0) {
          this.highlightedSuggestion = this.suggestions[this.highlightedSuggestionIndex - 1];
        }
        event.preventDefault();
        break;

      case 'Enter': {
        if (this.didOpenSuggestions) {
          event.preventDefault();
        }
        if (this.highlightedSuggestion) {
          this.handleSelectSuggestion(this.highlightedSuggestion);
        }
        break;
      }

      case 'Escape': {
        if (this.didOpenSuggestions) {
          event.preventDefault();
        }
        this.closeSuggestions();
        break;
      }
    }
  }

  handleSelectSuggestion(suggestion: T) {
    const controlRef = this.controlRef();
    if (!this.getSuggestionSelected(suggestion)) {
      this.inputValue = this.mapSuggestionToLabel(suggestion);
      this._value = suggestion;
      this.propagateChange(suggestion);
    }
    controlRef.nativeElement.focus();
    this.closeSuggestions();
  }

  handleInputChanged(value: string) {
    this.inputValue = value;

    if (this._value) {
      this._value = null;
      this.propagateChange(null);
    }
    this.inputText.emit(this.inputValue);
  }

  handleMouseEnterSuggestion(suggestion: T) {
    this.highlightedSuggestion = suggestion;
  }

  handleMouseLeaveSuggestion(suggestion: T) {
    if (this.highlightedSuggestion === suggestion) {
      this.highlightedSuggestion = null;
    }
  }

  handleSuggestionMousedown({ target }: MouseEvent) {
    this.didTargetSuggestion = target;
  }

  handleSuggestionMouseup({ target }: MouseEvent) {
    if (target === this.didTargetSuggestion) {
      this.didTargetSuggestion = null;
    }
  }

  openSuggestions() {
    this.didOpenSuggestions = true;
    this.updateStatusMessage();

    if (this.highlightFirstSuggestion || this.suggestions[0] === this._value) {
      this.highlightedSuggestion = this.suggestions[0] || null;
    }
  }

  closeSuggestions() {
    this.didOpenSuggestions = false;
    this.highlightedSuggestion = null;
    this.statusMessage = '';
  }

  updateStatusMessage() {
    if (!this.didOpenSuggestions) {
      this.statusMessage = '';
      return;
    }

    const count = this.suggestions.length;
    if (count === 0) {
      this.statusMessage = 'No results found';
    } else if (count === 1) {
      this.statusMessage = '1 result available. Use up and down arrow keys to review.';
    } else {
      this.statusMessage = `${count} results available. Use up and down arrow keys to review.`;
    }
    this.markForCheck();
  }

  setSections(sections: AutosuggestSection<T>[]) {
    this._sections = sections;
    if (sections.length !== 0 && this.inputValue.length > 0) {
      this.openSuggestions();
    }
    this.updateStatusMessage();
  }

  // ControlValueAccessor interface

  propagateChange: (_: T) => void = (_: T) => {};

  registerOnChange(fn: (_: unknown) => void): void {
    this.propagateChange = fn.bind(this);
  }

  registerOnTouched(_: unknown) {}

  writeValue(value?: T) {
    if (value !== this._value) {
      this._value = value || null;
      this.inputValue = value ? this.mapSuggestionToLabel(value) : '';

      if (this.didOpenSuggestions) {
        this.closeSuggestions();
      }
      this.changeDetectorRef.detectChanges();
    }
  }

  trackBySuggestionKeyAndIndex(index: number, suggestion: T) {
    return `${this.mapSuggestionToKey(suggestion)}_${index}`;
  }
}
