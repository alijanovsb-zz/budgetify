import { Component, OnInit } from '@angular/core';
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

  actionHandler(action: string): void {
    if (action === 'transaction') {
      this.spinnerService.showSpinner();
      this.subscribtion = this.getAllAccounts();
      this.subscribtion = this.getAllTransactions(this.activeAccountId);
    }
  }

  getAllTransactions(id: string) {
    return this.tranasctionService
      .getTransactions(id)
      .subscribe((transactionsResponce: ITransactionResModel) => {
        this.transactionsResponce = transactionsResponce;

        this.spinnerService.hideSpinner();
      });
  }

  setActiveAccountID(id: string): void {
    this.activeAccountId = id;
    this.getAllTransactions(id);
  }

  getAllAccounts() {
    return this.accountService
      .getAccounts()
      .subscribe((accounts: IAccount[]) => {
        this.accounts = accounts;

        this.spinnerService.hideSpinner();
      });
  }

  async updateAccountBalance(balance: IAccount['amount']): Promise<void> {
    let data: IAccount[] = [
      {
        _id: this.activeAccountId,
        amount: balance,
        owner: '',
        currency: '',
        title: '',
      },
    ];
    this.spinnerService.showSpinner();
    this.accountService.updateAccount(data);

    await this.customDelay(500);

    this.getAllAccounts();
    this.spinnerService.getSpinnerState$().subscribe((state: boolean) => {
      this.isVisible = state;
    });
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
      this.subscribtion = this.getAllAccounts();
    }

    await this.customDelay(500);

    this.subscribtion = this.getAllTransactions(this.activeAccountId);

    this.spinnerService.getSpinnerState$().subscribe((state: boolean) => {
      this.isVisible = state;
    });
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
