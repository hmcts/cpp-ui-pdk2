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
  InputValidators,
  PdkCharacterCountComponent,
  PdkCore,
  PdkForm,
  PdkInput,
  PdkTagComponent,
  PdkTextInput,
  PdkTextInputValidators
} from '@cpp/pdk';
import { catchError, map, of, tap } from 'rxjs';

import {
  Address,
  AddressFieldConfig,
  AddressFieldsConfig,
  addressToSingleLine,
  isPopulatedAddress,
  ScoredAddress,
  VerificationStatus
} from '../address.model';
import { AddressLookupService } from '../address-lookup.service';

type AddressLineKey = Exclude<keyof AddressFieldsConfig, 'postcode'>;

const CHARACTER_COUNT_THRESHOLD = 10;

const DEFAULT_FIELDS: AddressFieldsConfig = {
  line1: {
    label: 'Address line 1',
    labelType: 'small',
    maxChars: 35,
    errorMessages: {
      required: 'Enter address line 1',
      addressLine: 'Address line 1 contains invalid characters',
      maximumLength: 'Address line 1 must be {{expected}} characters or less'
    }
  },
  line2: {
    label: 'Address line 2 (optional)',
    labelType: 'small',
    maxChars: 35,
    errorMessages: {
      required: 'Enter address line 2',
      addressLine: 'Address line 2 contains invalid characters',
      maximumLength: 'Address line 2 must be {{expected}} characters or less'
    }
  },
  line3: {
    label: 'Address line 3 (optional)',
    labelType: 'small',
    maxChars: 35,
    errorMessages: {
      required: 'Enter address line 3',
      addressLine: 'Address line 3 contains invalid characters',
      maximumLength: 'Address line 3 must be {{expected}} characters or less'
    }
  },
  line4: {
    label: 'Town or city',
    labelType: 'small',
    maxChars: 35,
    errorMessages: {
      required: 'Enter a town or city',
      addressLine: 'Town or city contains invalid characters',
      maximumLength: 'Town or city must be {{expected}} characters or less'
    }
  },
  line5: {
    label: 'County (optional)',
    labelType: 'small',
    maxChars: 35,
    errorMessages: {
      required: 'Enter a county',
      addressLine: 'County contains invalid characters',
      maximumLength: 'County must be {{expected}} characters or less'
    }
  },
  postcode: {
    label: 'Postcode',
    labelType: 'small',
    errorMessages: {
      required: 'Enter a postcode',
      postcode: 'Enter a valid UK postcode'
    }
  }
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

const mergeMessages = (base = {}, override = {}) => {
  const messages = { ...base };
  Object.entries(override).forEach(([rule, message]) => {
    if (message !== undefined) {
      messages[rule] = message;
    }
  });
  return messages;
};

const merge = (base: AddressFieldConfig, override: AddressFieldConfig = {}) => ({
  label: override.label ?? base.label,
  labelType: override.labelType ?? base.labelType,
  maxChars: override.maxChars ?? base.maxChars,
  errorMessages: mergeMessages(base.errorMessages, override.errorMessages)
});

const resolveFields = (config: AddressFieldsConfig = {}) => ({
  line1: merge(DEFAULT_FIELDS.line1, config.line1),
  line2: merge(DEFAULT_FIELDS.line2, config.line2),
  line3: merge(DEFAULT_FIELDS.line3, config.line3),
  line4: merge(DEFAULT_FIELDS.line4, config.line4),
  line5: merge(DEFAULT_FIELDS.line5, config.line5),
  postcode: {
    label: config.postcode?.label ?? DEFAULT_FIELDS.postcode.label,
    labelType: config.postcode?.labelType ?? DEFAULT_FIELDS.postcode.labelType,
    errorMessages: mergeMessages(
      DEFAULT_FIELDS.postcode.errorMessages,
      config.postcode?.errorMessages
    )
  }
});

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
    PdkCore,
    PdkTagComponent,
    PdkCharacterCountComponent
  ],
  templateUrl: './address.component.html'
})
export class CppAddressComponent implements ControlValueAccessor, FormFieldControlV2, Validator {
  private readonly service = inject(AddressLookupService);
  private readonly injector = inject(Injector);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly disabled = input(false, { transform: coerceBooleanProperty });
  readonly required = input(false, { transform: coerceBooleanProperty });
  readonly fields = input(DEFAULT_FIELDS, { transform: resolveFields });
  readonly validThreshold = input(0.9);
  readonly needsVerificationThreshold = input(0.7);

