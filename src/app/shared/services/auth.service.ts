import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient, private _Router:Router) { }

  userData: any;

  setRegister(userData: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, userData)
  }

  setLogin(userData: object): Observable<any> {
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, userData)
  }

  saveUserData() {
    if (localStorage.getItem('eToken') != null) {
      let encodeToken: any = localStorage.getItem('eToken');
      let decodeToken = jwtDecode(encodeToken)
      this.userData = decodeToken;
      console.log(decodeToken);
    }
  }

  logOut():void{
    this._Router.navigate(['/login']);

    localStorage.removeItem('eToken');
  }

}
