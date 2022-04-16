import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService, private router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  subscription: Subscription = new Subscription();
  isVisible: boolean = false;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    this.subscription = this.authService
      .login({ email, password })
      .subscribe((data) => {
        this.router.navigate(['dashboard']);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  togglePasswordVisibility() {
    this.isVisible = !this.isVisible;
  }
}
