import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  Type,
  viewChild
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {
  coerceBooleanProperty,
  ErrorMessageConfig,
  FormFieldControl,
  FormFieldControlV2,
  generateId,
  PdkCheckBox,
  PdkCore,
  PdkForm,
  PdkInput,
  PdkTagComponent,
  PdkTextInput,
  PdkTextInputValidators
} from '@cpp/pdk';

import {
  Address,
  addressToSingleLine,
  isPopulatedAddress,
  OsDpaResult,
  osDpaToAddress,
  ScoredAddress,
  VerificationStatus
} from '../address.model';
import { OrdnanceSurveyPlacesService } from '../ordnance-survey-places.service';
import { map, of, tap } from 'rxjs';

const NO_FIXED_ABODE_ADDRESS: Address = {
  line1: 'No fixed abode',
  town: '',
  postcode: '',
  noFixedAbode: true
};

const STATUS_TAG: Record<
  VerificationStatus,
  { color: 'green' | 'yellow' | 'red' | 'grey'; label: string }
> = {
  valid: { color: 'green', label: 'Valid' },
  'needs-verification': { color: 'yellow', label: 'Needs verification' },
  invalid: { color: 'red', label: 'Invalid' },
  unverified: { color: 'grey', label: 'Unverified' }
};

const line = (...validators: ValidatorFn[]) =>
  new FormControl('', { nonNullable: true, validators });

@Component({
  selector: 'cpp-address',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './address.scss',
  providers: [
    { provide: FormFieldControl, useExisting: CppAddressComponent },
    { provide: NG_VALUE_ACCESSOR, useExisting: CppAddressComponent, multi: true },
    { provide: NG_VALIDATORS, useExisting: CppAddressComponent, multi: true }
  ],
  imports: [
    ReactiveFormsModule,
    PdkForm,
    PdkInput,
    PdkTextInput,
    PdkCheckBox,
    PdkCore,
    PdkTagComponent
  ],
  templateUrl: './address.component.html'
})
export class CppAddressComponent implements ControlValueAccessor, FormFieldControlV2, Validator {
  private readonly service = inject(OrdnanceSurveyPlacesService);
  private readonly injector = inject(Injector);
  private readonly cdr = inject(ChangeDetectorRef);
  readonly disabled = input(false, { transform: coerceBooleanProperty });
  readonly required = input(false, { transform: coerceBooleanProperty });
  readonly validThreshold = input(0.9);
  readonly needsVerificationThreshold = input(0.7);

  readonly verificationStatusChange = output<VerificationStatus>();

  id = generateId('cpp-address');
  ariaDescribedBy: string | null = null;
  hasError = false;
  errorMessages: ErrorMessageConfig[] = [];
  readonly controlType = 'address';
  readonly multi = true;
  readonly controlRef = viewChild('line1El', { read: ElementRef<HTMLElement> });

  get ngControl(): NgControl {
    return this.injector.get(NgControl as Type<NgControl>, null as unknown as NgControl);
  }

  readonly noFixedAbodeControl = new FormControl(false, { nonNullable: true });
  readonly addressForm = new FormGroup({
    line1: line(PdkTextInputValidators.addressLine),
    line2: line(PdkTextInputValidators.addressLine),
    line3: line(PdkTextInputValidators.addressLine),
    line4: line(PdkTextInputValidators.addressLine),
    line5: line(PdkTextInputValidators.addressLine),
    town: line(PdkTextInputValidators.addressLine),
    county: line(PdkTextInputValidators.addressLine),
    postcode: line(PdkTextInputValidators.postcode)
  });

  readonly noFixedAbode = toSignal(this.noFixedAbodeControl.valueChanges);
  readonly addressFormValue = toSignal(this.addressForm.valueChanges);
  readonly verifyAddress = signal<Address | null>(null);
  readonly verificationStatus = rxResource({
    request: this.verifyAddress,
    loader: ({ request }) => {
      if (!request) {
        return of(undefined);
      }
      return this.service
        .match(
          addressToSingleLine({ ...request, county: undefined }),
          this.needsVerificationThreshold()
        )
        .pipe(
          map((results: ScoredAddress[]) => {
            const status = this.toStatus(results[0]?.match);
            return status;
          }),
          tap((status) => this.verificationStatusChange.emit(status))
        );
    }
  });
  readonly statusTag = computed(() => {
    const status = this.verificationStatus.value();
    return status ? STATUS_TAG[status] : null;
  });

