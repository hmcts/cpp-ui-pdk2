import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CppHttp, mapObjectToHttpParams } from '@cpp/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Address, ScoredAddress } from './address.model';

const BASE_URL = '/address-lookup-service';

const REQUEST_TYPES = {
  addresses: 'application/vnd.addresslookup-service.addresses+json',
  postcode: 'application/vnd.addresslookup-service.addresses-postcode+json',
  find: 'application/vnd.addresslookup-service.addresses-find+json'
};

interface AddressSearchResponse {
  results?: ScoredAddress[];
}

export function addressLookupFailureMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 400) {
      return "We couldn't search for that. Check what you've typed and try again.";
    }
    if (error.status === 503) {
      const retryAfterSeconds = error.error?.retryAfterSeconds;
      return retryAfterSeconds
        ? `Address lookup is busy. Try again in about ${retryAfterSeconds} seconds, or enter the address manually.`
        : 'Address lookup is not available at the moment. Enter the address manually.';
    }
  }
  return 'Something went wrong with address lookup. Enter the address manually.';
}

@Injectable({ providedIn: 'root' })
export class AddressLookupService {
  private readonly cppHttp = inject(CppHttp);

  findByPostcode(postcode: string): Observable<Address[]> {
    return this.search(`${BASE_URL}/addresses/postcode`, REQUEST_TYPES.postcode, {
      postcode: normalisePostcode(postcode)
    });
  }

  find(address: string): Observable<Address[]> {
    return this.search(`${BASE_URL}/addresses`, REQUEST_TYPES.addresses, { address });
  }

  match(address: string, minMatch = 0.7): Observable<ScoredAddress[]> {
    return this.search(`${BASE_URL}/addresses/find`, REQUEST_TYPES.find, { address, minMatch });
  }

  private search(
    url: string,
    requestType: string,
    params: Record<string, string | number>
  ): Observable<ScoredAddress[]> {
    return this.cppHttp
      .query<AddressSearchResponse>({
        url,
        requestType,
        params: mapObjectToHttpParams(params)
      })
      .pipe(map((response) => response?.results ?? []));
  }
}

function normalisePostcode(postcode: string): string {
  return (postcode ?? '').trim().replace(/\s+/g, ' ').toUpperCase();
}
