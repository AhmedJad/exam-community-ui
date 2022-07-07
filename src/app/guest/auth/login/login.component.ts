import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/services/token.service';
import { AuthClientService } from '../auth-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  passwordHidden = true;
  form = new FormGroup({});
  submitted = false;
  loginFailed = false;
  private unsubscribeAll = new Subject();
  constructor(private _title: Title,
    private _formBuilder: FormBuilder,
    private _spinner: NgxSpinnerService,
    private _authClient: AuthClientService,
    private _token: TokenService,
    private _router: Router) { }
  //Accessors
  public get email() {
    return this.form.get("email") as AbstractControl;
  }
  public get password() {
    return this.form.get("password") as AbstractControl;
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      "email": ['', [Validators.required, Validators.email]],
      "password": ['', [Validators.required]]
    })
    this._title.setTitle("تسجيل الدخول");
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  public login() {
    this.loginFailed = false;
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
    this._authClient.login(this.form.value).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response) => {
        this._token.set(response.access_token);
        this._spinner.hide();
        this._router.navigate(['exam-admin']);
      }, (error) => {
        this._spinner.hide();
        this.loginFailed = true;
      })
  }
}
