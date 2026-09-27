import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrlProducts } from '../apiRoot/base-url';
import path from 'node:path';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  constructor(private _httpClient : HttpClient) { }
  getAllCategory():Observable<any>{
    return this._httpClient.get(`${baseUrlProducts}/category-list`)
  }

  getSpecificCategory(typeCategory: string): Observable<any> {
    return this._httpClient.get(`${baseUrlProducts}/category/${typeCategory}`)

  }
}
