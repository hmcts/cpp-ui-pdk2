import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  Signal
} from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorMessageConfig, FormFieldControl, FormFieldControlV2 } from '../form/form.interfaces';
import { LabelType, PdkLabelDirective, PdkLabelComponent } from '../input/input-label.directive';
import { coerceBooleanProperty, generateId } from '../util/index';
import {
  createErrorMessage,
  DEFAULT_ERROR_MESSAGES,
  PdkErrorMessageComponent
} from '../error-message/error-message.component';
import { PdkFormComponent } from './form.component';
import { NgTemplateOutlet } from '@angular/common';
import { PdkHintComponent } from '../hint/hint.component';
import { PdkFormGroupComponent, PdkFormGroupDirective } from './form-group.component';
import {
  PdkFieldsetComponent,
  PdkFieldsetLegendDirective
} from '../input/input-fieldset.directive';
import { PdkVisuallyHiddenDirective } from '../core/accessibility';

let formFieldId = 0;

@Component({
  selector: 'pdk-form-field',
  exportAs: 'pdkFormField',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #formFieldContent>
      @if (hint || hintText) {
      <pdk-hint [hint]="hint && formFieldControl?.controlType">
        {{ hintText }}
      </pdk-hint>
      } @if (hasError) {
      <pdk-error-message
        [id]="errorId"
        [errors]="consolidatedErrors"
        [errorMessages]="errorMessages"
      >
      </pdk-error-message>
      }
      <ng-content></ng-content>
    </ng-template>

    <pdk-form-group [hasError]="hasError">
      @if (formFieldControl?.multi) {
      <fieldset pdk-fieldset>
        @if (label) {
        <legend [pdk-legend]="labelType" [pdk-visually-hidden]="labelType === 'none'">
          {{ label }}
        </legend>
        }
        <ng-container *ngTemplateOutlet="formFieldContent"></ng-container>
      </fieldset>
      } @if (!formFieldControl?.multi) { @if (label) {
      <label
        [pdk-visually-hidden]="labelType === 'none'"
        [pdk-label]="labelType"
        [attr.for]="controlId"
      >
        {{ label }}
      </label>
      }
      <ng-container *ngTemplateOutlet="formFieldContent"></ng-container>
      }
    </pdk-form-group>
  `,
  imports: [
    PdkHintComponent,
    PdkErrorMessageComponent,
    PdkFormGroupComponent,
    PdkFormGroupDirective,
    PdkFieldsetComponent,
    PdkFieldsetLegendDirective,
    PdkVisuallyHiddenDirective,
    NgTemplateOutlet,
    PdkLabelDirective,
    PdkLabelComponent
  ]
})
export class PdkFormFieldComponent implements AfterContentInit, OnDestroy {
  @ContentChild(FormFieldControl) formFieldControl: FormFieldControl | FormFieldControlV2;

  @Input() set errors(errors: ValidationErrors | null) {
    this._externalErrors = errors;
    setTimeout(() => {
      this.evaluateErrors();
      // trigger errors event on the form – should we be doing this when
      // setting a value programatically? This is not how ngModelChange works,
      // but makes the pdkForm experience more seamless with regards to
      // forwarding errors to pdk-error-summary
      if (this.pdkForm) {
        this.pdkForm.emitErrors(false);
      }
    });
  }
  @Input()
  get errorMessages(): ErrorMessageConfig[] {
    if (this.formFieldControl && this.formFieldControl.errorMessages) {
      // spread order will dicate the order of priority for multiple matching rules
      return [
        ...this.externalErrorMessages,
        ...this.formFieldControl.errorMessages,
        ...DEFAULT_ERROR_MESSAGES
      ];
    }
    return [...this.externalErrorMessages, ...DEFAULT_ERROR_MESSAGES];
  }
  set errorMessages(val: ErrorMessageConfig[]) {
    this.externalErrorMessages = val;
  }

  @Input()
  get hint(): boolean {
    return this._hint;
  }
  set hint(val: boolean) {
    this._hint = coerceBooleanProperty(val);
  }

  @Input() hintText: string;
  @Input() label: string;
  @Input() labelForErrorSummary: string;

  @Input()
  get labelType() {
    return this._labelType;
  }
  set labelType(type: LabelType | 'none') {
    this._labelType = type;
  }

  errorId: string;
  formFieldId: string;
  formFieldControlRef: Signal<ElementRef<HTMLElement>>;
  identifier = generateId();

  get consolidatedErrors(): ValidationErrors | null {
    return this._externalErrors || this._ngControlErrors;
  }

  get hasError(): boolean {
    return Boolean(this.consolidatedErrors);
  }

  private ngOnDestroy$ = new Subject<void>();
  private externalErrorMessages: ErrorMessageConfig[] = [];
  private _externalErrors: ValidationErrors | null;
  private _hint: boolean;
  private _labelType: LabelType | 'none' = 'default';
  private _ngControlErrors: ValidationErrors | null;

  constructor(
    @Optional() private pdkForm: PdkFormComponent,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    formFieldId += 1;

    this.errorId = `pdk-form-error-${this.identifier}`;
    this.formFieldId = `form-field-${formFieldId}`;
  }

  get controlId() {
    if (this.formFieldControl && this.formFieldControl.id) {
      return this.formFieldControl.id;
    }
    return `pdk-form-control-${this.identifier}`;
  }

  ngAfterContentInit() {
    this.formFieldControl.id = this.controlId;
    this.formFieldControlRef = this.formFieldControl.controlRef;

    if (this.pdkForm) {
      this.pdkForm.reset$.pipe(takeUntil(this.ngOnDestroy$)).subscribe(() => {
        this.setNgControlErrors(null);
      });
      this.pdkForm.submit$.pipe(takeUntil(this.ngOnDestroy$)).subscribe(() => {
        this.setNgControlErrors(this.formFieldControl.ngControl.errors);
      });
    }
  }

  ngOnDestroy() {
    this.ngOnDestroy$.next();

    if (this.pdkForm) {
      this.pdkForm.removeError(this.formFieldId);
      this.pdkForm.emitErrors(true);
    }
  }

  setNgControlErrors(errors: ValidationErrors | null) {
    this._ngControlErrors = errors;
    this.evaluateErrors();
  }

  private evaluateErrors() {
    if (this.formFieldControl) {
      this.formFieldControl.ariaDescribedBy = this.consolidatedErrors ? this.errorId : null;
      this.formFieldControl.hasError = this.hasError;

      if (this.consolidatedErrors) {
        // @see CRC-12168
        // Use custom error message if it is set
        const includeLabel = this.pdkForm && this.pdkForm.errorFormat === 'extended';
        const message = includeLabel
          ? this.labelForErrorSummary || `${this.label} – ${this.getErrorMessage()}`
          : this.labelForErrorSummary || this.getExternalErrorMessage() || this.label;

        if (this._externalErrors) {
          this.pdkForm.addExternalError(this.formFieldId, {
            id: this.errorId,
            message,
            controlRef: this.formFieldControlRef && this.formFieldControlRef()
          });
        } else {
          this.pdkForm.addInternalError(this.formFieldId, {
            id: this.errorId,
            message,
            controlRef: this.formFieldControlRef && this.formFieldControlRef()
          });
        }
      } else {
        this.pdkForm.removeError(this.formFieldId);
      }
      this.changeDetectorRef.markForCheck();
      // For form field controls that use ChangeDetectionStrategy.OnPush, we must
      // directly trigger their change detection
      if ('markForCheck' in this.formFieldControl) {
        this.formFieldControl.markForCheck();
      }
    }
  }

  // find and use any error message, either from an input, or from a form field control declaration

  private getErrorMessage() {
    for (const rule in this.consolidatedErrors) {
      if (Object.prototype.hasOwnProperty.call(this.consolidatedErrors, rule)) {
        const config = this.errorMessages.find((errorConfig) => errorConfig.rule === rule);

        if (config) {
          return createErrorMessage(config, this.consolidatedErrors[rule]);
        }
      }
    }
    return 'Invalid input';
  }

  // find an error message only if it has been provided via an input

  private getExternalErrorMessage() {
    for (const rule in this.consolidatedErrors) {
      if (Object.prototype.hasOwnProperty.call(this.consolidatedErrors, rule)) {
        const config = this.externalErrorMessages.find((errorConfig) => errorConfig.rule === rule);

        if (config) {
          return createErrorMessage(config, this.consolidatedErrors[rule]);
        }
      }
    }
    return null;
  }
}
