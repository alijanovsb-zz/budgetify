import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { IAccount } from '../account/account-model';
import { AccountService } from '../account/service/account.service';
import { TransactionService } from '../transactions/services/transaction.service';
import { ITransactionResModel } from '../transactions/transaction/transaction-res-model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private spinnerService: SpinnerService,
    private accountService: AccountService,
    private tranasctionService: TransactionService
  ) {}
  isVisible: boolean = false;

  subscribtion!: Subscription;
  accounts!: IAccount[];
  transactionsResponce!: ITransactionResModel;

  @Input()
  ngOnInit() {
    this.spinnerService.showSpinner();

    this.subscribtion = this.accountService
      .getAccounts()
      .subscribe((accounts: IAccount[]) => {
        this.accounts = accounts;
        this.spinnerService.hideSpinner();
      });

    // await this.getTransactions();
    this.subscribtion = this.tranasctionService
      .getTransactions()
      .subscribe((transactionsResponce: ITransactionResModel) => {
        this.transactionsResponce = transactionsResponce;

        this.spinnerService.hideSpinner();
      });

    this.spinnerService.getSpinnerState$().subscribe((state: boolean) => {
      this.isVisible = state;
    });
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
