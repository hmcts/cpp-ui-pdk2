import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { expect } from '@jest/globals';
import { of } from 'rxjs';

import { CppAddressAutosuggestComponent } from './address-autosuggest.component';
import { AddressLookupService } from '../address-lookup.service';
import { Address } from '../address.model';

@Component({
  template: `<cpp-address-autosuggest [formControl]="control" />`,
  imports: [ReactiveFormsModule, CppAddressAutosuggestComponent]
})
class TestHostComponent {
  readonly control = new FormControl<Address | null>(null);
}

const onStreet = (count: number, street: string, postcode: string): Address[] =>
  Array.from({ length: count }, (_, index) => ({
    line1: `${index + 1} ${street}`,
    line4: 'Testville',
    postcode,
    uprn: `${postcode}${street}${index}`.replace(/\s/g, ''),
    dpa: { THOROUGHFARE_NAME: street.toUpperCase(), POST_TOWN: 'TESTVILLE' }
  }));

describe('CppAddressAutosuggestComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;
  let addresses: Address[];

  beforeEach(() => {
    addresses = [];
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [{ provide: AddressLookupService, useValue: { find: () => of(addresses) } }]
    });

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  const input = (): HTMLInputElement => fixture.nativeElement.querySelector('input');
  const suggestions = (): HTMLElement[] =>
    Array.from(fixture.nativeElement.querySelectorAll('.cpp-address-autosuggest__suggestion'));
  const suggestionText = () =>
    suggestions().map((suggestion) =>
      Array.from(suggestion.querySelectorAll('[pdk-typography]'), (line) =>
        line.textContent?.trim()
      ).join(' / ')
    );
  const isBackToAllResults = (suggestion: HTMLElement) =>
    !!suggestion.querySelector('[pdk-back-link]');

  const type = (text: string) => {
    input().value = text;
    input().dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(200);
    fixture.detectChanges();
  };

  const press = (key: string) => {
    input().dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    fixture.detectChanges();
  };

  const click = (suggestion: HTMLElement) => {
    suggestion.click();
    fixture.detectChanges();
  };

  it('shows a group with a caret and single addresses without one', fakeAsync(() => {
    addresses = [...onStreet(4, 'Test Street', 'ZZ1 1AA'), ...onStreet(1, 'Mock Lane', 'ZZ2 2BB')];
    type('Test');

    expect(suggestionText()).toEqual([
      'ZZ1 1AA / TEST STREET, TESTVILLE - 4 addresses',
      '1 Mock Lane / Testville, ZZ2 2BB'
    ]);
    expect(
      suggestions().map(
        (suggestion) => !!suggestion.querySelector('.cpp-address-autosuggest__caret')
      )
    ).toEqual([true, false]);
  }));

  it('highlights the typed text in the title or the subtitle', fakeAsync(() => {
    addresses = onStreet(1, 'Test Street', 'ZZ1 1AA');

    type('test');
    expect(suggestions()[0].querySelector('b')?.textContent).toBe('Test');

    type('zz1');
    const highlighted = Array.from(suggestions()[0].querySelectorAll('b'), (b) => b.textContent);
    expect(highlighted).toEqual(['', 'ZZ1']);
  }));

  it('lists the addresses directly when they all share one location', fakeAsync(() => {
    addresses = onStreet(4, 'Test Street', 'ZZ1 1AA');
    type('Test');

    expect(suggestionText()).toEqual([
      '1 Test Street / Testville, ZZ1 1AA',
      '2 Test Street / Testville, ZZ1 1AA',
      '3 Test Street / Testville, ZZ1 1AA',
      '4 Test Street / Testville, ZZ1 1AA'
    ]);
  }));

  describe('opening a group', () => {
    const allResults = [
      'ZZ1 1AA / TEST STREET, TESTVILLE - 4 addresses',
      '1 Mock Lane / Testville, ZZ2 2BB'
    ];

    beforeEach(fakeAsync(() => {
      addresses = [
        ...onStreet(4, 'Test Street', 'ZZ1 1AA'),
        ...onStreet(1, 'Mock Lane', 'ZZ2 2BB')
      ];
      type('Test');
    }));

    it('lists its addresses under a way back when clicked, selecting nothing', fakeAsync(() => {
      click(suggestions()[0]);

      expect(isBackToAllResults(suggestions()[0])).toBe(true);
      expect(suggestions().length).toBe(5);
      expect(host.control.value).toBeNull();
      expect(input().value).toBe('Test');
    }));

    it('lists its addresses when picked with Enter, selecting nothing', fakeAsync(() => {
      press('Enter');

      expect(isBackToAllResults(suggestions()[0])).toBe(true);
      expect(suggestions().length).toBe(5);
      expect(host.control.value).toBeNull();
    }));

    it('reports the address picked from it', fakeAsync(() => {
      click(suggestions()[0]);
      click(suggestions()[2]);

      expect(host.control.value).toBe(addresses[1]);
    }));

    it('goes back to all results when the way back is clicked', fakeAsync(() => {
      click(suggestions()[0]);
      click(suggestions()[0]);

      expect(suggestionText()).toEqual(allResults);
      expect(host.control.value).toBeNull();
    }));

    it('goes back to all results when Enter is pressed on the way back', fakeAsync(() => {
      press('Enter');
      press('Enter');

      expect(suggestionText()).toEqual(allResults);
    }));

    it('goes back to all results on Escape', fakeAsync(() => {
      press('Enter');
      press('Escape');

      expect(suggestionText()).toEqual(allResults);
    }));

    it('goes back to all results when the user types again', fakeAsync(() => {
      click(suggestions()[0]);
      type('Test S');

      expect(suggestionText()).toEqual(allResults);
    }));
  });
});
