import { Component } from '@angular/core';
import { CartServiceService } from '../../core/services/cart-service.service';
import { ProductsService } from '../../core/services/products-service.service';
import { IProducts } from '../../core/interfaces/iregister';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CardComponent } from '../../../shared/cards/card/card.component';
import { SearchNamePipe } from '../../core/pipes/searchName.pipe';;
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [InputIconModule,
    IconFieldModule,
    InputTextModule,
    FormsModule,
    CardComponent,
  SearchNamePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  constructor(
    private _productsService: ProductsService,
    private _cart: CartServiceService
  ) {}
  allProducts: IProducts[] = [];
  searchKey: string = '';

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(): void {
    this._productsService.allProducts().subscribe((response: any) => {
      this.allProducts = response.products.map((product: IProducts) => {
        return {
          ...product,
          isAddedToCart: this._cart.isAddedToCart(product) || false,
        };
      });
    });
  }
}
