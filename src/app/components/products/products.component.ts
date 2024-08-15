import { Component } from '@angular/core';
import { CartService } from '../../shared/services/cartservice.service';
import { EcomdataService } from '../../shared/services/ecomdata.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { SearchPipe } from "../../search.pipe";
import { FormsModule } from '@angular/forms';
import { CommonModule, NgForOf } from '@angular/common';
import { NgFor } from '@angular/common';
import { IProduct } from '../../shared/interfaces/product';
import { NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink, SearchPipe, FormsModule, NgForOf,NgFor,CommonModule,],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  constructor(private _EcomdataService:EcomdataService,private _CartService:CartService){}

  products:any[]=[]
  product_type=['Blush','Eyeliner', 'Eyeshadow', 'Lipstick','Bronzer']
  categories:any[]=[];
  searchTerm:string='';
  notificationVisible: boolean = false;
  
  showNotification(): void {
    this.notificationVisible = true;
    setTimeout(() => {
      this.notificationVisible = false;
    }, 2000);
  }
  
    ngOnInit():void{
  
      //cart update 
      this._EcomdataService.getAllProducts().subscribe({
        next: (response) => {
          this.products = response.slice(500, 520);
        },
        error: (err) => {
          console.log(err);
        }
      });
      //all products
      this._EcomdataService.getAllProducts().subscribe(  
        data => this.products = data,
        error => console.error('Error fetching data', error))
      

    }
  
    addToCart(item: any): void {
      this.showNotification();

      this._CartService.addToCart(item);
  
      let cart = JSON.parse(localStorage.getItem('cart') || '[]');

      const existingItem = cart.find((product: any) => product.id === item.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        item.quantity = 1;
        cart.push(item);
      }
  
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
}
