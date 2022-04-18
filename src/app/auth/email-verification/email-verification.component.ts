import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/services/token.service';
import { AuthClientService } from '../auth-client.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.scss']
})
export class EmailVerificationComponent implements OnInit, OnDestroy {
  form = new FormGroup({});
  verificationCodeValid = true;
  submitted = false;
  verificationCodeSent = false;
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _authClient: AuthClientService,
    private _router: Router,
    private _spinner: NgxSpinnerService,
    private _title:Title,
    private _token:TokenService) {
  }
  public get verification_code() {
    return this.form.get("verification_code") as AbstractControl;
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      verification_code: ['', [Validators.required]]
    });
    this._title.setTitle("تاكيد البريد الالكتروني");
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  public verifyEmail() {
    this.submitted = true;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this._spinner.show(undefined, {
      type: "ball-spin-clockwise",
      size: 'medium',
      bdColor: 'none'
    });
    this._authClient.verifyEmail(this.form.value).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this._spinner.hide();
        this._router.navigate(["exam/administration"]);
      }, (errorResponse) => {
        console.log(errorResponse)
        if (errorResponse.status == 400) {
          this.verificationCodeValid = false;
          this._spinner.hide();
        }
      })
  }
  public logout() {
    this._spinner.show(undefined, {
      type: "ball-spin-clockwise",
      size: 'medium',
      bdColor: 'none'
    });
    this._authClient.logout().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this._spinner.hide();
        this._router.navigate(["home"]);
        this._token.remove()
      });
  }
  public resendVerificationCode($event: any) {
    this.verificationCodeSent = false;
    $event.preventDefault();
    this._spinner.show(undefined, {
      type: "ball-spin-clockwise",
      size: 'medium',
      bdColor: 'none'
    });
    this._authClient.resendVerificationCode().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.verificationCodeSent = true;
        this._spinner.hide();
      })
  }
}
