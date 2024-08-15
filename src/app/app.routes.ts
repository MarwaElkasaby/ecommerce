import { HomeComponent } from './components/home/home.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { RouterLink } from '@angular/router';

export const routes: Routes = [   
    {
    path:'home', component:HomeComponent,
    },
    {path:'',redirectTo:'home', pathMatch:'full'},

{path:'',canActivate:[authGuard] ,component:BlankLayoutComponent, children:
    [
        // {path:'home', component:HomeComponent},
        {path:'cart', component:CartComponent},
        {path:'categories/:category', component:CategoriesComponent},
        {path:'products', component:ProductsComponent},
        {path:'details/:id', component:DetailsComponent},
    ]
},
{path:'',component:AuthLayoutComponent,children:
    [
        {path:'login',component:LoginComponent},
        {path:'register', component:RegisterComponent}
    ]
},
{path:'**',component:NotfoundComponent},

];
