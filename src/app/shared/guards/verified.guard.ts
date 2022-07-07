import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthClientService } from 'src/app/guest/auth/auth-client.service';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class VerifiedGuard implements CanActivate {
  public constructor(private _token: TokenService,
    private _router: Router,
    private _authClient: AuthClientService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._authClient.userVerified().pipe(
      map(() => {
        return true;
      },
      ), catchError((error) => {
        this._router.navigate(['email-verification']);
        return of(false);
      }));
  }

}
