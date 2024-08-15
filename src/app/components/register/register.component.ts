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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

  // AuthService = inject(AuthService);

constructor(private _AuthService:AuthService, private _Router:Router){}
msgError:string='';
isLoading=false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])[A-Za-z\d]{6,10}$/)]),
    rePassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[A-Z])[A-Za-z\d]{6,10}$/)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  });

  handleForm(): void {
    console.log(this.registerForm.status);

    if (this.registerForm.valid) {
      this.isLoading=true;
      this._AuthService.setRegister(this.registerForm.value).subscribe(
        {
          next: (response: any) => {
            console.log(response);
            if(response.message=='success')
            {
              this.isLoading=false;
              //dynamic routing
              this._Router.navigate(['/login'])
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


