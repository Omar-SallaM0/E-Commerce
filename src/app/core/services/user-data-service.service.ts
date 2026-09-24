import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";



@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  userName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(private _http:HttpClient) {}

  getCartCount(id:string): Observable<any> {
    return this._http.get(`https://dummyjson.com/carts/user/${id}`);
}
}
