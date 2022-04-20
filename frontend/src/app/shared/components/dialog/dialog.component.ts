import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface DialogCardData {
  user: string;
  title: string;
  description: string;
  current: string;
}

interface DialogTransitionData {
  user: string;
  card: string;
  title: string;
  categories: {}[];
  amount: number;
  date: string;
  // date: Date; date
  payee: string;
  description?: string;
  attachment?: string;
}

interface DialogData {
  type: string;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {}
}
