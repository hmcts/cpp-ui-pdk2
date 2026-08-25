import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { OrdnanceSurveyPlacesService } from './ordnance-survey-places.service';
import { ADDRESS_LOOKUP_CONFIG, OsPlacesConfig } from './ordnance-survey-places.config';
import { OsDpaResult } from './address.model';

const CONFIG: OsPlacesConfig = {
  baseUrl: 'https://api.os.uk/search/places/v1',
  apiKey: 'test-key',
  dataset: 'DPA'
};

const DPA_FIXTURE: OsDpaResult = {
  UPRN: '100012345678',
  ADDRESS: '10, DOWNING STREET, LONDON, SW1A 2AA',
  BUILDING_NUMBER: '10',
  THOROUGHFARE_NAME: 'DOWNING STREET',
  DEPENDENT_LOCALITY: 'WESTMINSTER',
  POST_TOWN: 'LONDON',
  POSTCODE: 'SW1A 2AA'
};

describe('OrdnanceSurveyPlacesService', () => {
  let service: OrdnanceSurveyPlacesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdnanceSurveyPlacesService, { provide: ADDRESS_LOOKUP_CONFIG, useValue: CONFIG }]
    });

    service = TestBed.inject(OrdnanceSurveyPlacesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  const expectOne = (predicate: (req: TestRequest['request']) => boolean): TestRequest =>
    httpMock.expectOne((req) => predicate(req));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('findByPostcode', () => {
    it('issues a GET to /postcode with dataset, key and normalised postcode', () => {
      let result;
      service.findByPostcode('  sw1a   2aa ').subscribe((r) => (result = r));

      const req = expectOne((r) => r.url === `${CONFIG.baseUrl}/postcode`);
      expect(req.request.method).toBe('GET');
      expect(req.request.params.get('postcode')).toBe('SW1A 2AA');
      expect(req.request.params.get('dataset')).toBe('DPA');
      expect(req.request.params.get('key')).toBe('test-key');

      req.flush({ results: [{ DPA: DPA_FIXTURE }] });

      expect(result).toEqual([
        expect.objectContaining({
          line1: '10 DOWNING STREET',
          line2: 'WESTMINSTER',
          town: 'LONDON',
          postcode: 'SW1A 2AA',
          uprn: '100012345678'
        })
      ]);
    });

    it('returns an empty array when there are no results', () => {
      let result;
      service.findByPostcode('SW1A 2AA').subscribe((r) => (result = r));
      expectOne((r) => r.url.endsWith('/postcode')).flush({ results: [] });
      expect(result).toEqual([]);
    });
  });

  describe('find', () => {
    it('issues a GET to /find with the query', () => {
      let result;
      service.find('10 Downing').subscribe((r) => (result = r));

      const req = expectOne((r) => r.url === `${CONFIG.baseUrl}/find`);
      expect(req.request.params.get('query')).toBe('10 Downing');
      expect(req.request.params.get('dataset')).toBe('DPA');

      req.flush({ results: [{ DPA: DPA_FIXTURE }] });
      expect(result).toHaveLength(1);
    });
  });

  describe('match', () => {
    it('issues a GET to /find for a single DPA result with minmatch and carries the MATCH score', () => {
      let result;
      service.match('10 Downing Street, London, SW1A 2AA', 0.4).subscribe((r) => (result = r));

      const req = expectOne(
        (r) => r.url === `${CONFIG.baseUrl}/find` && r.params.get('minmatch') === '0.4'
      );
      expect(req.request.params.get('query')).toBe('10 Downing Street, London, SW1A 2AA');
      expect(req.request.params.get('maxresults')).toBe('1');
      expect(req.request.params.get('dataset')).toBe('DPA');

      req.flush({ results: [{ DPA: { ...DPA_FIXTURE, MATCH: 0.95 } }] });

      expect(result).toEqual([expect.objectContaining({ match: 0.95, postcode: 'SW1A 2AA' })]);
    });
  });

  describe('error handling', () => {
    it('degrades to an empty array on a 429 response', () => {
      let result;
      service.findByPostcode('SW1A 2AA').subscribe((r) => (result = r));
      expectOne((r) => r.url.endsWith('/postcode')).flush('Too Many Requests', {
        status: 429,
        statusText: 'Too Many Requests'
      });
      expect(result).toEqual([]);
    });

    it('degrades to an empty array on a network error', () => {
      let result;
      service.match('anything').subscribe((r) => (result = r));
      expectOne((r) => r.url.endsWith('/find')).error(new ProgressEvent('network error'));
      expect(result).toEqual([]);
    });
  });

  describe('config without apiKey (proxy scenario)', () => {
    it('omits the key param when apiKey is unset', () => {
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [
          OrdnanceSurveyPlacesService,
          { provide: ADDRESS_LOOKUP_CONFIG, useValue: { baseUrl: '/proxy/os', dataset: 'DPA' } }
        ]
      });
      const proxyService = TestBed.inject(OrdnanceSurveyPlacesService);
      const proxyHttp = TestBed.inject(HttpTestingController);

      proxyService.findByPostcode('SW1A 2AA').subscribe();
      const req = proxyHttp.expectOne((r) => r.url === '/proxy/os/postcode');
      expect(req.request.params.has('key')).toBe(false);
      req.flush({ results: [] });
      proxyHttp.verify();
    });
  });
});
