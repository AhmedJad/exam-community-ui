import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TokenService } from 'src/app/shared/services/token.service';
import { PasswordMatchValdiator } from 'src/app/shared/validators/password-match.validator';
import { AuthClientService } from '../auth-client.service';

const PASSWORD_PATTERN: any
  = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit,OnDestroy {
  form = new FormGroup({});
  submitted = false;
  invalidToken = false;
  passwordHidden = true;
  private unsubscribeAll = new Subject();
  constructor(private _title: Title,
    private _formBuilder: FormBuilder,
    private _spinner: NgxSpinnerService,
    private _authClient: AuthClientService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _token: TokenService) { }
  //Accessors
  public get password() {
    return this.form.get("password") as AbstractControl;
  }
  public get password_confirmation() {
    return this.form.get("password_confirmation") as AbstractControl;
  }
  ngOnInit(): void {
    this.form = this._formBuilder.group({
      token: [this._activatedRoute.snapshot.paramMap.get('token')],
      password: ["", [Validators.required, Validators.pattern(PASSWORD_PATTERN)]],
      password_confirmation: ['', [Validators.required]]
    }, { validator: PasswordMatchValdiator });
    this._title.setTitle("تغير كلمة السر");
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Method
  public resetPassword() {
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
    this._authClient.resetPassword(this.form.value).pipe(takeUntil(this.unsubscribeAll))
      .subscribe((response) => {
        this._token.set(response.access_token);
        this._spinner.hide();
        this._router.navigate(['home']);
      }, (error) => {
        if (error.status == 400) {
          this._spinner.hide();
          this.invalidToken = true;
        }
      })
  }
}
