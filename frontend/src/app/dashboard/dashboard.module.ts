import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AccountComponent } from './account/account/account.component';
import { SearchTransactionComponent } from './transactions/transaction/search-transaction/search-transaction.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionComponent } from './transactions/transaction/transaction/transaction.component';
import { ActionsComponent } from './actions/actions.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AccountComponent,
    SearchTransactionComponent,
    TransactionsComponent,
    TransactionComponent,
    ActionsComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
