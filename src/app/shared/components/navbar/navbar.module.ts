import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {ClickOutsideModule } from 'ng-click-outside';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ClickOutsideModule,
    NgxSpinnerModule
  ],
  exports:[NavbarComponent]
})
export class NavbarModule { }
