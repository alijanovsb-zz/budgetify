import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IAccount } from '../account-model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private httpClient: HttpClient) {}

  getAccounts() {
    return this.httpClient.get<IAccount[]>(`${environment.api}cards/getCards`);
  }

  updateAccount(data: IAccount[]) {
    console.log('data: ', data);
    return this.httpClient
      .post(`${environment.api}cards/edit`, data)
      .subscribe((res) => {
        res;
      });
  }
}
