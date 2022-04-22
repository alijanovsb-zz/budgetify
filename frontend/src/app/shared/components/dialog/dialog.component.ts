import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TransactionService } from 'src/app/dashboard/transactions/services/transaction.service';
import { CategoryService, ICategory } from '../../services/category.service';
import { CurrenciesService } from '../../services/currencies.service';
import { ICurrency } from '../../services/currencies.service';

interface DialogData {
  type: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private currenciesService: CurrenciesService,
    private categoryService: CategoryService,
    private transactionService: TransactionService
  ) {}

  formType: string = this.data.type;
  subsctiption!: Subscription;
  currencies!: ICurrency['data'];
  categoriesList!: ICategory['data'];
  selected: string = 'Income';
  isSelectDisabled: boolean = true;
  responce: boolean = false;

  title = new FormControl('', [Validators.required]);
  amount = new FormControl(0, [Validators.required, Validators.min(0)]);
  transcationType = new FormControl('', Validators.required);
  date = new FormControl('', [Validators.required]);
  payee = new FormControl('', [Validators.required, Validators.minLength(3)]);
  categories = new FormControl('', [Validators.required]);
  description = new FormControl('');
  attachment = new FormControl('');

  ngOnInit(): void {
    this.subsctiption = this.currenciesService
      .getAllCurrencies()
      .subscribe((currencies: ICurrency) => {
        this.currencies = currencies['data'];
      });

    this.categoryService
      .getCategories('Income')
      .subscribe((categories: ICategory) => {
        this.categoriesList = categories['data'];
      });
  }

  onSelectChange(selectValue: any): void {
    this.selected = selectValue;
    this.isSelectDisabled = false;

    this.categoryService
      .getCategories(selectValue)
      .subscribe((categories: ICategory) => {
        this.categoriesList = categories['data'];
      });
  }

  onAdd(type: string) {
    if (type === 'transaction') {
      // const transactionData = {
      //   title: this.title.value,
      //   amount: this.amount.value,
      //   transcationType: this.transcationType.value,
      //   date: this.date.value,
      //   payee: this.payee.value,
      //   categories: this.categories.value,
      //   description: this.description.value,
      //   attachment: this.attachment.value,
      //   card: '',
      //   user: '',
      // };
      const transactionData = [
        {
          title: this.title.value,
          amount: this.amount.value,
          transcationType: this.transcationType.value,
          date: this.date.value,
          payee: this.payee.value,
          categories: this.categories.value,
          description: this.description.value,
          attachment: this.attachment.value,
          card: '',
          user: '',
        },
      ];
      this.subsctiption = this.transactionService
        .addTransaction(transactionData)
        .subscribe((res) => {
          console.log(res);
        });
    }
  }
}
