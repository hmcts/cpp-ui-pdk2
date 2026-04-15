import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ValidationError } from '../form/form.interfaces';
import { coerceBooleanProperty, generateId } from '../util/index';

@Component({
  selector: 'pdk-error-summary',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="govuk-error-summary" tabindex="-1">
      <div #alert role="alert" [attr.aria-labelledby]="id">
        <h2 class="govuk-error-summary__title" [attr.id]="id">{{ title }}</h2>
        <div class="govuk-error-summary__body">
          <ul class="govuk-list govuk-error-summary__list">
            @for (error of errors; track error.id) {
            <li>
              <a href="javascript:void(0)" (click)="scrollToId(error.id)"> {{ error.message }} </a>
            </li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./error-summary.scss']
})
export class PdkErrorSummaryComponent implements AfterViewInit, OnChanges {
  @Input() errors = [] as ValidationError[];
  @Input() title = 'There is a problem';
  @ViewChild('alert', { static: true }) alert: ElementRef<HTMLElement>;

  @Input()
  set focusOnChange(enabled: boolean) {
    this._focusOnChange = coerceBooleanProperty(enabled);
  }
  get focusOnChange(): boolean {
    return this._focusOnChange;
  }

  id = generateId('pdk-error-sumamry');
  _focusOnChange = true;

  ngOnChanges(changes: SimpleChanges) {
    // only scroll into view when new errors are added
    if (
      changes.errors &&
      changes.errors.currentValue &&
      changes.errors.currentValue !== changes.errors.previousValue
    ) {
      this.scrollIntoView();
    }
  }

  ngAfterViewInit() {
    this.scrollIntoView();
  }

  scrollIntoView() {
    // scrollIntoView is not available in unit test environment, so check for
    // presence to prevent errors in consuming apps
    if (
      this.alert &&
      this.alert.nativeElement.scrollIntoView &&
      this.focusOnChange &&
      this.errors.find((error) => error.shouldFocus)
    ) {
      this.alert.nativeElement.scrollIntoView({ behavior: 'smooth' });
      // after half a second we set the focus, requested for accessibility
      // if we do inmediately the interface will scroll without doing it smoothly
      setTimeout(() => {
        this.alert.nativeElement.focus();
      }, 500);
    }
  }

  scrollToId(id: string) {
    const elem = document.getElementById(id);
    const error = this.errors.find((error) => error.id === id);

    if (elem) {
      elem.scrollIntoView();
    }
    if (error && error.shouldFocus && error.controlRef) {
      // after half a second we set the focus, requested for accessibility
      // if we do inmediately the interface will scroll without doing it smoothly
      setTimeout(() => {
        error.controlRef.nativeElement.focus();
      }, 200);
    }
  }
}
