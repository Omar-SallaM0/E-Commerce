import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { IProducts } from '../interfaces/iregister';
import { baseUrl } from '../apiRoot/base-url';
import { NotifecationsService } from './notifecations.service';
@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  constructor(
    private _httpClient: HttpClient,
    private _notifecationsService: NotifecationsService
  ) {}
countOfCart: BehaviorSubject<number> = new BehaviorSubject(
    (
      JSON.parse(localStorage.getItem('cartState') ?? '[]') as IProducts[]
    ).length
  );

  addToCart(product: IProducts) {
    const storedCart = localStorage.getItem('cartState');
    const cart: IProducts[] = storedCart ? JSON.parse(storedCart) : [];

    if (!product.isAddedToCart) {
      this._notifecationsService.showSuccess('Success', 'Item added to cart');
      product.isAddedToCart = true;
      cart.push(product);
      localStorage.setItem('cartState', JSON.stringify(cart));
      this.countOfCart.next(cart.length);
    } else {
      this._notifecationsService.showError('error', 'is item is added');
    }
  }

  isAddedToCart(product: IProducts): boolean {
    const storedCart = localStorage.getItem('cartState');
    const cartState = storedCart ? JSON.parse(storedCart) : [];
    const isAdded = cartState.some((item: IProducts) => item.id === product.id);
    return isAdded;
  }

  getCartByUserId(userId: string) {
  return this._httpClient.get<any>(
    `${baseUrl}/carts/user/${userId}`
  );
}
}
