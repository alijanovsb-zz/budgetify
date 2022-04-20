import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IAccount } from '../account-model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  @Input() accounts!: IAccount[];
  @Output() getActiveAccountID: EventEmitter<string> =
    new EventEmitter<string>();

  noAccounts(): boolean {
    return this.accounts.length === 0;
  }

  private activeAccountIndex: number = 0;

  getActiveAccountIndex(): number {
    return this.activeAccountIndex;
  }

  setActiveAccountIndex(index: number): void {
    this.activeAccountIndex = index;
    this.getActiveAccountID.emit(this.accounts[this.activeAccountIndex]._id);
  }

  constructor() {}

  ngOnInit(): void {
    if (!this.noAccounts()) {
      this.getActiveAccountID.emit(this.accounts[this.activeAccountIndex]._id);
    }
  }
}
