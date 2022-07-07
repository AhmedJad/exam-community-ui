import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AuthClientService } from '../auth-client.service';
import { takeUntil } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/services/token.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PasswordMatchValdiator } from 'src/app/shared/validators/password-match.validator';

const PASSWORD_PATTERN: any
  = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit, OnDestroy {
  form = new FormGroup({});
  passwordHidden = true;
  submitted = false;
  emailExist = false;
  private unsubscribeAll = new Subject();
  constructor(private _formBuilder: FormBuilder,
    private _authClient: AuthClientService,
    private _token: TokenService,
    private _spinner: NgxSpinnerService,
    private _title: Title,
    private _router: Router) {
  }
  //Accessors
  public get first_name() {
    return this.form.get("first_name") as AbstractControl;
  }
  public get last_name() {
    return this.form.get("last_name") as AbstractControl;
  }
  public get email() {
    return this.form.get("email") as AbstractControl;
  }
  public get password() {
    return this.form.get("password") as AbstractControl;
  }
  public get password_confirmation() {
    return this.form.get("password_confirmation") as AbstractControl;
  }
  //Component lifecycle hook
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      password_confirmation: ['', [Validators.required]]
    }, { validator: PasswordMatchValdiator });
    this._title.setTitle("تسجيل حساب جديد");
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  public register() {
    this.emailExist = false;
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
    this._authClient.signup(this.form.value).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response) => {
        this._token.set(response.access_token);
        this._spinner.hide();
        this._router.navigate(['email-verification']);
      }, (errorResponse) => {
        console.log(errorResponse)
        this._spinner.hide();
        this.emailExist = errorResponse.error.errors.email as boolean;
      })
  }
  //Commons
}
