import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { baseUrlProducts } from '../apiRoot/base-url';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}
  allProducts(): Observable<any> {
    return this._httpClient.get('https://dummyjson.com/products?limit=193');
  }

  getDetails(id: string): Observable<any> {
    return this._httpClient.get(`${baseUrlProducts}/${id}`);
  }

}
