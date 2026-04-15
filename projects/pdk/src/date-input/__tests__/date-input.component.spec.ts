import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PdkDateInput } from '..';

describe('pdk-date-input', () => {
  let date: FormControl;
  let form: NgForm;
  let fixture: ComponentFixture<DateInputTestComponent>;
  let dayInput: DebugElement;
  let monthInput: DebugElement;
  let yearInput: DebugElement;

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(DateInputTestComponent);
    fixture.detectChanges();
    tick();
    form = fixture.debugElement.children[0].injector.get(NgForm);
    date = form.control.get('date') as FormControl;
    dayInput = fixture.debugElement.query(By.css('[name=dateDay]'));
    monthInput = fixture.debugElement.query(By.css('[name=dateMonth]'));
    yearInput = fixture.debugElement.query(By.css('[name=dateYear]'));
  }));

  function setDateValues(values: { day?: string; month?: string; year?: string }) {
    const { day, month, year } = values;

    dayInput.nativeElement.value = day;
    dayInput.nativeElement.dispatchEvent(new Event('input'));
    monthInput.nativeElement.value = month;
    monthInput.nativeElement.dispatchEvent(new Event('input'));
    yearInput.nativeElement.value = year;
    yearInput.nativeElement.dispatchEvent(new Event('input'));
  }

  it('should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('should construct a date string from the entered parts', () => {
    setDateValues({ day: '9', month: '3', year: '2017' });
    expect(date.value).toEqual('2017-03-09');
  });

  it('should prevent the input of non-numeric characters', () => {
    setDateValues({ day: 'A', month: 'B', year: 'C' });

    expect(dayInput.nativeElement.value).toEqual('');
    expect(monthInput.nativeElement.value).toEqual('');
    expect(yearInput.nativeElement.value).toEqual('');
  });

  it('should limit the number of digits that can be entered into each input', () => {
    setDateValues({ day: '100', month: '100', year: '10000' });

    expect(dayInput.nativeElement.value).toEqual('10');
    expect(monthInput.nativeElement.value).toEqual('10');
    expect(yearInput.nativeElement.value).toEqual('1000');
  });

  it('should populate the internal inputs when an external value is provided', fakeAsync(() => {
    fixture.componentInstance.model = '2017-09-10';
    fixture.detectChanges();
    tick();
    expect(dayInput.nativeElement.value).toEqual('10');
    expect(monthInput.nativeElement.value).toEqual('09');
    expect(yearInput.nativeElement.value).toEqual('2017');
  }));

  it('should emit `focus` and `blur` events', fakeAsync(() => {
    const focus = jest.fn();
    const blur = jest.fn();

    fixture.componentInstance.focus = focus;
    fixture.componentInstance.blur = blur;
    fixture.detectChanges();

    dayInput.nativeElement.dispatchEvent(new Event('focus'));
    expect(focus).toHaveBeenCalledTimes(1);

    dayInput.nativeElement.dispatchEvent(new Event('blur'));
    monthInput.nativeElement.dispatchEvent(new Event('focus'));
    tick();
    expect(blur).toHaveBeenCalledTimes(0);
    expect(focus).toHaveBeenCalledTimes(1);

    monthInput.nativeElement.dispatchEvent(new Event('blur'));
    tick();
    dayInput.nativeElement.dispatchEvent(new Event('focus'));
    expect(blur).toHaveBeenCalledTimes(1);
    expect(focus).toHaveBeenCalledTimes(2);
  }));

  it('should raise a `dateFormat` validation error when the date is partially complete', () => {
    expect(form.valid).toBe(true);
    setDateValues({ day: '9' });
    expect(form.control.hasError('dateFormat', ['date'])).toBe(true);
    setDateValues({ month: '9' });
    expect(form.control.hasError('dateFormat', ['date'])).toBe(true);
    setDateValues({ year: '2017' });
    setDateValues({ day: '9', month: '9' });
    expect(form.control.hasError('dateFormat', ['date'])).toBe(true);
    setDateValues({ day: '9', year: '2017' });
    expect(form.control.hasError('dateFormat', ['date'])).toBe(true);
    setDateValues({ month: '9', year: '2017' });
    expect(form.control.hasError('dateFormat', ['date'])).toBe(true);
    setDateValues({ day: '9', month: '9', year: '2017' });
    expect(form.valid).toBe(true);
  });

  it('should raise a `dateExists` validation error when the date is invalid', () => {
    expect(form.valid).toBe(true);
    setDateValues({ day: '29', month: '2', year: '2017' });
    expect(form.control.hasError('dateExists', ['date'])).toBe(true);
    setDateValues({ day: '31', month: '4', year: '2016' });
    expect(form.control.hasError('dateExists', ['date'])).toBe(true);
    setDateValues({ day: '29', month: '2', year: '2016' });
    expect(form.valid).toBe(true);
  });

  it('should isolate the internal inputs from the outer form', () => {
    expect(form.control.get('dateDay')).toBeFalsy();
    expect(form.control.get('dateMonth')).toBeFalsy();
    expect(form.control.get('dateYear')).toBeFalsy();
  });

  it('should apply the `aria-describedby` attribute to the day input', () => {
    expect(dayInput.nativeElement.getAttribute('aria-describedby')).toEqual('identifier');
  });

  it('should raise a `dateFormat` validation when date is not in universal format YYYY-MM-DD', () => {
    expect(form.valid).toBe(true);

    setDateValues({ day: '01', month: '07', year: '81' });
    expect(form.control.hasError('dateFormat', ['date'])).toBe(true);

    setDateValues({ day: '9', month: '9', year: '2' });
    expect(form.control.hasError('dateFormat', ['date'])).toBe(true);

    setDateValues({ day: '9', month: '9', year: '201' });
    expect(form.control.hasError('dateFormat', ['date'])).toBe(true);

    setDateValues({ day: '9', month: '9', year: '20' });
    expect(form.control.hasError('dateFormat', ['date'])).toBe(true);

    setDateValues({ day: '29', month: '2', year: '2016' });
    expect(form.valid).toBe(true);
  });
});

@Component({
  selector: 'pdk-date-input-test',
  template: `
    <form>
      <pdk-date-input
        name="date"
        (blur)="blur($event)"
        (focus)="focus($event)"
        [ngModel]="model"
        ariaDescribedBy="identifier"
      >
      </pdk-date-input>
    </form>
  `,
  imports: [PdkDateInput, FormsModule]
})
class DateInputTestComponent {
  model: string;
  blur: Function;
  focus: Function;
}
