import { Component, Input, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { ITransactionResModel } from '../transaction-res-model';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss'],
})
export class TransactionComponent implements OnInit {
  @Input() transactions!: any;

  constructor(private transactionService: TransactionService) {}

  getCategory(category: string) {
    return this.transactionService.getTransactionCategory(category);
  }

  ngOnInit(): void {}
}
