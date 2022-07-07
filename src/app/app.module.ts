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
    path: '',
    loadChildren: () => import("./shared/layouts/guest/guest.module").then(m => m.GuestModule),
    canActivate: [GuestGuard]
  },
  {
    path: '',
    loadChildren: () => import("./shared/layouts/authenticated/authenticated.module").then(m => m.AuthenticatedModule),
    canActivate: [AuthenticatedGuard]
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
