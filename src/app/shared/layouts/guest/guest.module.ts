import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestComponent } from './guest.component';
import { LoginComponent } from 'src/app/guest/auth/login/login.component';
import { SignupComponent } from 'src/app/guest/auth/signup/signup.component';
import { ForgetPasswordComponent } from 'src/app/guest/auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from 'src/app/guest/auth/reset-password/reset-password.component';
import { HomeComponent } from 'src/app/guest/home/home.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ReactiveFormsModule } from '@angular/forms';

let routes = [
  {
    path: "", component: GuestComponent,
    children: [
      { path: "login", component: LoginComponent },
      { path: "signup", component: SignupComponent },
      { path: "forget-password", component: ForgetPasswordComponent },
      { path: "reset-password/:token", component: ResetPasswordComponent },
      { path: "home", component: HomeComponent }
    ]
  }
]


@NgModule({
  declarations: [
    GuestComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxSpinnerModule,
    ReactiveFormsModule
  ]
})
export class GuestModule { }
