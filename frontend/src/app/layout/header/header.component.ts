import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isLoggedIn!: boolean;

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  onLogout(): boolean {
    this.logout.emit();
    return false;
  }
}
