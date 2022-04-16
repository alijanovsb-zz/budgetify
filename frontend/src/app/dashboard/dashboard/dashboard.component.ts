import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { IAccount } from '../account/account-model';
import { AccountService } from '../account/service/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private spinnerService: SpinnerService,
    private accountService: AccountService
  ) {}
  isVisible: boolean = false;

  subscribtion!: Subscription;
  accounts!: IAccount[];

  ngOnInit(): void {
    this.spinnerService.showSpinner();

    this.subscribtion = this.accountService
      .getAccounts()
      .subscribe((accounts: IAccount[]) => {
        this.accounts = accounts;
        this.spinnerService.hideSpinner();
      });

    this.spinnerService.getSpinnerState$().subscribe((state: boolean) => {
      this.isVisible = state;
    });
  }
}
