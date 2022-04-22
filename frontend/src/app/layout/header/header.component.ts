import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() isLoggedIn!: boolean;

  @Output() logout: EventEmitter<void> = new EventEmitter<void>();
  @Output() toggleSidebar: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router) {}
  private isMobileMenuOpen: boolean = false;

  get isOpen(): boolean {
    return this.isMobileMenuOpen;
  }

  toggle(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  getUserName(): string {
    const token = localStorage.getItem('token');

    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));

      return tokenPayload.name;
    }
    return 'N/A';
  }

  getRole(): string {
    const token = localStorage.getItem('token');

    if (token) {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));

      return tokenPayload.role;
    }
    return 'N/A';
  }

  onLogout(): boolean {
    this.logout.emit();
    return false;
  }

  currentRoute() {
    return this.router.url;
  }

  public get width() {
    return window.innerWidth;
  }
}
