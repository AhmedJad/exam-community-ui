import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthenticatedGuard } from './shared/guards/authenticated.guard';
import { GuestGuard } from './shared/guards/guest.guard';
import { VerifiedGuard } from './shared/guards/verified.guard';
import { TokenInterceptorService } from './shared/services/token-interceptor.service';

const routes: Routes = [
  {
    path: 'auth/signup',
    loadChildren: () => import("./auth/signup/signup.module").then(m => m.SignupModule),
    canActivate: [GuestGuard]
  },
  {
    path: 'auth/login',
    loadChildren: () => import("./auth/login/login.module").then(m => m.LoginModule),
    canActivate: [GuestGuard]
  },
  {
    path: 'auth/verify-email',
    loadChildren: () => import("./auth/email-verification/email-verification.module")
      .then(m => m.EmailVerificationModule),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'auth/forget-password',
    loadChildren: () => import("./auth/forget-password/forget-password.module")
      .then(m => m.ForgetPasswordModule),
    canActivate: [GuestGuard]
  },
  {
    path: 'auth/reset-password/:token',
    loadChildren: () => import("./auth/reset-password/reset-password.module")
      .then(m => m.ResetPasswordModule),
    canActivate: [GuestGuard]
  },
  {
    path: 'home',
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule),
    canActivate: [AuthenticatedGuard, VerifiedGuard]
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [
    AuthenticatedGuard,
    VerifiedGuard,
    GuestGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
