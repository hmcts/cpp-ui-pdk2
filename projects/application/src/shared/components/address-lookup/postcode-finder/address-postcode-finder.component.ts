import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  coerceBooleanProperty,
  PdkButton,
  PdkCore,
  PdkForm,
  PdkInsetTextComponent,
  PdkInput,
  PdkRadio,
  PdkTextInput,
  PdkTextInputValidators,
  ValidationError
} from '@cpp/pdk';

import { Address, addressToSingleLine } from '../address.model';
import { OrdnanceSurveyPlacesService } from '../ordnance-survey-places.service';

@Component({
  selector: 'cpp-address-postcode-finder',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './address-postcode-finder.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    PdkForm,
    PdkInsetTextComponent,
    PdkInput,
    PdkTextInput,
    PdkButton,
    PdkRadio,
    PdkCore
  ],
  templateUrl: './address-postcode-finder.component.html'
})
export class CppAddressPostcodeFinderComponent {
  private readonly service = inject(OrdnanceSurveyPlacesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly disabled = input(false, { transform: coerceBooleanProperty });

  readonly addressFound = output<Address>();
  readonly errors = output<ValidationError[] | null>();

  readonly searchForm = new FormGroup({
    postcode: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, PdkTextInputValidators.postcode]
    })
  });

  readonly results = signal<Address[] | null>(null);
  readonly isDisabled = signal(false);

  readonly resultsLabel = computed(() => {
    const count = this.results()?.length ?? 0;
    return `${count} address${count === 1 ? '' : 'es'} found`;
  });

  readonly addressOptions = computed(() =>
    (this.results() ?? []).map((address) => ({
      value: address,
      label: addressToSingleLine(address)
    }))
  );

  private readonly searchFormDir = viewChild.required(FormGroupDirective);

  constructor() {
    effect(() => {
      const disabled = this.disabled();
      disabled
        ? this.searchForm.disable({ emitEvent: false })
        : this.searchForm.enable({ emitEvent: false });
      this.isDisabled.set(disabled);
    });
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
    this.addressFound.emit(address);
    this.searchFormDir().resetForm();
  }
}
