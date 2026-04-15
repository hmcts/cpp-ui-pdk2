import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { ErrorMessageConfig } from '../form/form.interfaces';

const INTERPOLATION_REGEX = /{{([^}]+)}}/gm;

export const DEFAULT_ERROR_MESSAGES: ErrorMessageConfig[] = [
  {
    rule: 'required',
    message: `Enter this information`
  },
  {
    rule: 'pattern',
    message: 'Enter a valid format'
  },
  {
    rule: 'minCount',
    message: `Enter a minimum of {{expected}}`
  },
  {
    rule: 'maxCount',
    message: `Enter a maximum of {{expected}}`
  },
  {
    rule: 'minimumLength',
    message: 'Enter a value that is at least {{expected}} characters long'
  },
  {
    rule: 'maximumLength',
    message: `Enter a value that is no more than {{expected}} characters long`
  },
  {
    rule: 'postcode',
    message: 'Postcode must be in the right format with a space, for example AB1 2CD'
  },
  {
    rule: 'number',
    message: 'Enter a valid number'
  },
  {
    rule: 'email',
    message: 'Enter a valid email address'
  },
  {
    rule: 'addressLine',
    message: 'An address line can only start with letters or numbers'
  }
];

@Component({
  selector: '[pdk-error-message], pdk-error-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` {{ errorMessage }} `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./error-message.scss']
})
export class PdkErrorMessageComponent {
  @HostBinding('class.govuk-error-message') error = true;

  @Input() errors: { [type: string]: any } | null;
  @Input() errorMessages: ErrorMessageConfig[] = [];

  get errorMessage(): string | null {
    if (this.errors) {
      for (const config of this.errorMessages || []) {
        const error = this.errors[config.rule];

        if (error) {
          return createErrorMessage(config, error);
        }
      }
      for (const config of DEFAULT_ERROR_MESSAGES) {
        const error = this.errors[config.rule];

        if (error) {
          return createErrorMessage(config, error);
        }
      }
      return 'Invalid input';
    }
    return null;
  }
}

export function createErrorMessage(config: ErrorMessageConfig, error: any) {
  if (typeof config.message === 'function') {
    return config.message(error);
  }

  return config.message.replace(INTERPOLATION_REGEX, (matchedGroup, keyToInterpolate) => {
    try {
      return error[keyToInterpolate];
    } catch {
      return matchedGroup;
    }
  });
}
