import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  contentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Injector,
  Input,
  Optional,
  Output,
  Type,
  viewChild,
  viewChildren,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { FormFieldControl } from '../form/form.interfaces';
import { coerceBooleanProperty, generateId } from '../util/index';

export interface CheckboxChangeEvent<T = unknown> {
  source: PdkCheckboxComponent;
  checked: boolean;
  value: T;
}

export interface CheckboxOption<T = unknown> {
  value: T;
  label: string;
  hintText?: string;
}

const empty = [];

@Component({
  selector: 'pdk-checkbox-group',
  exportAs: 'pdkCheckboxGroup',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: FormFieldControl,
      useExisting: forwardRef(() => PdkCheckboxGroupComponent)
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkCheckboxGroupComponent),
      multi: true
    }
  ],
  template: `
    <div class="govuk-checkboxes">
      @for (option of options; track option.label) {
      <pdk-checkbox [hintText]="option.hintText" [value]="option.value">
        {{ option.label }}
      </pdk-checkbox>
      }
      <ng-content></ng-content>
    </div>
  `,
  imports: [forwardRef(() => PdkCheckboxComponent)]
})
export class PdkCheckboxGroupComponent<T = unknown>
  implements ControlValueAccessor, FormFieldControl
{
  @Input() id: string;
  @Input() checkboxType: 'default' | 'small' = 'default';

  // The `ariaDescribedby` attribute exists not on the checkbox group, but on the
  // first checkbox within the group. Conseqeuently, we trigger change detection on
  // the children such that this id is inherited
  @Input()
  get ariaDescribedBy(): string | null {
    return this._ariaDescribedBy;
  }
  set ariaDescribedBy(id: string | null) {
    this._ariaDescribedBy = id;
    this.markCheckboxesForCheck();
  }

  // The `disabled` attribute is inherited by all child checkboxes, such that they
  // can be disabled collectively as a consequence of belonging to this group
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    this.markCheckboxesForCheck();
  }

  // The `value` can be set either directly via the input binding or, more commonly,
  // via the ControlValueAccessor. While the ngControl belongs to the checkbox group,
  // we trigger change detection on the child checkboxes so that their checked status
  // can be re-evaulated
  get value(): T[] {
    return this._value || empty;
  }
  set value(val: T[]) {
    if (val !== this._value) {
      this._value = val;
      this.markCheckboxesForCheck();
    }
  }

  // The `options` is an alternative means to transclusion for setting checkboxes,
  // where an array of value/label pairs can be passed for adding checkboxes to the group
  @Input() options: CheckboxOption[];

  // Event output for
  @Output() change: EventEmitter<CheckboxChangeEvent> = new EventEmitter();

  viewCheckboxes = viewChildren<PdkCheckboxComponent>(forwardRef(() => PdkCheckboxComponent));
  contentCheckboxes = contentChildren<PdkCheckboxComponent>(forwardRef(() => PdkCheckboxComponent));

  first = computed((): PdkCheckboxComponent | null => {
    const viewCheckboxes = this.viewCheckboxes();
    const contentCheckboxes = this.contentCheckboxes();
    if (viewCheckboxes && viewCheckboxes.at(0)) {
      return viewCheckboxes.at(0);
    }
    return contentCheckboxes && contentCheckboxes.at(0);
  });

  controlRef = computed(() => {
    const first = this.first();
    return first?.controlRef();
  });
  // expose the ngControl (lazily as it is unknown when injected into the
  // constructor) so that it's available for FormField
  get ngControl(): NgControl {
    return this.injector.get(NgControl as Type<NgControl>);
  }
  controlType = 'checkbox-group';
  multi = true;
  name = generateId('pdk-checkbox-group');

  private _ariaDescribedBy: string | null;
  private _disabled: boolean;
  private _value: T[];

  constructor(private injector: Injector) {}

  emitChangeEvent(checkbox: PdkCheckboxComponent): void {
    this.change.emit({
      source: checkbox,
      checked: checkbox.checked,
      value: checkbox.value
    });
  }

  markCheckboxesForCheck() {
    const contentCheckboxes = this.contentCheckboxes();
    if (contentCheckboxes) {
      contentCheckboxes.forEach((checkbox) => checkbox.markForCheck());
    }
    const viewCheckboxes = this.viewCheckboxes();
    if (viewCheckboxes) {
      viewCheckboxes.forEach((checkbox) => checkbox.markForCheck());
    }
  }

  propagateChange: (value: T) => void = () => {};

  onTouched: () => void = () => {};

  touch() {
    this.onTouched();
  }

  writeValue(val: T[]) {
    this.value = val;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn: (value: T) => void) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }
}

@Component({
  selector: 'pdk-checkbox',
  exportAs: 'pdkCheckbox',
  template: `
    <div class="govuk-checkboxes__item">
      <input
        #inputRef
        type="checkbox"
        class="govuk-checkboxes__input"
        [attr.id]="id"
        [required]="required"
        [checked]="checked"
        [disabled]="disabled"
        [value]="valueChecked"
        [attr.aria-describedby]="ariaDescribedBy"
        [attr.name]="name"
        (change)="onChange($event)"
      />
      <label class="govuk-label govuk-checkboxes__label" [attr.for]="id">
        <ng-content></ng-content>
      </label>
      @if (hintText) {
      <span class="govuk-hint govuk-checkboxes__hint">{{ hintText }}</span>
      }
    </div>
  `,
  styleUrls: ['./checkbox.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkCheckboxComponent),
      multi: true
    },
    {
      provide: FormFieldControl,
      useExisting: forwardRef(() => PdkCheckboxComponent)
    }
  ]
})
export class PdkCheckboxComponent implements ControlValueAccessor, FormFieldControl {
  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  get disabled(): boolean {
    if (this._disabled === undefined) {
      if (this.checkboxGroup) {
        return this.checkboxGroup.disabled;
      }
    }
    return this._disabled;
  }

