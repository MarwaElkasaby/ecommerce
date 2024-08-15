import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcomdataService } from '../../shared/services/ecomdata.service';
import { validateHeaderName } from 'http';
import { CartService } from '../../shared/services/cartservice.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink,  FormsModule,CommonModule,],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  constructor(private _ActivatedRoute: ActivatedRoute, private _EcomdataService: EcomdataService,private _CartService:CartService) { }
  productDetailsID: any;
  products: any;
Product:any;
notificationVisible: boolean = false;

  ngOnInit() {

    this._ActivatedRoute.paramMap.subscribe(
      {
        next: (params) => {

          let idProduct: any= params.get('id')
          this.productDetailsID=idProduct
         
        }
      }
    )


    this._EcomdataService.getAllProducts().subscribe({
      next: (response:any[]) => {
        this.products = response
       console.log(this.products);

       this.Product=this.products.find((p: { id: any; })=>p.id==this.productDetailsID);
       console.log(this.Product);
      },
      error: (err:any) => {
        console.log(err);
      }
    })

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

  showNotification(): void {
    this.notificationVisible = true;
    setTimeout(() => {
      this.notificationVisible = false;
    }, 2000);
  }
}
