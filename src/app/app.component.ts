import { Component } from '@angular/core';
import { RouterOutlet, Routes } from '@angular/router';
import { NavBlankComponent } from "./components/nav-blank/nav-blank.component";
import { AuthLayoutComponent } from "./components/auth-layout/auth-layout.component";
import { NavAuthComponent } from "./components/nav-auth/nav-auth.component";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { HomeComponent } from './components/home/home.component';
import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBlankComponent, AuthLayoutComponent, NavAuthComponent, ReactiveFormsModule,  RouterModule,HomeComponent,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ecommerce';
  constructor(private _HttpClient: HttpClient) {}
}
