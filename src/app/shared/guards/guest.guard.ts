import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthClientService } from 'src/app/auth/auth-client.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  public constructor(private _token: TokenService,
    private _router: Router,
    private _authClient: AuthClientService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._token.get()) {
      return of(true);
    }
      return this._authClient.verifyToken().pipe(
        map(() => {
          this._router.navigate(['exam/administration']);
          return false;
        },
        ), catchError((error) => {
          return of(true);
        }));
  }
}
