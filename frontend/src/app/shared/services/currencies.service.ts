import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CurrenciesService {
  constructor(private httpClient: HttpClient) {}

  getAllCurrencies() {
    return this.httpClient.get<ICurrency>(
      `${environment.api}currencies/getAllCurrencies/`
    );
  }
}

export interface ICurrency {
  count: number;
  success: boolean;
  data: {
    abbreviation: string;
    currency: string;
    symbol: string;
  }[];
}
