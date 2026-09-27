import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/products-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProducts } from '../../core/interfaces/iregister';
import { CartServiceService } from '../../core/services/cart-service.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
 constructor(
    private _activateRoute: ActivatedRoute,
    private _cartService: CartServiceService
  ) {}
  id: string = '';
  productDetails!: IProducts;
  isAddedToCart: boolean = false;
  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe(
      (next: any) => (this.id = next.params['id'])
    );
    this.displayDetails();
  }
  displayDetails(): void {
    this._activateRoute.data.subscribe((data: any) => {
      this.productDetails = {
        ...data.details.product,
        isAddedToCart: this._cartService.isAddedToCart(data.details.product),
      };
    });
  }
  addToCart(product: IProducts) {
    this._cartService.addToCart(product);
  }
}
