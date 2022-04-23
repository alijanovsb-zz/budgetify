import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [CommonModule, SharedModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    // { provide: HttpClientTestingModule, useClass: HttpClientTestingModule },
  ],
  exports: [AuthFormComponent],
})
export class AuthModule {}