  readonly verificationStatusChange = output<VerificationStatus>();

  id = generateId('cpp-address');
  ariaDescribedBy: string | null = null;
  hasError = false;
  errorMessages: ErrorMessageConfig[] = [];
  readonly controlType = 'address';
  readonly multi = true;
  readonly suppressedRules = ['address', 'required'];
  readonly controlRef = viewChild('line1El', { read: ElementRef<HTMLElement> });

  get ngControl(): NgControl {
    return this.injector.get(NgControl as Type<NgControl>, null as unknown as NgControl);
  }

  readonly addressForm = new FormGroup({
    line1: this.line('line1'),
    line2: this.line('line2'),
    line3: this.line('line3'),
    line4: this.line('line4'),
    line5: this.line('line5'),
    postcode: new FormControl('', {
      nonNullable: true,
      validators: [PdkTextInputValidators.postcode]
    })
  });

  readonly addressFormValue = toSignal(this.addressForm.valueChanges);
  readonly verifyAddress = signal<Address | null>(null);
  readonly verificationStatus = rxResource({
    request: this.verifyAddress,
    loader: ({ request }) => {
      if (!request) {
        return of(undefined);
      }
      // line5 is the county, which DPA never returns and which lowers the match score.
      return this.service
        .match(
          addressToSingleLine({ ...request, line5: undefined }),
          this.needsVerificationThreshold()
        )
        .pipe(
          map((results: ScoredAddress[]) => this.toStatus(results[0]?.match)),
          // A lookup we could not reach says nothing about the address itself.
          catchError(() => of<VerificationStatus>('unverified')),
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
      const formValues = this.addressFormValue();
      if (formValues === undefined) {
        return;
      }
      const { line1, line2, line3, line4, line5, postcode } = formValues;
      this.propagate(
        !line1.trim()
          ? null
          : {
              line1: line1.trim(),
              line2: line2.trim() || undefined,
              line3: line3.trim() || undefined,
              line4: line4.trim() || undefined,
              line5: line5.trim() || undefined,
              postcode: postcode.trim()
            }
      );
    });

    effect(() => {
      const required = this.required();

      [this.addressForm.controls.line1, this.addressForm.controls.postcode].forEach((control) => {
        required
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

  writeValue(address: Address | null): void {
    if (address) {
      this.patch(address);
      if (isPopulatedAddress(address)) {
        this.verifyAddress.set(address);
      }
    } else {
      this.addressForm.reset(undefined, { emitEvent: false });
      this.verificationStatus.set(undefined);
    }
    this.markForCheck();
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
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return control.value && this.addressForm.invalid ? { address: true } : null;
  }

  verify(): void {
    const current = this.addressForm.getRawValue() as Address;
    if (isPopulatedAddress(current)) {
      this.verifyAddress.set(current);
    }
  }

  characterCountFor(key: AddressLineKey): { value: string; limit: number } | null {
    const limit = this.fields()[key].maxChars;
    if (!limit) {
      return null;
    }
    const value = this.addressForm.controls[key].value;
    return limit - value.length <= CHARACTER_COUNT_THRESHOLD ? { value, limit } : null;
  }

  private line(key: AddressLineKey): FormControl<string> {
    return new FormControl('', {
      nonNullable: true,
      validators: [PdkTextInputValidators.addressLine, this.withinLimit(key)]
    });
  }

  private withinLimit(key: AddressLineKey): ValidatorFn {
    return (control: AbstractControl) => {
      const limit = this.fields()[key].maxChars;
      return limit ? InputValidators.maximumLength(limit)(control) : null;
    };
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
        postcode: address.postcode ?? ''
      },
      { emitEvent: false }
    );
  }
}
