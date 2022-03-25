import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { domain } from 'src/app/shared/consts/global';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor(private _httpClient: HttpClient) { }

  public signup(user: any) {
    return this._httpClient.post(`${domain}/auth/register`, user) as Observable<any>;
  }
  public verifyToken() {
    return this._httpClient.get(`${domain}/auth/verify-token`);
  }
  public login($cradentials: any) {
    return this._httpClient.post(`${domain}/auth/login`, $cradentials) as Observable<any>;
  }
  public verifyEmail($verificationCode: any) {
    return this._httpClient.post(`${domain}/auth/verify-email`, $verificationCode);
  }
  public resendVerificationCode() {
    return this._httpClient.get(`${domain}/auth/resend-verification-code`);
  }
  public userVerified() {
    return this._httpClient.get(`${domain}/auth/user-verified`);
  }
  public forgetPassword(email: string) {
    return this._httpClient.get(`${domain}/auth/forget-password/${email}`);
  }
  public resetPassword(resetPasswordInfo: string) {
    return this._httpClient.post(`${domain}/auth/reset-password`, resetPasswordInfo) as Observable<any>;
  }
  public logout() {
    return this._httpClient.get(`${domain}/auth/logout`);
  }
  public editImage(formData:any) {
    return this._httpClient.post(`${domain}/auth/edit-image`,formData) as Observable<any>;
  }
  public deleteImage() {
    return this._httpClient.delete(`${domain}/auth/delete-image`);
  }
  public getCurrentUser(){
    return this._httpClient.get(`${domain}/auth/current-user`) as Observable<any>;
  }
}
