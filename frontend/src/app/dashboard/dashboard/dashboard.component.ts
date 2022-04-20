import { Component, OnChanges, OnInit, ChangeDetectorRef } from '@angular/core';
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

  activeAccountId: string = '';
  getActiveAccountID(id: string): void {
    this.activeAccountId = id;
    this.ngOnInit();
  }

  customDelay(time: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  async ngOnInit(): Promise<void> {
    this.spinnerService.showSpinner();

    if (this.activeAccountId === '') {
      this.subscribtion = this.accountService
        .getAccounts()
        .subscribe((accounts: IAccount[]) => {
          this.accounts = accounts;
        });
    }

    console.log(this.activeAccountId);

    await this.customDelay(500);

    // await this.getTransactions();
    this.subscribtion = this.tranasctionService
      .getTransactions(this.activeAccountId)
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
