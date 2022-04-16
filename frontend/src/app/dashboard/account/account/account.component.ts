import { Component, Input, OnInit } from '@angular/core';
import { IAccount } from '../account-model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @Input() accounts!: IAccount[];

  noAccounts(): boolean {
    return this.accounts.length === 0;
  }

  private activeAccountIndex: number = 0;

  getActiveAccountIndex(): number {
    return this.activeAccountIndex;
  }

  setActiveAccountIndex(index: number): void {
    this.activeAccountIndex = index;
  }

  constructor() {}

  ngOnInit(): void {
    console.log(this.accounts);
  }
}
