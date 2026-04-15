import {
  Component,
  Directive,
  ElementRef,
  forwardRef,
  HostBinding,
  inject,
  Input,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormFieldControl } from '../form/form.interfaces';

@Component({
  selector: '[pdk-file-input]',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./file-input.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PdkFileInputComponent {}

@Directive({
  selector: '[pdk-file-input]',
  providers: [
    {
      provide: FormFieldControl,
      useExisting: forwardRef(() => PdkFileInputDirective)
    }
  ]
})
export class PdkFileInputDirective implements FormFieldControl {
  @HostBinding('attr.aria-describedby') @Input() ariaDescribedBy: string | null;
  @HostBinding('attr.id') @Input() id: string;
  @HostBinding('class.govuk-file-upload') fileUpload = true;

  controlRef = signal(inject(ElementRef<HTMLElement>, { self: true })).asReadonly();
  controlType = 'file';
  multi = false;

  constructor(public ngControl: NgControl) {}
}
