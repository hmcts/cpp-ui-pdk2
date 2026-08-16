import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  Type,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  coerceBooleanProperty,
  ErrorMessageConfig,
  FormFieldControl,
  FormFieldControlV2,
  generateId,
  PdkButton,
  PdkCore,
  PdkForm,
  PdkInput,
  PdkRadio,
  PdkTextInput,
  PdkTextInputValidators,
  ValidationError
} from '@cpp/pdk';

import { Address, addressToSingleLine, VerificationStatus } from '../address.model';
import { CppAddressComponent } from '../address/address.component';
import { OrdnanceSurveyPlacesService } from '../ordnance-survey-places.service';

@Component({
  selector: 'cpp-address-postcode-finder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './address-postcode-finder.scss',
  providers: [
    { provide: FormFieldControl, useExisting: CppAddressPostcodeFinderComponent },
    { provide: NG_VALUE_ACCESSOR, useExisting: CppAddressPostcodeFinderComponent, multi: true }
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    PdkForm,
    PdkInput,
    PdkTextInput,
    PdkButton,
    PdkRadio,
    PdkCore,
    CppAddressComponent
  ],
  templateUrl: './address-postcode-finder.component.html'
})
export class CppAddressPostcodeFinderComponent implements ControlValueAccessor, FormFieldControlV2 {
  private readonly service = inject(OrdnanceSurveyPlacesService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);

  readonly disabled = input(false, { transform: coerceBooleanProperty });
  readonly required = input(false, { transform: coerceBooleanProperty });
  readonly validThreshold = input(0.9);
  readonly needsVerificationThreshold = input(0.7);

  readonly verificationStatusChange = output<VerificationStatus>();
  readonly errors = output<ValidationError[] | null>();

  id = generateId('cpp-address-postcode-finder');
  ariaDescribedBy: string | null = null;
  hasError = false;
  errorMessages: ErrorMessageConfig[] = [];
  readonly controlType = 'address-postcode-finder';
  readonly multi = true;
  readonly controlRef = viewChild('postcodeEl', { read: ElementRef<HTMLElement> });

  private readonly searchFormDir = viewChild.required(FormGroupDirective);

  get ngControl(): NgControl {
    return this.injector.get(NgControl as Type<NgControl>, null as unknown as NgControl);
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  readonly searchForm = new FormGroup({
    postcode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, PdkTextInputValidators.postcode]
    })
  });
  readonly addressControl = new FormControl<Address | null>(null);

  readonly results = signal<Address[] | null>(null);
  readonly showAddress = signal(false);
  readonly isDisabled = signal(false);

  readonly addressOptions = computed(() =>
    (this.results() ?? []).map((address) => ({
      value: address,
      label: addressToSingleLine(address)
    }))
  );

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
    const opts = { emitEvent: false };
    isDisabled ? this.searchForm.disable(opts) : this.searchForm.enable(opts);
    isDisabled ? this.addressControl.disable(opts) : this.addressControl.enable(opts);
    this.isDisabled.set(isDisabled);
  }

  submitSearch(): void {
    this.searchFormDir().onSubmit(new Event('submit'));
  }

  onEnter(event: Event): void {
    event.preventDefault();
    this.submitSearch();
  }

  runSearch(): void {
    this.results.set(null);
    this.service
      .findByPostcode(this.searchForm.controls.postcode.value)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((found) => this.results.set(found));
  }

  selectAddress(address: Address | null): void {
    if (!address) {
      return;
    }
    this.results.set(null);
    this.showAddress.set(true);
    this.addressControl.setValue(address);
    this.searchFormDir().resetForm();
  }

  enterManually(): void {
    this.showAddress.set(true);
  }
}
