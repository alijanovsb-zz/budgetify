import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private dialog: MatDialog
  ) {
    this.matIconRegistry.addSvgIcon(
      'piggy',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/images/piggy.svg'
      )
    );
  }

  openDialog(type: string): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { type: type },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Result: ', result);
    });
  }

  ngOnInit(): void {}
}
