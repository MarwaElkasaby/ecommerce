import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class EcomdataService {
  constructor(private _HTTPClient: HttpClient) { }

  private dataUrl = 'assets/dummy-data.json';

  getAllProducts():Observable<any[]>{
    return this._HTTPClient.get<any[]>(this.dataUrl)
  }


  getCategories(type:string): Observable<any[]> {

    return this._HTTPClient.get<any[]>(this.dataUrl).pipe(map(p=>p.filter(pp=>pp.Product_type==type)))
  }
 

  SearchBar(term:string, products:any[]) {
    return products.filter(p=>p.name.toLowerCase().includes(term.toLowerCase()))
  }

}
