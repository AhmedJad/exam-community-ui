import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthClientService } from '../auth-client.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit,OnDestroy {
  form = new FormGroup({});
  submitted = false;
  emailSent = false;
  emailNotFound = false;
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _authClient: AuthClientService,
    private _spinner: NgxSpinnerService,
    private _title:Title) {
  }
  public get email() {
    return this.form.get("email") as AbstractControl;
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      "email": ['', [Validators.required, Validators.email]]
    });
    this._title.setTitle("تغير كلمة السر");
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  public forgetPassword() {
    this.submitted = true;
    this.emailSent = false;
    this.emailNotFound = false;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this._spinner.show(undefined, {
      type: "ball-spin-clockwise",
      size: 'medium',
      bdColor: 'none'
    });
    this._authClient.forgetPassword(this.email.value).pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this._spinner.hide();
        this.emailSent = true;
      }, (error) => {
        if (error.status == 404) {
          this.emailNotFound = true;
          this._spinner.hide();
        }
        console.log(error);
      })
  }
}
