import { Component, Input, OnInit } from '@angular/core';
import { ITransactionResModel } from './transaction/transaction-res-model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  @Input() transactionsResponce!: ITransactionResModel;

  transactions: ITransactionResModel['data'];

  constructor() {}

  hasData(): boolean {
    return this.transactionsResponce.count > 0;
  }

  ngOnInit(): void {
    this.transactions = this.transactionsResponce.data;
    console.log('this.transactions: ', this.transactions);
  }
}
