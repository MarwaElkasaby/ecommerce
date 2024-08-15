import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { CartService } from '../../shared/services/cartservice.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [NgFor,NgIf,CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  constructor(private _CartService:CartService){}
  cart: any[] = [];
  
  ngOnInit(): void {
    this.cart = this._CartService.getCartItems();
  }

  increaseQuantity(item: any) {
    this._CartService.increaseQuantity(item.id);
    // this.cart = this._CartService.getCartItems();
  }

  decreaseQuantity(item: any) {
    this._CartService.decreaseQuantity(item.id);
    // this.cart = this._CartService.getCartItems();
  }

  removeFromCart(item: any) {
    this._CartService.removeFromCart(item.id);
    this.cart = this._CartService.getCartItems();
  }

  emptyCart() {
    this._CartService.clearCart();
    this.cart = this._CartService.getCartItems();
  }

  calculateSubtotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
