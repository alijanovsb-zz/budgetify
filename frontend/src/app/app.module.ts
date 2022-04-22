import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { DashboardModule } from './dashboard/dashboard.module';
import { LayoutModule } from './layout/layout.module';
import { CategoriesComponent } from './categories/categories.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ObligatoryComponent } from './obligatory/obligatory.component';
import { AdminComponent } from './admin/admin.component';
import { LeftComponent } from './categories/left/left.component';
import { RightComponent } from './categories/right/right.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    StatisticsComponent,
    SubscriptionsComponent,
    ObligatoryComponent,
    AdminComponent,
    LeftComponent,
    RightComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    LayoutModule,
    DashboardModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
