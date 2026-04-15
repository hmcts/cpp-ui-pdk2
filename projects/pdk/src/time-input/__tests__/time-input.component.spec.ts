import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PdkTimeInputComponent } from '../time-input.component';

describe('pdk-time-input', () => {
  let time: FormControl;
  let form: NgForm;
  let fixture: ComponentFixture<TimeInputTestComponent>;
  let hoursInput: DebugElement;
  let minutesInput: DebugElement;

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(TimeInputTestComponent);
    fixture.componentInstance.disabled = false;
    fixture.detectChanges();
    tick();
    form = fixture.debugElement.children[0].injector.get(NgForm);
    time = form.control.get('time') as FormControl;
    hoursInput = fixture.debugElement.query(By.css('[name=timeHours]'));
    minutesInput = fixture.debugElement.query(By.css('[name=timeMinutes]'));
    minutesInput.nativeElement.focus = jest.fn();
  }));

  function setTimeValues(values: { hours?: string; minutes?: string }) {
    const { hours, minutes } = values;

    hoursInput.nativeElement.value = hours;
    minutesInput.nativeElement.value = minutes;

    hoursInput.nativeElement.dispatchEvent(new Event('input'));
    minutesInput.nativeElement.dispatchEvent(new Event('input'));
  }

  it('constructs a time string from the entered parts', () => {
    setTimeValues({ hours: '9', minutes: '03' });
    expect(time.value).toEqual('09:03');
  });

  it('populates the internal inputs when an external value is provided', fakeAsync(() => {
    fixture.componentInstance.model = '10:09';
    fixture.detectChanges();
    tick();
    expect(hoursInput.nativeElement.value).toEqual('10');
    expect(minutesInput.nativeElement.value).toEqual('09');
  }));

  it('emits `focus` and `blur` events', fakeAsync(() => {
    const focus = jest.fn();
    const blur = jest.fn();

    fixture.componentInstance.focus = focus;
    fixture.componentInstance.blur = blur;
    fixture.detectChanges();

    hoursInput.nativeElement.dispatchEvent(new Event('focus'));
    expect(focus).toHaveBeenCalledTimes(1);

    hoursInput.nativeElement.dispatchEvent(new Event('blur'));
    minutesInput.nativeElement.dispatchEvent(new Event('focus'));
    tick();
    expect(blur).toHaveBeenCalledTimes(0);
    expect(focus).toHaveBeenCalledTimes(1);

    minutesInput.nativeElement.dispatchEvent(new Event('blur'));
    tick();
    hoursInput.nativeElement.dispatchEvent(new Event('focus'));
    expect(blur).toHaveBeenCalledTimes(1);
    expect(focus).toHaveBeenCalledTimes(2);
  }));

  it('raises a `timeFormat` validation error when the time is partially complete', () => {
    expect(form.valid).toBe(true);
    setTimeValues({ hours: '9' });
    expect(form.control.hasError('timeFormat', ['time'])).toBe(true);
    setTimeValues({ minutes: '11' });
    expect(form.control.hasError('timeFormat', ['time'])).toBe(true);
    setTimeValues({ hours: '9', minutes: '1' });
    expect(form.control.hasError('timeFormat', ['time'])).toBe(true);
    setTimeValues({ hours: '9', minutes: '11' });
    expect(form.valid).toBe(true);
  });

  it('raises a `timeExists` validation error when the time is invalid', () => {
    expect(form.valid).toBe(true);
    setTimeValues({ hours: '00', minutes: '60' });
    expect(form.control.hasError('timeExists', ['time'])).toBe(true);
    setTimeValues({ hours: '24', minutes: '59' });
    expect(form.control.hasError('timeExists', ['time'])).toBe(true);
    setTimeValues({ hours: '23', minutes: '59' });
    expect(form.valid).toBe(true);
    setTimeValues({ hours: '00', minutes: '00' });
    expect(form.valid).toBe(true);
  });

  it('isolates the internal inputs from the outer form', () => {
    expect(form.control.get('timeHours')).toBeFalsy();
    expect(form.control.get('timeMinutes')).toBeFalsy();
  });

  it('applies the aria-describedby attribute to the hours input', () => {
    expect(hoursInput.nativeElement.getAttribute('aria-describedby')).toEqual('identifier');
  });

  describe('disabled state', () => {
    it('disables time input control when disabled value is true', () => {
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });

    it('enables time input control when disabled value is false', () => {
      fixture.componentInstance.disabled = false;
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });
  });
});

@Component({
  selector: 'pdk-time-input-test',
  template: `
    <form>
      <pdk-time-input
        name="time"
        (blur)="blur($event)"
        (focus)="focus($event)"
        [ngModel]="model"
        [disabled]="disabled"
        ariaDescribedBy="identifier"
      >
      </pdk-time-input>
    </form>
  `,
  imports: [PdkTimeInputComponent, FormsModule]
})
class TimeInputTestComponent {
  model: string;
  focus: Function;
  blur: Function;
  disabled: boolean;
}

let formGroup: FormGroup;

describe('reactive pdk-time-input', () => {
  let fixture: ComponentFixture<TimeInputReactiveFormTestComponent>;

  beforeEach(fakeAsync(() => {
    formGroup = new FormGroup({
      time: new FormControl()
    });

    fixture = TestBed.createComponent(TimeInputReactiveFormTestComponent);
    fixture.detectChanges();
    tick();
  }));

  describe('disabled state', () => {
    it('disables time input control when `formGroup` is disabled', () => {
      formGroup.disable();
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });

    it('enables time input control when `formGroup` is enabled', () => {
      formGroup.enable();
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });
  });
});

@Component({
  selector: 'pdk-time-input-test',
  template: `
    <form [formGroup]="formGroup">
      <pdk-time-input name="time" [formControlName]="'time'"> </pdk-time-input>
    </form>
  `,
  imports: [PdkTimeInputComponent, ReactiveFormsModule]
})
class TimeInputReactiveFormTestComponent {
  formGroup = formGroup;
}
