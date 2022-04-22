import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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

  @Input() actionButtonState!: boolean;
  @Output() addActionHappened: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() sortAction: EventEmitter<string> = new EventEmitter<string>();

  openDialog(type: string): void {
    let dialogRef = this.dialog.open(DialogComponent, {
      data: { type: type },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.addActionHappened.emit(result);
    });
  }

  sort(type: string): void {
    this.sortAction.emit(type);
  }

  ngOnInit(): void {}
}
