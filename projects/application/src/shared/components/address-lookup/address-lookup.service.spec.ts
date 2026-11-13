import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CppHttp } from '@cpp/core';
import { expect } from '@jest/globals';
import { of, throwError } from 'rxjs';

import { addressLookupFailureMessage, AddressLookupService } from './address-lookup.service';

const CANDIDATE = {
  line1: '104 DOWNING STREET',
  line4: 'LONDON',
  postcode: 'ZZ1 1AA',
  uprn: '100012345678'
};

describe('AddressLookupService', () => {
  let service: AddressLookupService;
  let query: jest.Mock;

  beforeEach(() => {
    query = jest.fn().mockReturnValue(of({ results: [CANDIDATE] }));

    TestBed.configureTestingModule({
      providers: [AddressLookupService, { provide: CppHttp, useValue: { query } }]
    });

    service = TestBed.inject(AddressLookupService);
  });

  const optionsOf = (call = 0) => query.mock.calls[call][0];

  describe('findByPostcode', () => {
    it('queries the postcode endpoint with a normalised postcode', () => {
      let result;
      service.findByPostcode('  zz1   1aa ').subscribe((r) => (result = r));

      const options = optionsOf();
      expect(options.url).toBe('/address-lookup-service/addresses/postcode');
      expect(options.requestType).toBe(
        'application/vnd.addresslookup-service.addresses-postcode+json'
      );
      expect(options.params.get('postcode')).toBe('ZZ1 1AA');
      expect(result).toEqual([CANDIDATE]);
    });

    it('returns an empty array when the response has no results', () => {
      query.mockReturnValue(of({}));

      let result;
      service.findByPostcode('ZZ1 1AA').subscribe((r) => (result = r));
      expect(result).toEqual([]);
    });
  });

  describe('find', () => {
    it('queries the addresses endpoint with the free text address', () => {
      service.find('104 Downing').subscribe();

      const options = optionsOf();
      expect(options.url).toBe('/address-lookup-service/addresses');
      expect(options.requestType).toBe('application/vnd.addresslookup-service.addresses+json');
      expect(options.params.get('address')).toBe('104 Downing');
    });
  });

  describe('match', () => {
    it('queries the find endpoint with the address and minMatch', () => {
      service.match('104 Downing Street, London, ZZ1 1AA', 0.9).subscribe();

      const options = optionsOf();
      expect(options.url).toBe('/address-lookup-service/addresses/find');
      expect(options.requestType).toBe('application/vnd.addresslookup-service.addresses-find+json');
      expect(options.params.get('address')).toBe('104 Downing Street, London, ZZ1 1AA');
      expect(options.params.get('minMatch')).toBe('0.9');
    });

    it('carries the match score through', () => {
      query.mockReturnValue(of({ results: [{ ...CANDIDATE, match: 0.95 }] }));

      let result;
      service.match('104 Downing Street').subscribe((r) => (result = r));
      expect(result).toEqual([expect.objectContaining({ match: 0.95 })]);
    });
  });

  describe('when the lookup fails', () => {
    it('passes the failure through untouched', () => {
      const badRequest = new HttpErrorResponse({ status: 400, error: { message: 'too long' } });
      query.mockReturnValue(throwError(() => badRequest));

      let error;
      service.find('x').subscribe({ error: (e) => (error = e) });

      expect(error).toBe(badRequest);
    });
  });
});

describe('addressLookupFailureMessage', () => {
  it('asks the user to check their input on a bad request', () => {
    expect(addressLookupFailureMessage(new HttpErrorResponse({ status: 400 }))).toContain(
      "Check what you've typed"
    );
  });

  it('gives the retry delay when the service reports one', () => {
    const error = new HttpErrorResponse({
      status: 503,
      error: { degraded: true, reason: 'upstream-rate-limit', retryAfterSeconds: 30 }
    });

    expect(addressLookupFailureMessage(error)).toContain('about 30 seconds');
  });

  it('reports the lookup as unavailable when degraded without a delay', () => {
    const error = new HttpErrorResponse({
      status: 503,
      error: { degraded: true, reason: 'circuit-open' }
    });

    expect(addressLookupFailureMessage(error)).toContain('not available at the moment');
  });

  it('falls back for failures outside the contract', () => {
    expect(addressLookupFailureMessage(new HttpErrorResponse({ status: 500 }))).toContain(
      'Something went wrong'
    );
    expect(addressLookupFailureMessage(new Error('offline'))).toContain('Something went wrong');
  });
});
