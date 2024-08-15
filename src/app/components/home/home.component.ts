import { Component, EventEmitter, Output } from '@angular/core';
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
import { CartService } from '../../shared/services/cartservice.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,  FormsModule, NgForOf,NgFor,CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {

}



