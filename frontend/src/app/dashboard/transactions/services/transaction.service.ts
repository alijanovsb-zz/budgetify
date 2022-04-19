import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITransactionResModel } from '../transaction/transaction-res-model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private httpClient: HttpClient) {}

  getTransactionCategories() {}

  getTransactionCategory(id: string) {
    return this.httpClient.get(
      `${environment.api}categories/getCategory/${id}`
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // log to console

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTransactions(): Observable<ITransactionResModel> {
    return this.httpClient
      .get<ITransactionResModel>(
        `${environment.api}transactions/getTransactions`
      )
      .pipe(
        catchError(
          this.handleError<ITransactionResModel>('ITransactionResModel', {
            success: false,
            count: 0,
          })
        )
      );
  }
}
