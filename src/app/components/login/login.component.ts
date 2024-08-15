import { AuthService } from './../../shared/services/auth.service';
import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { error } from 'console';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  constructor(private _AuthService:AuthService, private _Router:Router){}
  msgError:string='';
  isLoading=false;
  
    loginForm: FormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])[A-Za-z\d]{6,10}$/)]),
    });
  
    handleForm(): void {
      console.log(this.loginForm.status);
  
      if (this.loginForm.valid) {
        this.isLoading=true;
        this._AuthService.setLogin(this.loginForm.value).subscribe(
          {
            next: (response: any) => {
              console.log(response);
              if(response.message=='success')
              {
                this.isLoading=false;
                localStorage.setItem('eToken',response.token);
                this._AuthService.saveUserData()
                //dynamic routing
                this._Router.navigate(['products'])
              }
              else {
                this.loginForm.markAllAsTouched();
              }
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              this.isLoading=false;
              this.msgError=err.error.message;
            }
          })
      }
  
    }
  }

