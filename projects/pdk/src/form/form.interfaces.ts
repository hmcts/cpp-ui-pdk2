import { ElementRef, Signal } from '@angular/core';
import { NgControl } from '@angular/forms';

// Deprecated - use FormFieldControlV2 with explicit `markForCheck` to handle
// updates on implementations with `OnPush` change detection. This legacy
// definition will remain until a major release as apps depend up on it.

export abstract class FormFieldControl {
  id: string;
  ariaDescribedBy: string | null;
  hasError?: boolean;
  errorMessages?: ErrorMessageConfig[];
  readonly controlType: string;
  readonly multi: boolean;
  readonly ngControl: NgControl;
  readonly controlRef?: Signal<ElementRef<HTMLElement>>;
}

export abstract class FormFieldControlV2 extends FormFieldControl {
  markForCheck: () => void;
}

export interface ValidationError {
  id: string;
  message: string;
  shouldFocus?: boolean;
  controlRef?: ElementRef<HTMLElement>;
}

export interface ErrorMessageConfig {
  rule: string;
  message: string | ((error: any) => string);
}
