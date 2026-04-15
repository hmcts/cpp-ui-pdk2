import { Component } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PdkDateInput } from '..';

describe('pdk-date-input validators', () => {
  let fixture: ComponentFixture<DateInputValidatorsTestComponent>;

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(DateInputValidatorsTestComponent);
    fixture.detectChanges();
    tick();
  }));

  const now = Date.now;
  const dayDuration = 60 * 60 * 24 * 1000;

  function mockDate() {
    Date.now = () => dayDuration * 2;
  }

  function restoreDate() {
    Date.now = now;
  }

  function toDateString(timestamp: number): string {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }

  const setValue = (elementRef, value) => {
    elementRef.nativeElement.value = value;
    elementRef.nativeElement.dispatchEvent(new Event('input'));
  };

  describe('[minDate]', () => {
    it('validates a minimum date', () => {
      fixture.componentInstance.minDate = '2017-10-10';
      fixture.detectChanges();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      const minDate = fixture.debugElement.query(By.css('[name=mindate]'));

      setValue(minDate, '2017-10-09');
      expect(form.control.hasError('minDate', ['mindate'])).toBe(true);

      setValue(minDate, '2017-10-10');
      expect(form.valid).toEqual(true);
    });
  });

  describe('[maxDate]', () => {
    it('validates a maximum date', () => {
      fixture.componentInstance.maxDate = '2017-10-10';
      fixture.detectChanges();

      const form = fixture.debugElement.children[0].injector.get(NgForm);
      const maxDate = fixture.debugElement.query(By.css('[name=maxdate]'));

      setValue(maxDate, '2017-10-11');
      expect(form.control.hasError('maxDate', ['maxdate'])).toBe(true);

      setValue(maxDate, '2017-10-10');
      expect(form.valid).toEqual(true);
    });
  });

  describe('[pastDate]', () => {
    beforeEach(mockDate);
    afterEach(restoreDate);

    it('validates a past date', () => {
      const form = fixture.debugElement.children[0].injector.get(NgForm);
      const past = fixture.debugElement.query(By.css('[name=past]'));

      setValue(past, toDateString(Date.now() + dayDuration));
      expect(form.control.hasError('pastDate', ['past'])).toBe(true);

      setValue(past, toDateString(Date.now()));
      expect(form.valid).toEqual(true);
    });
  });

  describe('[futureDate]', () => {
    beforeEach(mockDate);
    afterEach(restoreDate);

    it('validates a future date', () => {
      const form = fixture.debugElement.children[0].injector.get(NgForm);
      const future = fixture.debugElement.query(By.css('[name=future]'));

      setValue(future, toDateString(Date.now() - dayDuration));
      expect(form.control.hasError('futureDate', ['future'])).toBe(true);

      setValue(future, toDateString(Date.now()));
      expect(form.valid).toEqual(true);
    });
  });
});

@Component({
  selector: 'pdk-date-input-validators-test',
  template: `
    <form>
      <input name="mindate" ngModel [minDate]="minDate" />
      <input name="maxdate" ngModel [maxDate]="maxDate" />
      <input name="future" ngModel futureDate />
      <input name="past" ngModel pastDate />
    </form>
  `,
  imports: [FormsModule, PdkDateInput]
})
class DateInputValidatorsTestComponent {
  minDate: string;
  maxDate: string;
}
