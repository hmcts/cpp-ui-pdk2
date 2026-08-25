// Uses Angular HttpClient directly (not CppHttp): OS Places is an external
// third-party REST API, not a CPP backend, so the CppHttp wrapper does not apply.
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of, timeout } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Address, osDpaToAddress, OsDpaResult, ScoredAddress } from './address.model';
import { ADDRESS_LOOKUP_CONFIG } from './ordnance-survey-places.config';

interface OsPlacesResponse {
  results?: { DPA?: OsDpaResult }[];
}

const REQUEST_TIMEOUT_MS = 10_000;

@Injectable({ providedIn: 'root' })
export class OrdnanceSurveyPlacesService {
  private readonly http = inject(HttpClient);
  private readonly config = inject(ADDRESS_LOOKUP_CONFIG);

  findByPostcode(postcode: string): Observable<Address[]> {
    const params = this.baseParams().set('postcode', this.normalisePostcode(postcode));
    return this.request('/postcode', params).pipe(map((dpa) => dpa.map(osDpaToAddress)));
  }

  find(query: string): Observable<Address[]> {
    const params = this.baseParams().set('query', query);
    return this.request('/find', params).pipe(map((dpa) => dpa.map(osDpaToAddress)));
  }

  // Verification wrapper over /find: returns only the single best-ranked DPA
  // candidate with its MATCH score. minMatch floors out weak matches so a poor
  // address yields no result. (The dedicated /match API was withdrawn 2026.)
  match(query: string, minMatch = 0.7): Observable<ScoredAddress[]> {
    const params = this.baseParams()
      .set('dataset', 'DPA')
      .set('query', query)
      .set('minmatch', String(minMatch))
      .set('maxresults', '1');
    return this.request('/find', params).pipe(
      map((dpa) => dpa.map((result) => ({ ...osDpaToAddress(result), match: result.MATCH })))
    );
  }

  private request(resource: string, params: HttpParams): Observable<OsDpaResult[]> {
    return this.http.get<OsPlacesResponse>(`${this.config.baseUrl}${resource}`, { params }).pipe(
      timeout(REQUEST_TIMEOUT_MS),
      map((response) =>
        (response.results ?? [])
          .map((entry) => entry.DPA)
          .filter((dpa): dpa is OsDpaResult => !!dpa)
      ),
      // 429/timeout/other failures degrade to empty, never throw into the form.
      catchError(() => of([] as OsDpaResult[]))
    );
  }

  private baseParams(): HttpParams {
    let params = new HttpParams().set('dataset', this.config.dataset);
    if (this.config.apiKey) {
      params = params.set('key', this.config.apiKey);
    }
    return params;
  }

  private normalisePostcode(postcode: string): string {
    return (postcode ?? '').trim().replace(/\s+/g, ' ').toUpperCase();
  }
}
