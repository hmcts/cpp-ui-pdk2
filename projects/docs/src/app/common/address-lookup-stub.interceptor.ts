import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { Address, ScoredAddress } from '@cpp/application';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const BASE_URL = '/address-lookup-service';
const LATENCY_MS = 250;

const numbered = (
  numbers: number[],
  street: string,
  town: string,
  postcode: string,
  firstUprn: number
): Address[] =>
  numbers.map((number, index) => ({
    line1: `${number} ${street}`,
    line4: town,
    postcode,
    uprn: String(firstUprn + index),
    dpa: { THOROUGHFARE_NAME: street.toUpperCase(), POST_TOWN: town.toUpperCase() }
  }));

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => from + index);

const ADDRESSES: Address[] = [
  ...numbered(range(1, 15), 'Aylward Gardens', 'Coventry', 'CV1 2AA', 100010000001),
  {
    line1: 'Flat 1',
    line2: 'Rosewood House',
    line3: '12 Market Street',
    line4: 'Coventry',
    postcode: 'CV1 2AA',
    uprn: '100010000101',
    dpa: { THOROUGHFARE_NAME: 'MARKET STREET', POST_TOWN: 'COVENTRY' }
  },
  ...numbered(range(14, 17), 'Market Street', 'Coventry', 'CV1 2AA', 100010000102),
  ...numbered(range(1, 3), 'Rowan Close', 'Leamington Spa', 'CV32 5BB', 100010000201)
];

const matches = (address: Address, term: string) =>
  [address.line1, address.line2, address.line3, address.line4, address.postcode]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .includes(term.toLowerCase());

const withoutDpa = ({ dpa: _dpa, ...address }: ScoredAddress): ScoredAddress => address;

const live = () => new URLSearchParams(location.search).has('live');

export const addressLookupStubInterceptor: HttpInterceptorFn = (request, next) => {
  if (live() || !request.url.includes(BASE_URL)) {
    return next(request);
  }

  const postcode = request.params.get('postcode');
  const address = request.params.get('address');
  const minMatch = Number(request.params.get('minMatch') ?? 0);
  const includeDpa = request.params.get('include') === 'dpa';

  let results: ScoredAddress[] = [];

  if (request.url.endsWith('/addresses/postcode')) {
    results = postcode ? ADDRESSES.filter((entry) => matches(entry, postcode)) : [];
  } else if (request.url.endsWith('/addresses/find')) {
    const found = address ? ADDRESSES.find((entry) => matches(entry, address.split(',')[0])) : null;
    const score = found ? 0.95 : 0.5;
    results = found && score >= minMatch ? [{ ...found, match: score }] : [];
  } else {
    results = address ? ADDRESSES.filter((entry) => matches(entry, address)) : [];
  }

  return of(
    new HttpResponse({
      status: 200,
      body: { results: includeDpa ? results : results.map(withoutDpa) }
    })
  ).pipe(delay(LATENCY_MS)) as Observable<HttpEvent<unknown>>;
};
