import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  Optional,
  Type,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl, NgForm, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PdkFormFieldComponent } from '../form/form-field.component';
import { FormFieldControl, FormFieldControlV2 } from '../form/form.interfaces';
import { coerceBooleanProperty, generateId } from '../util/index';
import { PdkInputComponent, PdkInputDirective } from '../input/input.directive';
import { PdkSearchIconComponent } from './search-icon.component';
import { PdkVisuallyHiddenDirective } from '../core/accessibility';

@Component({
  selector: 'pdk-searchbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pdk-searchbar" [class.pdk-searchbar--secondary]="invert">
      <input
        #inputRef
        class="pdk-searchbar__input"
        [class.pdk-searchbar__input--borderless]="borderless"
        pdk-input
        [hasError]="hasError"
        type="text"
        [value]="value"
        [required]="required"
        [placeholder]="placeholder"
        [attr.aria-label]="ariaLabel"
        [attr.aria-labelledby]="ariaLabelledBy"
        [attr.aria-describedby]="ariaDescribedBy"
        [attr.id]="resolvedId"
        (change)="onChange($event)"
      />
      <button
        type="submit"
        class="pdk-searchbar__button"
        [class.pdk-searchbar__button--borderless]="borderless"
      >
        <pdk-search-icon color="#fff"></pdk-search-icon>
        <span class="pdk-searchbar__label" pdk-visually-hidden> {{ ariaLabel }} </span>
      </button>
    </div>
  `,
  providers: [
    {
      provide: FormFieldControl,
      useExisting: PdkSearchbarComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkSearchbarComponent),
      multi: true
    }
  ],
  styleUrls: ['./searchbar.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    PdkInputComponent,
    PdkInputDirective,
    PdkSearchIconComponent,
    PdkVisuallyHiddenDirective
  ]
})
export class PdkSearchbarComponent
  implements AfterViewInit, ControlValueAccessor, FormFieldControlV2, OnDestroy
{
  _borderless = false;
  _invert: boolean;
  _required: boolean;
  controlType = 'search';
  multi = false;
  value: string;

  private _errorsSubscription: Subscription;

  @Input() id = generateId('pdk-search');
  @Input() ariaDescribedBy: string = null;
  @Input() ariaLabel: string = null;
  @Input() ariaLabelledBy: string = null;
  @Input()
  set borderless(on: boolean) {
    this._borderless = coerceBooleanProperty(on);
  }
  get borderless(): boolean {
    return this._borderless;
  }
  @Input() placeholder = '';
  @Input() hasError = false;
  @Input()
  get invert(): boolean {
    return this._invert;
  }
  set invert(on: boolean) {
    this._invert = coerceBooleanProperty(on);
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req: any) {
    this._required = coerceBooleanProperty(req);
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private injector: Injector,
    private ngForm: NgForm,
    @Optional() private formFieldComponent: PdkFormFieldComponent
  ) {}

  get ngControl(): NgControl {
    return this.injector.get(NgControl as Type<NgControl>);
  }

  get resolvedId(): string {
    return this.formFieldComponent ? this.id : `searchbar_${this.id}`;
  }

  controlRef = viewChild.required('inputRef', { read: ElementRef<HTMLInputElement> });

  private propagateChange = (_: any) => {};
  private onTouched: () => any = () => {};

  ngAfterViewInit() {
    if (!this.formFieldComponent) {
      this._errorsSubscription = this.ngForm.ngSubmit.subscribe(() => {
        this.hasError = Boolean(this.ngControl.errors);
        this.markForCheck();
      });
    }
  }

  ngOnDestroy() {
    if (this._errorsSubscription) {
      this._errorsSubscription.unsubscribe();
    }
  }

  markForCheck() {
    this.cdr.markForCheck();
  }

  onChange(event: Event) {
    const eventValue: string = event.target !== null ? event.target['value'] : null;
    this.value = eventValue;
    this.propagateChange(eventValue);
  }

  registerOnChange = (fn: (_: any) => {}) => {
    this.propagateChange = fn.bind(this);
  };

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  writeValue(value: any): void {
    this.value = value || '';
    this.cdr.detectChanges();
  }
}
