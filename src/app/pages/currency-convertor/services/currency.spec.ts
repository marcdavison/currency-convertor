import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { API_KEY } from '../../../utils/constants';
import { ConvertResponse } from '../../../utils/interfaces';
interface AllCurrencies {
  [key: string]: {
    short_code: string;
  }
}

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpTest: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrencyService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(CurrencyService);
    httpTest = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTest.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all currencies', () => {
    const mockResponse: AllCurrencies = {
      USD: {
        short_code: 'USD',
      },
      GBP: {
        short_code: 'GBP',
      },
      EUR: {
        short_code: 'EUR',
      },
    };

    service.getAllCurrencies().subscribe(currencies => {
      expect(currencies).toEqual(Object.keys(mockResponse));
    });

    const req = httpTest.expectOne(
      `${service['baseUrl']}currencies?api_key=${API_KEY}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should convert the currency', () => {
    const mockResponse: ConvertResponse = {
      from: "USD",
      to: "GBP",
      amount: 100,
      value: 124,
    };

    const data = {
      from: "USD",
      to: "GBP",
      amount: 100,
    }

    service.convertAmount("USD", "GBP", "100").subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpTest.expectOne(
      `${service['baseUrl']}convert?api_key=${API_KEY}&from=${data.from}&to=${data.to}&amount=${data.amount}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
});