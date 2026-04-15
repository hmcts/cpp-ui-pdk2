import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PdkCurrencyInputComponent } from '../currency-input.component';

describe('pdk-currency-input', () => {
  let form: NgForm;
  let fixture: ComponentFixture<CurrencyInputTestComponent>;
  let input: DebugElement;

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(CurrencyInputTestComponent);
    fixture.detectChanges();
    tick();
    form = fixture.debugElement.children[0].injector.get(NgForm);
    input = fixture.debugElement.query(By.css('input'));
  }));

  function setValue(value: string) {
    input.nativeElement.value = value;
    input.nativeElement.dispatchEvent(new Event('input'));
  }

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should interface with the outer `ngModel`', fakeAsync(() => {
    // string input
    fixture.componentInstance.model = '0.99';
    fixture.detectChanges();
    tick();
    expect(input.nativeElement.value).toEqual('0.99');
    // number input
    fixture.componentInstance.model = 1.0;
    fixture.detectChanges();
    tick();
    expect(input.nativeElement.value).toEqual('1');
    // zero input
    fixture.componentInstance.model = 0;
    fixture.detectChanges();
    tick();
    expect(input.nativeElement.value).toEqual('0');
    // outgoing value
    setValue('1.00');
    expect(fixture.componentInstance.change).toHaveBeenCalledWith(1);
    setValue('');
    expect(fixture.componentInstance.change).toHaveBeenCalledWith(undefined);
    setValue('0');
    expect(fixture.componentInstance.change).toHaveBeenCalledWith(0);
  }));

  it('should propagate `focus` and `blur` events', () => {
    input.nativeElement.dispatchEvent(new Event('focus'));
    expect(fixture.componentInstance.focus).toHaveBeenCalled();
    input.nativeElement.dispatchEvent(new Event('blur'));
    expect(fixture.componentInstance.blur).toHaveBeenCalled();
  });

  it('should disable the input', () => {
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });

  it('should raise a `currencyFormat` validation error when the currency is invalid', fakeAsync(() => {
    expect(form.valid).toBe(true);
    setValue('1.');
    fixture.detectChanges();
    tick();
    expect(form.control.hasError('currencyFormat', ['currency'])).toBe(true);
    setValue('1.0');
    expect(form.control.hasError('currencyFormat', ['currency'])).toBe(true);
    setValue('1.000');
    expect(form.control.hasError('currencyFormat', ['currency'])).toBe(true);
    setValue('1');
    expect(form.valid).toBe(true);
    setValue('1.00');
    expect(form.valid).toBe(true);
    setValue('0');
    expect(form.valid).toBe(true);
  }));

  it('should raise a `min` validation error when the currency is below a minimum value', () => {
    fixture.componentInstance.min = '1.99';
    fixture.detectChanges();
    setValue('1.98');
    expect(form.control.hasError('currencyMin', ['currency'])).toBe(true);
    setValue('1.99');
    expect(form.valid).toBe(true);
  });

  it('should raise a `max` validation error when the currency is below a minimum value', () => {
    fixture.componentInstance.max = '1.99';
    fixture.detectChanges();
    setValue('2.00');
    expect(form.control.hasError('currencyMax', ['currency'])).toBe(true);
    setValue('1.99');
    expect(form.valid).toBe(true);
  });
});

@Component({
  selector: 'pdk-currency-input-test',
  template: `
    <form>
      <pdk-currency-input
        name="currency"
        [min]="min"
        [max]="max"
        (blur)="blur($event)"
        (focus)="focus($event)"
        [ngModel]="model"
        [disabled]="disabled"
        (ngModelChange)="change($event)"
        aria-describedby="identifier"
      >
      </pdk-currency-input>
    </form>
  `,
  imports: [PdkCurrencyInputComponent, FormsModule]
})
class CurrencyInputTestComponent {
  min: string;
  max: string;
  model: number | string;
  disabled = false;
  change = jest.fn();
  focus = jest.fn();
  blur = jest.fn();
}

let formGroup: FormGroup;

describe('reactive pdk-currency-input', () => {
  let fixture: ComponentFixture<CurrencyInputReactiveFormTestComponent>;

  beforeEach(() => {
    formGroup = new FormGroup({
      currency: new FormControl()
    });

    fixture = TestBed.createComponent(CurrencyInputReactiveFormTestComponent);
    fixture.detectChanges();
  });

  describe('disabled state', () => {
    it('disables currency input control when `formGroup` is disabled', () => {
      formGroup.disable();
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });

    it('enables currency input control when `formGroup` is enabled', () => {
      formGroup.enable();
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });
  });
});

@Component({
  selector: 'pdk-currency-input-test',
  template: `
    <form [formGroup]="formGroup">
      <pdk-currency-input name="currency" [formControlName]="'currency'"> </pdk-currency-input>
    </form>
  `,
  imports: [PdkCurrencyInputComponent, ReactiveFormsModule]
})
class CurrencyInputReactiveFormTestComponent {
  formGroup = formGroup;
}
