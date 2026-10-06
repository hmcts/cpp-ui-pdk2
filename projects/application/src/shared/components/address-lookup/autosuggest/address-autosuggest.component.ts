import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  computed,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  ResourceStatus,
  input,
  signal,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  coerceBooleanProperty,
  ErrorMessageConfig,
  FormFieldControl,
  FormFieldControlV2,
  generateId,
  InputWidth,
  PdkAutosuggest,
  PdkAutosuggestComponent,
  PdkBackLink,
  PdkCore,
  PdkInsetTextComponent
} from '@cpp/pdk';
import { of, switchMap, timer } from 'rxjs';

import { Address } from '../address.model';
import { addressLookupFailureMessage, AddressLookupService } from '../address-lookup.service';
import { AddressSuggestion, toAddressSuggestions } from './address-autosuggest.util';
import { HighlightMatchPipe } from './highlight-match.pipe';

const MIN_SEARCH_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 200;

@Component({
  selector: 'cpp-address-autosuggest',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './address-autosuggest.scss',
  providers: [
    { provide: FormFieldControl, useExisting: CppAddressAutosuggestComponent },
    { provide: NG_VALUE_ACCESSOR, useExisting: CppAddressAutosuggestComponent, multi: true }
  ],
  imports: [HighlightMatchPipe, PdkAutosuggest, PdkBackLink, PdkCore, PdkInsetTextComponent],
  templateUrl: './address-autosuggest.component.html'
})
export class CppAddressAutosuggestComponent implements ControlValueAccessor, FormFieldControlV2 {
  private readonly service = inject(AddressLookupService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  readonly ariaLabel = input<string | null>(null);
  readonly ariaLabelledBy = input<string | null>(null);
  readonly clearOnSelection = input(false, { transform: coerceBooleanProperty });
  readonly disabled = input(false, { transform: coerceBooleanProperty });
  readonly inputWidth = input<InputWidth>();

  @ViewChild(PdkAutosuggestComponent, { static: true })
  private readonly autosuggestRef!: PdkAutosuggestComponent<AddressSuggestion>;

  id = generateId('cpp-address-autosuggest');
  ariaDescribedBy: string | null = null;
  hasError = false;
  errorMessages: ErrorMessageConfig[] = [];

  readonly backToAllResults: AddressSuggestion = { title: 'Back to all results', subtitle: '' };

  readonly isDisabled = signal(false);
  readonly searchText = signal('');
  readonly openedAddressGroup = signal<AddressSuggestion | null>(null);
  readonly addressSearch = rxResource({
    request: this.searchText,
    loader: ({ request }) =>
      request.length < MIN_SEARCH_LENGTH
        ? of<Address[]>([])
        : timer(SEARCH_DEBOUNCE_MS).pipe(switchMap(() => this.service.find(request)))
  });

  readonly suggestions = computed(() => {
    const openedAddressGroup = this.openedAddressGroup();
    if (openedAddressGroup?.groupedSuggestions) {
      return [this.backToAllResults, ...openedAddressGroup.groupedSuggestions];
    }
    const addresses = this.addressSearch.value() ?? [];
    return toAddressSuggestions(addresses);
  });

  readonly failureMessage = computed(() =>
    this.addressSearch.status() === ResourceStatus.Error
      ? addressLookupFailureMessage(this.addressSearch.error())
      : null
  );

  readonly noResults = computed(
    () =>
      !this.failureMessage() &&
      this.searchText().length >= MIN_SEARCH_LENGTH &&
      !this.addressSearch.isLoading() &&
      this.addressSearch.value()?.length === 0
  );

  readonly suggestionLabel = ({ title, subtitle }: AddressSuggestion): string =>
    [title, subtitle].filter(Boolean).join(', ');
  readonly suggestionKey = (suggestion: AddressSuggestion): string =>
    suggestion.address?.uprn ?? this.suggestionLabel(suggestion);

  constructor() {
    effect(() => {
      if (this.disabled()) {
        this.setDisabledState(true);
      }
    });

    this.host.nativeElement.addEventListener('keydown', this.handleGroupNavigationKeys, true);
    this.destroyRef.onDestroy(() =>
      this.host.nativeElement.removeEventListener('keydown', this.handleGroupNavigationKeys, true)
    );
  }

  get controlType(): string {
    return this.autosuggestRef.controlType;
  }

  get multi(): boolean {
    return this.autosuggestRef ? this.autosuggestRef.multi : false;
  }

  get ngControl() {
    return this.autosuggestRef.ngControl;
  }

  get controlRef() {
    return this.autosuggestRef.controlRef;
  }

  search(searchText: string): void {
    this.closeAddressGroup();
    this.searchText.set(searchText);
  }

  navigateInsteadOfSelecting(suggestion: AddressSuggestion | null, event: Event): void {
    if (suggestion && !suggestion.address) {
      event.preventDefault();
      event.stopPropagation();
      this.navigate(suggestion);
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
    this.autosuggestRef.markForCheck();
  }

  writeValue(address: Address | null): void {
    const [suggestion] = address ? toAddressSuggestions([address]) : [];
    this.autosuggestRef.writeValue(suggestion);
  }

  registerOnChange(fn: (address: Address | null) => void): void {
    this.autosuggestRef.registerOnChange((suggestion: AddressSuggestion | null) => {
      const address = suggestion?.address ?? null;
      fn(address);
      if (address && this.clearOnSelection()) {
        this.autosuggestRef.writeValue(undefined);
      }
    });
  }

  registerOnTouched(fn: () => void): void {
    this.autosuggestRef.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  private readonly handleGroupNavigationKeys = (event: KeyboardEvent): void => {
    if (event.key === 'Enter') {
      this.navigateInsteadOfSelecting(this.autosuggestRef.highlightedSuggestion, event);
    } else if (
      event.key === 'Escape' &&
      this.autosuggestRef.didOpenSuggestions &&
      this.openedAddressGroup()
    ) {
      event.preventDefault();
      event.stopPropagation();
      this.closeAddressGroup();
    }
  };

  private navigate(suggestion: AddressSuggestion): void {
    if (suggestion === this.backToAllResults) {
      this.closeAddressGroup();
    } else {
      this.openedAddressGroup.set(suggestion);
    }
  }

  private closeAddressGroup(): void {
    this.openedAddressGroup.set(null);
  }
}
