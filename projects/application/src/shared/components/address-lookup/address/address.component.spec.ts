import { ComponentFixture, TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';
import { of } from 'rxjs';

import { CppAddressComponent } from './address.component';
import { AddressLookupService } from '../address-lookup.service';

describe('CppAddressComponent', () => {
  let fixture: ComponentFixture<CppAddressComponent>;
  let component: CppAddressComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CppAddressComponent],
      providers: [{ provide: AddressLookupService, useValue: { match: () => of([]) } }]
    });

    fixture = TestBed.createComponent(CppAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('disabling', () => {
    it('disables a single field from the config and leaves the rest alone', () => {
      fixture.componentRef.setInput('fields', { postcode: { disabled: true } });
      fixture.detectChanges();

      expect(component.addressForm.controls.postcode.disabled).toBe(true);
      expect(component.addressForm.controls.line1.enabled).toBe(true);
    });

    it('stops a disabled field being required', () => {
      fixture.componentRef.setInput('required', true);
      fixture.componentRef.setInput('fields', { postcode: { disabled: true } });
      fixture.detectChanges();

      component.addressForm.controls.line1.setValue('104 Downing Street');

      expect(component.addressForm.controls.postcode.value).toBe('');
      expect(component.addressForm.valid).toBe(true);
    });

    it('disables everything when the form disables the control', () => {
      component.setDisabledState(true);
      fixture.detectChanges();

      expect(component.addressForm.disabled).toBe(true);
    });

    it('re-enables only what the config has not disabled', () => {
      fixture.componentRef.setInput('fields', { postcode: { disabled: true } });
      component.setDisabledState(true);
      fixture.detectChanges();

      component.setDisabledState(false);
      fixture.detectChanges();

      expect(component.addressForm.controls.line1.enabled).toBe(true);
      expect(component.addressForm.controls.postcode.disabled).toBe(true);
    });

    it('keeps a disabled field in the value it reports', () => {
      const propagated: unknown[] = [];
      component.registerOnChange((value) => propagated.push(value));

      component.writeValue({ line1: '104 Downing Street', postcode: 'ZZ1 1AA' });
      fixture.componentRef.setInput('fields', { postcode: { disabled: true } });
      fixture.detectChanges();

      component.addressForm.controls.line2.setValue('Westminster');
      fixture.detectChanges();

      expect(propagated.at(-1)).toEqual(
        expect.objectContaining({ line2: 'Westminster', postcode: 'ZZ1 1AA' })
      );
    });

    it('reports nothing when the consuming form writes a value and nobody edits', () => {
      const propagated: unknown[] = [];
      component.registerOnChange((value) => propagated.push(value));

      component.writeValue({ line1: 'No fixed abode', postcode: '' });
      fixture.detectChanges();

      expect(propagated).toEqual([]);
    });
  });

  it('resolves controlRef to the first address line input', () => {
    const ref = component.controlRef();
    const inputs = fixture.nativeElement.querySelectorAll('input');

    expect(ref).toBeDefined();
    expect(inputs.length).toBe(6);
    expect(ref.nativeElement).toBe(inputs[0]);
  });

  it('applies required only to line1 and postcode', () => {
    fixture.componentRef.setInput('required', true);
    fixture.detectChanges();

    const { line1, line2, line4, postcode } = component.addressForm.controls;
    expect(line1.hasError('required')).toBe(true);
    expect(postcode.hasError('required')).toBe(true);
    expect(line2.hasError('required')).toBe(false);
    expect(line4.hasError('required')).toBe(false);
  });

  it('applies the character limit from the fields override', () => {
    fixture.componentRef.setInput('fields', { line2: { maxChars: 5 } });
    fixture.detectChanges();

    component.addressForm.controls.line2.setValue('123456');
    expect(component.addressForm.controls.line2.hasError('maximumLength')).toBe(true);
  });

  it('overrides one error message and keeps the rest', () => {
    fixture.componentRef.setInput('fields', {
      line1: { errorMessages: { required: 'Enter the building and street' } }
    });
    fixture.detectChanges();

    const { line1, postcode } = fixture.componentInstance.fields();
    expect(line1.errorMessages.required).toBe('Enter the building and street');
    expect(line1.errorMessages.addressLine).toBe('Address line 1 contains invalid characters');
    expect(line1.label).toBe('Address line 1');
    expect(line1.labelType).toBe('small');
    expect(line1.maxChars).toBe(35);
    expect(postcode.errorMessages.postcode).toBe('Enter a valid UK postcode');
  });

  it('fills the fields from an address through writeValue', () => {
    component.writeValue({
      line1: '104 DOWNING STREET',
      line2: 'WESTMINSTER',
      line4: 'LONDON',
      postcode: 'ZZ1 1AA',
      uprn: '100012345678'
    });

    expect(component.addressForm.getRawValue()).toEqual({
      line1: '104 DOWNING STREET',
      line2: 'WESTMINSTER',
      line3: '',
      line4: 'LONDON',
      line5: '',
      postcode: 'ZZ1 1AA'
    });
  });
});
