import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchPipe } from '../../search.pipe';
import { CartService } from '../../shared/services/cartservice.service';
import { EcomdataService } from '../../shared/services/ecomdata.service';
import { NgFor } from '@angular/common';
import { NgForOf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink,SearchPipe,NgForOf,NgFor,CommonModule,FormsModule,SearchPipe],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  products: any[]=[];
  notificationVisible: boolean = false;
  category:any;


  showNotification(): void {
    this.notificationVisible = true;
    setTimeout(() => {
      this.notificationVisible = false;
    }, 2000);
  }
  
  constructor(private _ActivatedRoute: ActivatedRoute,private _EcomdataService:EcomdataService,private _CartService:CartService){}

  ngOnInit():void{

  this._ActivatedRoute.paramMap.subscribe(
    {
      next: (params) => {
        let categ= params.get('category')
        this.category=categ;
        console.log(this.category);
        this.products=[]


        this._EcomdataService.getAllProducts().subscribe({
          next: (response:any[]) => { this.products = response.filter(product =>
            product.product_type.toLowerCase() === this.category.toLowerCase())
           console.log(this.products);
          },
          error: (err:any) => {
            console.log(err);
          }
        })
      }})

  
    }
  
    addToCart(item: any): void {
      this._CartService.addToCart(item);
      this.showNotification();
  
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

