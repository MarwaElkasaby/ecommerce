import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  
   cartCount = new BehaviorSubject<number>(0);
  
  cartCount$ = this.cartCount.asObservable();


  constructor() {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItems = savedCart;
    this.updateCartCount();
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      item.quantity = 1;
      this.cartItems.push(item);
    }
    this.saveCart();
  }

  increaseQuantity(itemId: string) {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item) {
      item.quantity++;
      this.saveCart();
    }
  }

  decreaseQuantity(itemId: string) {
    const item = this.cartItems.find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      item.quantity--;
      this.saveCart();
    }
  }

  removeFromCart(itemId: string) {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  getCartItems() {
    return [...this.cartItems];
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
    this.updateCartCount();
  }

  private updateCartCount() {
    this.cartCount.next(this.cartItems.reduce((count, item) => count + item.quantity, 0));
  }
}
