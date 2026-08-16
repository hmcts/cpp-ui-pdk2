import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  Injector,
  input,
  output,
  signal,
  Type,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule
} from '@angular/forms';
import {
  coerceBooleanProperty,
  ErrorMessageConfig,
  FormFieldControl,
  FormFieldControlV2,
  generateId,
  InputWidth,
  PdkAutosuggest,
  PdkAutosuggestLiteComponent,
  PdkCore,
  PdkForm
} from '@cpp/pdk';
import { of, switchMap, timer } from 'rxjs';

import {
  Address,
  addressToSingleLine,
  isPopulatedAddress,
  VerificationStatus
} from '../address.model';
import { CppAddressComponent } from '../address/address.component';
import { OrdnanceSurveyPlacesService } from '../ordnance-survey-places.service';

@Component({
  selector: 'cpp-address-autosuggest',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './address-autosuggest.scss',
  providers: [
    { provide: FormFieldControl, useExisting: CppAddressAutosuggestComponent },
    { provide: NG_VALUE_ACCESSOR, useExisting: CppAddressAutosuggestComponent, multi: true }
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    PdkForm,
    PdkAutosuggest,
    PdkCore,
    CppAddressComponent
  ],
  templateUrl: './address-autosuggest.component.html'
})
export class CppAddressAutosuggestComponent implements ControlValueAccessor, FormFieldControlV2 {
  private readonly service = inject(OrdnanceSurveyPlacesService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly injector = inject(Injector);

  readonly disabled = input(false, { transform: coerceBooleanProperty });
  readonly required = input(false, { transform: coerceBooleanProperty });
  readonly inputWidth = input<InputWidth>();
  readonly validThreshold = input(0.9);
  readonly needsVerificationThreshold = input(0.7);

  readonly verificationStatusChange = output<VerificationStatus>();

  id = generateId('cpp-address-autosuggest');
  ariaDescribedBy: string | null = null;
  hasError = false;
  errorMessages: ErrorMessageConfig[] = [];
  readonly controlType = 'address-autosuggest';
  readonly multi = true;

  get ngControl(): NgControl {
    return this.injector.get(NgControl as Type<NgControl>, null as unknown as NgControl);
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  private readonly lite = viewChild.required(PdkAutosuggestLiteComponent);

  readonly addressControl = new FormControl<Address | null>(null);

  readonly searchText = signal('');
  readonly suggestions = rxResource({
    request: this.searchText,
    loader: ({ request }) =>
      request.length < 3
        ? of<Address[]>([])
        : timer(300).pipe(switchMap(() => this.service.find(request)))
  });
  readonly showAddress = signal(false);
  readonly isDisabled = signal(false);

  readonly toSingleLine = (address: Address): string => addressToSingleLine(address);
  readonly toKey = (address: Address): string => address.uprn ?? addressToSingleLine(address);

  private notifyChange: (value: Address | null) => void = () => {};
  private notifyTouched: () => void = () => {};

  constructor() {
    this.addressControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.notifyChange(value);
      this.notifyTouched();
    });

    effect(() => {
      if (this.disabled()) {
        this.setDisabledState(true);
      }
    });
  }

  writeValue(value: Address | null): void {
    this.addressControl.setValue(value, { emitEvent: false });
    this.showAddress.set(!!value);
  }

  registerOnChange(fn: (value: Address | null) => void): void {
    this.notifyChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.notifyTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this.addressControl.disable({ emitEvent: false })
      : this.addressControl.enable({ emitEvent: false });
    this.isDisabled.set(isDisabled);
  }

  selectAddress(address: Address | null): void {
    if (!address || !isPopulatedAddress(address)) {
      return;
    }
    this.showAddress.set(true);
    this.addressControl.setValue(address);
    // The address fields now hold the value — clear the search input.
    this.lite().writeValue(undefined);
  }

  enterManually(): void {
    this.showAddress.set(true);
  }
}