  private notifyChange: (value: Address | null) => void = () => {};
  private notifyTouched: () => void = () => {};

  constructor() {
    effect(() => {
      const noFixedAbode = this.noFixedAbode();
      const formValues = this.addressFormValue();
      if (noFixedAbode === undefined && formValues === undefined) {
        return;
      }
      if (noFixedAbode) {
        this.propagate(NO_FIXED_ABODE_ADDRESS);
      } else {
        const { line1, line2, line3, line4, line5, town, county, postcode } =
          formValues ?? this.addressForm.getRawValue();
        this.propagate(
          !line1.trim()
            ? null
            : {
                line1: line1.trim(),
                line2: line2.trim() || undefined,
                line3: line3.trim() || undefined,
                line4: line4.trim() || undefined,
                line5: line5.trim() || undefined,
                town: town.trim(),
                county: county.trim() || undefined,
                postcode: postcode.trim()
              }
        );
      }
    });

    effect(() => {
      const mandatoryControls = [
        this.addressForm.controls.line1,
        this.addressForm.controls.town,
        this.addressForm.controls.postcode
      ];
      mandatoryControls.forEach((control) => {
        this.required()
          ? control.addValidators(Validators.required)
          : control.removeValidators(Validators.required);
        control.updateValueAndValidity({ emitEvent: false });
      });
    });

    effect(() => {
      if (this.disabled()) {
        this.setDisabledState(true);
      }
    });
  }

  writeValue(value: Address | OsDpaResult | null): void {
    const address =
      !!value && 'POST_TOWN' in value ? osDpaToAddress(value) : (value as Address | null);
    this.noFixedAbodeControl.setValue(address?.noFixedAbode || false, { emitEvent: false });

    if (address && !address.noFixedAbode) {
      this.patch(address);
      if (isPopulatedAddress(address)) {
        this.verifyAddress.set(address);
      }
    } else {
      this.addressForm.reset(undefined, { emitEvent: false });
      this.verificationStatus.set(undefined);
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (value: Address | null) => void): void {
    this.notifyChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.notifyTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    const opts = { emitEvent: false };
    isDisabled ? this.addressForm.disable(opts) : this.addressForm.enable(opts);
    isDisabled ? this.noFixedAbodeControl.disable(opts) : this.noFixedAbodeControl.enable(opts);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value || !!control.value.noFixedAbode) {
      return null;
    }
    const errorEntries = Object.entries(this.addressForm.controls).filter(
      ([, { invalid }]) => !!invalid
    );
    const address =
      errorEntries.length > 0
        ? Object.fromEntries(errorEntries.map(([controlName, { errors }]) => [controlName, errors]))
        : null;
    return address ? { address } : null;
  }

  verify(): void {
    const current = this.addressForm.getRawValue() as Address;
    if (isPopulatedAddress(current) && !this.noFixedAbodeControl.value) {
      this.verifyAddress.set(current);
    }
  }

  private propagate(address: Address | null): void {
    if (!address) {
      this.verificationStatus.set(undefined);
    }
    this.notifyChange(address);
    this.notifyTouched();
  }

  private toStatus(score: number | undefined): VerificationStatus {
    if (score === undefined) {
      return 'invalid';
    }
    if (score >= this.validThreshold()) {
      return 'valid';
    }
    return score >= this.needsVerificationThreshold() ? 'needs-verification' : 'invalid';
  }

  private patch(address: Address): void {
    this.addressForm.setValue(
      {
        line1: address.line1 ?? '',
        line2: address.line2 ?? '',
        line3: address.line3 ?? '',
        line4: address.line4 ?? '',
        line5: address.line5 ?? '',
        town: address.town ?? '',
        county: address.county ?? '',
        postcode: address.postcode ?? ''
      },
      { emitEvent: false }
    );
  }
}
