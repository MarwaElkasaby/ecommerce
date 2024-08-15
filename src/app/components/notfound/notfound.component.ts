import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css'
})
export class NotfoundComponent {
constructor(private _Router:Router)
{
  
}

navigateBack():void{
  this._Router.navigate(['/home'])
}
}
