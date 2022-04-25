import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { ITransactionResModel } from './transaction/transaction-res-model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit, OnChanges {
  @Input() transactionsResponce!: ITransactionResModel;
  @Output() getTotalBalance: EventEmitter<number> = new EventEmitter<number>();

  transactions: ITransactionResModel['data'];

  constructor() {}

  hasData(): boolean {
    if (this.transactions) {
      return this.transactionsResponce.count > 0;
    }
    return false;
  }

  getBalance(transactions: ITransactionResModel['data']) {
    let balance = 0;
    if (transactions) {
      transactions.map((transaction) => {
        transaction.categories.map((category) => {
          if (category.type === 'Expense') {
            balance -= transaction.amount;
          } else {
            balance += transaction.amount;
          }
        });
      });
    }
    return balance;
  }

  ngOnInit(): void {
    if (this.transactions) {
      this.transactions = this.transactionsResponce.data;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['transactionsResponce'] &&
      changes['transactionsResponce'].previousValue !==
        changes['transactionsResponce'].currentValue &&
      !changes['transactionsResponce'].firstChange
    ) {
      this.ngOnInit();
      console.log(this.transactions);
      this.getTotalBalance.emit(this.getBalance(this.transactions));
    }
  }
}
