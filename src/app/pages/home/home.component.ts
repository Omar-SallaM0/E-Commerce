import { UserDataService } from './../../core/services/user-data-service.service';
import { Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { IProducts } from '../../core/interfaces/iregister';
import { CardComponent } from '../../../shared/cards/card/card.component';
import { DataViewModule } from 'primeng/dataview';
import { ProductsService } from '../../core/services/products-service.service';
import { CartServiceService } from '../../core/services/cart-service.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleriaModule, CardComponent,DataViewModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private cart:CartServiceService,
    private _products:ProductsService
  ){}
  images: any[] | undefined;
  smallCardProducts !:IProducts[]
  popularProducts !:IProducts[]

    ngOnInit() {
      this.getAllProducts();

            this.images = [
              {
    itemImageSrc: '../../../assets/product-1.jpg',
    thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 1'
},{
    itemImageSrc: '../../../assets/product-2.jpg',
    thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 2'
},{
    itemImageSrc: '../../../assets/product-3.jpg',
    thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 3'
},{
    itemImageSrc: '../../../assets/product-4.jpg',
    thumbnailImageSrc: 'https://primeng.org/images/galleria/galleria1s.jpg',
    alt: 'Description for Image 1',
    title: 'Title 4'
},
]
    };

 getAllProducts(): void {
  this._products.allProducts().subscribe((response: any) => {
    const products: IProducts[] = response.products;

    const shuffledProducts = this.shuffleProducts(products);

    this.smallCardProducts = shuffledProducts.slice(0, 4);

    this.popularProducts = shuffledProducts.map((product) => ({
      ...product,
      isAddedToCart: this.cart.isAddedToCart(product) || false,
      }));
    });
  }

  shuffleProducts(products: any[]): any[] {
    return [...products].sort(() => Math.random() - 0.5);
  }
}


