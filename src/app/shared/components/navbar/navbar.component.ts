import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthClientService } from 'src/app/auth/auth-client.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  showMenu = false;
  imagePath = "";
  private unsubscribeAll = new Subject();
  constructor(public _token: TokenService,
    private _authClient: AuthClientService,
    private _router: Router,
    private _spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this._spinner.show(undefined, {
      type: "ball-spin-clockwise",
      size: 'medium',
      bdColor: 'none'
    });
    this._authClient.getCurrentUser().pipe(takeUntil(this.unsubscribeAll))
      .subscribe((user) => {
        this._spinner.hide();
        this.imagePath = user.image;
      })
  }
  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }
  //Methods
  public logout() {
    this._spinner.show(undefined, {
      type: "ball-spin-clockwise",
      size: 'medium',
      bdColor: 'none'
    });
    this._authClient.logout().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this._spinner.hide();
        this._token.remove();
        this._router.navigate(["auth/login"]);
      });
  }
  public changeImage(event: any) {
    this._spinner.show(undefined, {
      type: "ball-spin-clockwise",
      size: 'medium',
      bdColor: 'none'
    });
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      this._authClient.editImage(formData).pipe(takeUntil(this.unsubscribeAll))
        .subscribe((response: any) => {
          this._spinner.hide();
          this.imagePath = response.image;
        }, (error) => console.log(error))
    }
  }
  public deleteImage() {
    this._spinner.show(undefined, {
      type: "ball-spin-clockwise",
      size: 'medium',
      bdColor: 'none'
    });
    this._authClient.deleteImage().pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this._spinner.hide();
        this.imagePath = "";
      }, (error) => console.log(error))
  }
}
