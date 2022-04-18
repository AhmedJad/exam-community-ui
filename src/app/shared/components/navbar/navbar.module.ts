import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import {ClickOutsideModule } from 'ng-click-outside';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ClickOutsideModule,
    NgxSpinnerModule,
    RouterModule
  ],
  exports:[NavbarComponent]
})
export class NavbarModule { }
