import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { Address, ScoredAddress } from '@cpp/application';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

const BASE_URL = '/address-lookup-service';
const LATENCY_MS = 250;

const numbered = (
  count: number,
  street: string,
  town: string,
  postcode: string,
  firstUprn: number
): Address[] =>
  Array.from({ length: count }, (_, index) => ({
    line1: `${index + 1} ${street}`,
    line4: town,
    postcode,
    uprn: String(firstUprn + index)
  }));

const ADDRESSES: Address[] = [
  ...numbered(15, 'Aylward Gardens', 'Coventry', 'CV1 2AA', 100010000001),
  {
    line1: 'Flat 1',
    line2: 'Rosewood House',
    line3: '12 Market Street',
    line4: 'Coventry',
    postcode: 'CV1 2AA',
    uprn: '100010000101'
  },
  ...numbered(3, 'Rowan Close', 'Leamington Spa', 'CV32 5BB', 100010000201)
];

const matches = (address: Address, term: string) =>
  [address.line1, address.line2, address.line3, address.line4, address.postcode]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .includes(term.toLowerCase());

const live = () => new URLSearchParams(location.search).has('live');

export const addressLookupStubInterceptor: HttpInterceptorFn = (request, next) => {
  if (live() || !request.url.includes(BASE_URL)) {
    return next(request);
  }

  const postcode = request.params.get('postcode');
  const address = request.params.get('address');
  const minMatch = Number(request.params.get('minMatch') ?? 0);

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

  return of(new HttpResponse({ status: 200, body: { results } })).pipe(
    delay(LATENCY_MS)
  ) as Observable<HttpEvent<unknown>>;
};
