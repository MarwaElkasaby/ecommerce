import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { RouterLink } from '@angular/router';
import { CartService } from '../../shared/services/cartservice.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, NgClass ],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css'
})
export class NavBlankComponent {
  cartItemCount: number = 0;

  constructor(private _AuthService: AuthService, private _CartService: CartService) {}

  ngOnInit(): void {
     this.updateCartItemCount();
    this._CartService.cartCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }

  logOutUser(): void {
    this._AuthService.logOut();
  }

  updateCartItemCount(): void {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItemCount = cart.reduce((total: number, item: any) => total + item.quantity, 0);
  }


  activeCategory: string = '';

setActiveCategory(category: string) {
  this.activeCategory = category;
}

 }