  @Input() id = generateId('pdk-checkbox');
  @Input()
  set name(name: string) {
    this._name = name;
  }
  get name() {
    if (this._name === undefined) {
      if (this.checkboxGroup) {
        return this.checkboxGroup.name;
      }
    }
    return this._name;
  }

  @Input() hintText?: string;
  @Input()
  set checkboxType(type: 'default' | 'small' | undefined) {
    this._checkboxType = type;
  }
  get checkboxType(): 'default' | 'small' {
    if (!this.standalone) {
      if (this.checkboxGroup && this.checkboxGroup.checkboxType) {
        return this.checkboxGroup.checkboxType;
      }
    }
    return this._checkboxType || 'default';
  }
  @Input()
  set value(val: any) {
    this._valueChecked = val;
  }
  get value() {
    return this.checked ? this._valueChecked : this._valueUnchecked;
  }
  @Input()
  set valueChecked(val: any) {
    this._valueChecked = val;
  }
  get valueChecked(): any {
    return this._valueChecked;
  }

  @Input()
  set valueUnchecked(val: any) {
    this._valueUnchecked = val;
  }
  get valueUnchecked(): any {
    return this._valueUnchecked;
  }

  @Input()
  set ariaDescribedBy(id: string | null) {
    this._ariaDescribedBy = id;
  }
  get ariaDescribedBy(): string | null {
    if (!this.standalone) {
      if (this.checkboxGroup.ariaDescribedBy && this.checkboxGroup.first() === this) {
        return this.checkboxGroup.ariaDescribedBy;
      }
    }
    return this._ariaDescribedBy;
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }

  get checked() {
    if (!this.standalone) {
      return this.checkboxGroup.value.indexOf(this._valueChecked) !== -1;
    }
    return this._checked;
  }
  set checked(checked: boolean) {
    this._checked = checked;
    this.markForCheck();
  }

  @Output() change = new EventEmitter<CheckboxChangeEvent>();

  @HostBinding('class.govuk-checkboxes') checkbox = true;
  @HostBinding('class.govuk-checkboxes--small')
  get small() {
    return this.checkboxType === 'small';
  }

  controlType = 'checkbox';
  multi = false;
  readonly controlRef = viewChild.required<ElementRef<HTMLInputElement>>('inputRef');
  _name: string;
  _ariaDescribedBy: string | null;
  _checked: boolean;
  _checkboxType: 'default' | 'small' | undefined;
  _disabled: boolean;
  _required: boolean;
  _valueChecked: any = true;
  _valueUnchecked: any = false;

  private propagateChange = (_: any) => {};
  private onTouched: () => any = () => {};

  constructor(
    @Optional() private checkboxGroup: PdkCheckboxGroupComponent,
    public injector: Injector,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  get ngControl(): NgControl {
    return this.injector.get(NgControl as Type<NgControl>);
  }

  get standalone(): boolean {
    return !this.checkboxGroup || this.checkboxGroup.name !== this.name;
  }

  onChange(event: Event) {
    event.stopPropagation();

    if (!this.disabled) {
      if (this.checkboxGroup && this.checkboxGroup.name === this.name) {
        const value = this.checked
          ? this.checkboxGroup.value.filter((v) => v !== this._valueChecked)
          : this.checkboxGroup.value.concat(this._valueChecked);

        this.checkboxGroup.propagateChange(value);
        this.checkboxGroup.touch();
        this.checkboxGroup.value = value;
        this.checkboxGroup.emitChangeEvent(this);
      } else {
        this.checked = !this.checked;
        this.change.emit({ source: this, checked: this.checked, value: this.value });
        this.propagateChange(this.value);
      }
    }
  }

  markForCheck() {
    this.changeDetectorRef.markForCheck();
  }

  registerOnChange = (fn: (_: any) => {}) => {
    this.propagateChange = fn.bind(this);
  };

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.checked = value === this._valueChecked;
  }
}

@Component({
  selector: 'pdk-checkbox-conditional',
  template: ` <div class="govuk-checkboxes__conditional"><ng-content></ng-content></div> `
})
export class PdkCheckboxConditionalComponent {
  @Input()
  set checkboxType(type: 'default' | 'small' | undefined) {
    this._checkboxType = type;
  }
  get checkboxType(): 'default' | 'small' {
    if (!this._checkboxType) {
      if (this.checkboxGroup && this.checkboxGroup.checkboxType) {
        return this.checkboxGroup.checkboxType;
      }
      return 'default';
    }
    return this._checkboxType;
  }

  @HostBinding('class.govuk-checkboxes--small')
  get small() {
    return this.checkboxType === 'small';
  }

  private _checkboxType: 'default' | 'small' | undefined;

  constructor(@Optional() private checkboxGroup: PdkCheckboxGroupComponent) {}
}
