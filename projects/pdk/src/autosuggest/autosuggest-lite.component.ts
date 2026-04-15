import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  Output,
  Type,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { FormFieldControl, FormFieldControlV2 } from '../form/form.interfaces';
import { InputWidth } from '../input/input.directive';
import { PdkAutosuggestComponent } from './autosuggest.component';
import { PdkTypographyDirective } from '../core/typography';
import { PdkTextColorDirective } from '../core/colour';

@Component({
  selector: 'pdk-autosuggest-lite',
  exportAs: 'pdkAutosuggestLite',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pdk-autosuggest
      [ariaDescribedBy]="ariaDescribedBy"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [disabled]="disabled"
      [hasError]="hasError"
      highlightColor="blue"
      [highlightFirstSuggestion]="highlightFirstSuggestion"
      [id]="id"
      [inputWidth]="inputWidth"
      [inputType]="inputType"
      [mapSuggestionToKey]="getKey"
      [mapSuggestionToLabel]="getTitle"
      (inputText)="handleInputText($event)"
      [suggestions]="suggestions"
      [suggestionTemplateRef]="suggestionTemplateRef"
    >
    </pdk-autosuggest>
    <ng-template
      #suggestionTemplateRef
      let-highlighted="highlighted"
      let-matchText="matchText"
      let-suggestion="suggestion"
    >
      <span
        pdk-typography="body-small"
        [pdk-text-colour]="getTitleTextColour(highlighted)"
        [innerHtml]="getMatchedTitle(suggestion)"
      ></span>
      <br />
      @if (suggestionSubtitle || mapSuggestionToSubtitle) {
      <span pdk-typography="body-small" [pdk-text-colour]="getSubtitleTextColour(highlighted)">
        {{ getSubtitle(suggestion) }}
      </span>
      }
    </ng-template>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkAutosuggestLiteComponent),
      multi: true
    },
    {
      provide: FormFieldControl,
      useExisting: forwardRef(() => PdkAutosuggestLiteComponent)
    }
  ],
  imports: [PdkAutosuggestComponent, PdkTypographyDirective, PdkTextColorDirective]
})
export class PdkAutosuggestLiteComponent<T extends { [key: string]: any }>
  implements AfterViewInit, ControlValueAccessor, FormFieldControlV2, OnDestroy
{
  @Input() ariaDescribedBy: string | null = null;
  @Input() ariaLabel: string | null = null;
  @Input() ariaLabelledBy: string | null = null;
  @Input() disabled = false;
  @Input() hasError = false;
  @Input() highlightFirstSuggestion?: boolean;
  @Input() highlightMatchedText = true;
  @Input() id!: string;
  @Input() inputWidth?: InputWidth;
  @Input() inputType?: 'text' | 'search' = 'text';
  @Input() suggestions: T[] = [];
  @Input() mapSuggestionToKey?: (suggestion: T) => string | number;
  @Input() mapSuggestionToTitle?: (suggestion: T) => string;
  @Input() mapSuggestionToSubtitle?: (suggestion: T) => string;
  @Input() suggestionKey?: string;
  @Input() suggestionTitle?: string;
  @Input() suggestionSubtitle?: string;

  @Output() inputText = new EventEmitter<string>();
  @ViewChild(PdkAutosuggestComponent, { static: true }) autoSuggestRef!: PdkAutosuggestComponent;

  get controlRef() {
    return this.autoSuggestRef.controlRef;
  }
  get ngControl() {
    return this.injector.get(NgControl as Type<NgControl>);
  }
  controlType = 'autosuggest';
  inputValue = '';
  multi = false;

  private ngAfterViewInit$ = new ReplaySubject<void>(1);
  private ngOnDestroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef, private injector: Injector) {}

  ngAfterViewInit() {
    setTimeout(() => this.ngAfterViewInit$.next());
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next(null);
  }

  handleInputText(text: string) {
    this.inputValue = text;
    this.inputText.emit(text);
  }

  getKey = (suggestion: T): string | number => {
    if (this.mapSuggestionToKey) {
      return this.mapSuggestionToKey(suggestion);
    }
    if (this.suggestionKey) {
      return suggestion[this.suggestionKey] as string;
    }
    throw new Error('At least one of `suggestionKey` or `mapSuggestionToKey` must be provided.');
  };

  getTitle = (suggestion: T): string => {
    if (this.mapSuggestionToTitle) {
      return this.mapSuggestionToTitle(suggestion);
    }
    if (this.suggestionTitle) {
      return suggestion[this.suggestionTitle] as string;
    }
    throw new Error(
      'At least one of `suggestionTitle` or `mapSuggestionToTitle` must be provided.'
    );
  };

  getTitleTextColour(highlighted: boolean) {
    return highlighted ? 'white' : 'black';
  }

  getSubtitle = (suggestion: T): string => {
    if (this.mapSuggestionToSubtitle) {
      return this.mapSuggestionToSubtitle(suggestion);
    }
    if (this.suggestionSubtitle) {
      return suggestion[this.suggestionSubtitle] as string;
    }
    throw new Error(
      'At least one of `suggestionSubtitle` or `mapSuggestionToSubtitle` must be provided.'
    );
  };

  getSubtitleTextColour(highlighted: boolean) {
    return highlighted ? 'white' : 'dark-grey';
  }

  getMatchedTitle = (suggestion: T): string => {
    const title = this.getTitle(suggestion);
    if (this.highlightMatchedText) {
      if (this.inputValue.length > 0) {
        const offset = this.inputValue.length;
        const idx = title.toLowerCase().indexOf(this.inputValue.toLowerCase());

        if (idx !== -1) {
          return (
            `${title.substring(0, idx)}<b>${title.substring(idx, idx + offset)}</b>` +
            `${title.substring(idx + offset)}`
          );
        }
      }
    }
    return title;
  };

  markForCheck() {
    this.cdr.markForCheck();
  }

  // ControlValueAccessor interface

  propagateChange = (fn: T) => {
    this.autoSuggestRef.propagateChange(fn);
  };

  registerOnChange(fn: (value: T) => void): void {
    this.autoSuggestRef.registerOnChange(fn);
  }

  registerOnTouched(fn: (value: T) => void) {
    this.autoSuggestRef.registerOnTouched(fn);
  }

  writeValue(value?: T) {
    this.ngAfterViewInit$.pipe(take(1), takeUntil(this.ngOnDestroy$)).subscribe(() => {
      this.autoSuggestRef.writeValue(value);
    });
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
