import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AllCurrencies, Currency, ConvertResponse } from '../../../utils/interfaces';
import { API_KEY } from '../../../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private baseUrl = '/v1/';
  private http = inject(HttpClient);

  public getAllCurrencies() {
    return this.http.get<AllCurrencies>(`${this.baseUrl}currencies?api_key=${API_KEY}`).pipe(
      map(res => {
        const arr = Object.values(res);
        return arr.map(item => (item as Currency).short_code);
      })
    );
  }

  public convertAmount(from: string, to: string, amount: string) {
    return this.http.get<ConvertResponse>(`${this.baseUrl}convert?api_key=${API_KEY}&from=${from}&to=${to}&amount=${amount}`);
  }
}
