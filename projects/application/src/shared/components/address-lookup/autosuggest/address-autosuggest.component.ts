import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  computed,
  Component,
  effect,
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
  PdkInsetTextComponent,
  PdkMarginDirective,
  PdkAutosuggestLiteComponent
} from '@cpp/pdk';
import { of, switchMap, timer } from 'rxjs';

import { Address, addressToSingleLine } from '../address.model';
import { addressLookupFailureMessage, AddressLookupService } from '../address-lookup.service';

const MIN_SEARCH_LENGTH = 3;
const SEARCH_DEBOUNCE_MS = 300;

@Component({
  selector: 'cpp-address-autosuggest',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './address-autosuggest.scss',
  providers: [
    { provide: FormFieldControl, useExisting: CppAddressAutosuggestComponent },
    { provide: NG_VALUE_ACCESSOR, useExisting: CppAddressAutosuggestComponent, multi: true }
  ],
  imports: [PdkAutosuggest, PdkInsetTextComponent, PdkMarginDirective],
  templateUrl: './address-autosuggest.component.html'
})
export class CppAddressAutosuggestComponent implements ControlValueAccessor, FormFieldControlV2 {
  private readonly service = inject(AddressLookupService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly ariaLabel = input<string | null>(null);
  readonly ariaLabelledBy = input<string | null>(null);
  readonly clearOnSelection = input(false, { transform: coerceBooleanProperty });
  readonly disabled = input(false, { transform: coerceBooleanProperty });
  readonly inputWidth = input<InputWidth>();

  @ViewChild(PdkAutosuggestLiteComponent, { static: true })
  private readonly liteRef!: PdkAutosuggestLiteComponent<any>;

  id = generateId('cpp-address-autosuggest');
  ariaDescribedBy: string | null = null;
  hasError = false;
  errorMessages: ErrorMessageConfig[] = [];

  readonly isDisabled = signal(false);
  readonly searchText = signal('');
  readonly suggestions = rxResource({
    request: this.searchText,
    loader: ({ request }) =>
      request.length < MIN_SEARCH_LENGTH
        ? of<Address[]>([])
        : timer(SEARCH_DEBOUNCE_MS).pipe(switchMap(() => this.service.find(request)))
  });

  readonly failureMessage = computed(() =>
    this.suggestions.status() === ResourceStatus.Error
      ? addressLookupFailureMessage(this.suggestions.error())
      : null
  );

  readonly noResults = computed(
    () =>
      !this.failureMessage() &&
      this.searchText().length >= MIN_SEARCH_LENGTH &&
      !this.suggestions.isLoading() &&
      this.suggestions.value()?.length === 0
  );

  readonly toSingleLine = (address: Address): string => addressToSingleLine(address);
  readonly toKey = (address: Address): string => address.uprn ?? addressToSingleLine(address);

  constructor() {
    effect(() => {
      if (this.disabled()) {
        this.setDisabledState(true);
      }
    });
  }

  get controlType(): string {
    return this.liteRef.controlType;
  }

  get multi(): boolean {
    return this.liteRef ? this.liteRef.multi : false;
  }

  get ngControl() {
    return this.liteRef.ngControl;
  }

  get controlRef() {
    return this.liteRef.controlRef;
  }

  markForCheck(): void {
    this.cdr.markForCheck();
    this.liteRef.markForCheck();
  }

  writeValue(value: Address | null): void {
    this.liteRef.writeValue(value ?? undefined);
  }

  registerOnChange(fn: (value: Address | null) => void): void {
    this.liteRef.registerOnChange((address: Address | null) => {
      fn(address);
      if (address && this.clearOnSelection()) {
        this.liteRef.writeValue(undefined);
      }
    });
  }

  registerOnTouched(fn: () => void): void {
    this.liteRef.registerOnTouched(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
