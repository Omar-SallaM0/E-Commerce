import { Component } from '@angular/core';
import { ProductsService } from '../../core/services/products-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProducts } from '../../core/interfaces/iregister';
import { CartServiceService } from '../../core/services/cart-service.service';
import { DecimalPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ButtonModule,RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
constructor(
    private _activateRoute: ActivatedRoute,
    private _cartService: CartServiceService,
    private _productService : ProductsService
  ) {}
  id: string = '';
  productDetails!: IProducts;
  isAddedToCart: boolean = false;
  ngOnInit(): void {
    this._activateRoute.paramMap.subscribe((params) => {
      this.id = params.get('id') || '';

      if (this.id) {
        this.displayDetails();
      }
    });
  }

  displayDetails(): void {
    this._productService.getDetails(this.id).subscribe({
      next: (product) => {
        this.productDetails = {
          ...product,
          isAddedToCart: this._cartService.isAddedToCart(product),
        };
      },
      error: (error) => {
        console.error('Error loading product:', error);
      },
    });
  }
  addToCart(product: IProducts) {
    this._cartService.addToCart(product);
  }
}
