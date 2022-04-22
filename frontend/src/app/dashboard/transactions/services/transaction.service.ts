import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITransactionResModel } from '../transaction/transaction-res-model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private httpClient: HttpClient) {}
  activeCardID: string = '';

  getTransactionCategory(id: string) {
    return this.httpClient.get(
      `${environment.api}categories/getCategory/${id}`
    );
  }

  addTransaction(data: ITransactionResModel['data']) {
    if (data) {
      data.map((item) => {
        item.card = this.activeCardID;
      });
    }

    return this.httpClient.post(`${environment.api}transactions/create`, data);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // log to console

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTransactions(cardId: string): Observable<ITransactionResModel> {
    this.activeCardID = cardId;
    if (cardId === '') {
      console.log('first');
      return of({
        data: [],
        success: false,
        count: 0,
      });
    }

    return this.httpClient
      .get<ITransactionResModel>(
        `${environment.api}transactions/getTransactions/${cardId}`
      )
      .pipe(
        catchError(
          this.handleError<ITransactionResModel>('ITransactionResModel', {
            success: false,
            count: 0,
            data: [],
          })
        )
      );
  }
}
