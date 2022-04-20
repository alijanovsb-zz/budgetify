import {
  Component,
  Input,
  OnChanges,
  OnInit,
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

  transactions: ITransactionResModel['data'];

  constructor() {}

  hasData(): boolean {
    return this.transactionsResponce.count > 0;
  }

  ngOnInit(): void {
    this.transactions = this.transactionsResponce.data;
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }
}
