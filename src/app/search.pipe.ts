import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from './shared/interfaces/product';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {
transform(products:any[], term:string): any[] {
    return products.filter(p=>p.name.toLowerCase().includes(term.toLowerCase()))
  }
  

}
