import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  Output,
  TemplateRef,
  Type,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';
import {
  NgOption,
  NgSelectComponent,
  NgLabelTemplateDirective,
  NgOptionTemplateDirective
} from '@ng-select/ng-select';
import { FormFieldControl, FormFieldControlV2 } from '../form/form.interfaces';
import { PdkTagColor, PdkTagComponent } from '../tag/tag.component';
import { coerceBooleanProperty, generateId } from '../util/index';
import { NgTemplateOutlet } from '@angular/common';
import { PdkCheckboxComponent } from '../checkbox/checkbox.component';
import { PdkMarginDirective } from '../core/spacing';

export type MultiSelectInputWidth = 2 | 3 | 4 | 5 | 10 | 20 | 30;

const DEFAULT_ERROR_MESSAGES = [
  {
    rule: 'required',
    message: 'Select at least an option'
  }
];

export interface MultiSelectChangeEvent<T = unknown, V extends Array<unknown> = Array<unknown>> {
  source: PdkMultiSelectComponent<T, V>;
  value: V;
}

export interface MultiSelectOption<V = unknown> {
  value: V;
  label: string;
}

export interface MultiSelectOptionTemplateContext<T> {
  option: T;
  optionModel: NgOption;
  searchQuery: string | null;
}

export interface MultiSelectLabelTemplateContext<T> {
  selection: T;
  clearSelection: (item: T) => void;
}

@Component({
  selector: 'pdk-multi-select',
  exportAs: 'pdkMultiSelect',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-select
      [items]="options"
      [labelForId]="id"
      [clearable]="canClear"
      [searchable]="canSearch"
      [multiple]="true"
      [clearSearchOnAdd]="true"
      [ngModel]="value"
      (ngModelChange)="onChange($event)"
      [bindLabel]="selectionBindLabel"
      [bindValue]="selectionBindValue"
      [disabled]="disabled"
      [placeholder]="value?.length > 0 ? '' : placeholder"
      [closeOnSelect]="collapseOnSelect"
      [required]="required"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-label]="ariaLabel"
      [class.pdk-multi-select--width-2]="inputWidth === 2"
      [class.pdk-multi-select--width-3]="inputWidth === 3"
      [class.pdk-multi-select--width-4]="inputWidth === 4"
      [class.pdk-multi-select--width-5]="inputWidth === 5"
      [class.pdk-multi-select--width-10]="inputWidth === 10"
      [class.pdk-multi-select--width-20]="inputWidth === 20"
      [class.pdk-multi-select--width-30]="inputWidth === 30"
      [class.pdk-multi-select--justified]="justified"
      [class.pdk-multi-select-error]="hasError"
    >
      <ng-template ng-label-tmp let-item="item" let-clear="clear">
        <ng-template
          [ngTemplateOutlet]="labelTemplate || standardLabel"
          [ngTemplateOutletContext]="{ selection: item, clearSelection: clear }"
        ></ng-template>
      </ng-template>
      <ng-template ng-option-tmp let-item="item" let-item$="item$" let-searchTerm="searchTerm">
        <ng-template
          [ngTemplateOutlet]="optionTemplate || checkboxes"
          [ngTemplateOutletContext]="{ option: item, optionModel: item$, searchQuery: searchTerm }"
        >
        </ng-template>
      </ng-template>
    </ng-select>
    <ng-template
      #checkboxes
      let-option="option"
      let-optionModel="optionModel"
      let-searchTerm="searchTerm"
    >
      <pdk-checkbox
        [checkboxType]="'small'"
        [ngModel]="optionModel.selected"
        [ngModelOptions]="{ standalone: true }"
        (click)="$event.stopPropagation()"
        (ngModelChange)="selectItem(optionModel)"
      >
        <span class="pdk-multi-select--checkbox-label"> {{ option.label }}</span>
      </pdk-checkbox>
    </ng-template>

    <ng-template #standardLabel let-selection="selection" let-clearSelection="clearSelection">
      <pdk-tag [color]="tagColor" pdk-margin-bottom="1" pdk-margin-top="1" pdk-margin-right="1">
        <span class="pdk-multi-select--label">
          {{ selection.label }}
          <span class="ng-value-icon" (click)="clearSelection(selection)" aria-hidden="true"
            >×</span
          >
        </span>
      </pdk-tag>
    </ng-template>
  `,
  providers: [
    {
      provide: FormFieldControl,
      useExisting: PdkMultiSelectComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PdkMultiSelectComponent),
      multi: true
    }
  ],
  styleUrls: ['./multi-select.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    NgSelectComponent,
    FormsModule,
    NgLabelTemplateDirective,
    NgTemplateOutlet,
    NgOptionTemplateDirective,
    PdkCheckboxComponent,
    PdkTagComponent,
    PdkMarginDirective
  ]
})
export class PdkMultiSelectComponent<T = unknown, V extends Array<unknown> = Array<unknown>>
  implements ControlValueAccessor, FormFieldControlV2
{
  @Input() id = generateId('pdk-multi-select');
  @Input() placeholder: string;
  @Input() selectionBindLabel: keyof MultiSelectOption = 'label';
  @Input() selectionBindValue: keyof MultiSelectOption = 'value';
  @Input() canClear = true;
  @Input() canSearch = true;
  @Input() collapseOnSelect = false;
  @Input() disabled: boolean;
  @Input() options: MultiSelectOption[];
  @Input() ariaDescribedBy: string | null;
  @Input() ariaLabel: string | null;
  @Input() inputWidth?: MultiSelectInputWidth;
  @Input() hasError = false;
  @Input() tagColor: PdkTagColor = 'blue';
  @Input() optionTemplate: TemplateRef<MultiSelectOptionTemplateContext<T>>;
  @Input() labelTemplate: TemplateRef<MultiSelectLabelTemplateContext<T>>;
  readonly multiSelect = viewChild.required<NgSelectComponent>(NgSelectComponent);
  readonly controlRef = computed(() => {
    const multiSelect = this.multiSelect();
    return multiSelect ? multiSelect.searchInput : null;
  });

  @Input()
  get justified() {
    return this._justified;
  }
  set justified(req: any) {
    this._justified = coerceBooleanProperty(req);
  }

  @Input()
  get required() {
    return this._required;
  }
  set required(req: any) {
    this._required = coerceBooleanProperty(req);
  }

  get value() {
    return this._value;
  }
  set value(val: V) {
    this._value = val;
  }

  @Output() change = new EventEmitter<MultiSelectChangeEvent<T, V>>();

  controlType = 'multi-select';
  errorMessages = DEFAULT_ERROR_MESSAGES;
  errors: { [key: string]: any } | null;
  multi = false;
  _justified = false;
  _required: boolean;
  _value: V;

  propagateChange = (_: any) => {};
  onTouched: () => any = () => {};

  constructor(private injector: Injector, private cd: ChangeDetectorRef) {}

  get ngControl() {
    return this.injector.get(NgControl as Type<NgControl>);
  }

  markForCheck() {
    this.cd.markForCheck();
  }

  selectItem(item: NgOption) {
    this.multiSelect().toggleItem(item);
    this.change.emit({ source: this, value: this.value });
    this.propagateChange(this.value);
  }

  onChange(val: V) {
    if (!this.disabled) {
      this._value = val;
      this.change.emit({ source: this, value: this.value });
      this.propagateChange(this.value);
    }
  }

  registerOnChange = (fn: (_: any) => void) => {
    this.propagateChange = fn.bind(this);
  };

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = value;
    this.cd.markForCheck();
  }
}
