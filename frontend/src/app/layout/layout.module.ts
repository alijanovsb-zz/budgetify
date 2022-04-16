import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { SharedModule } from '../shared/shared.module';
import { CustomCardComponent } from './custom-card/custom-card.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, MenuComponent, CustomCardComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, FooterComponent, MenuComponent],
})
export class LayoutModule {}
