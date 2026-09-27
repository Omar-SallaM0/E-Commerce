import { Component, Input } from '@angular/core';
import { IProducts } from '../../../app/core/interfaces/iregister';
import { NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { DecimalPipe } from '@angular/common';
import { CartServiceService } from '../../../app/core/services/cart-service.service';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass, ButtonModule, RouterLink, MessagesModule,DecimalPipe,DataViewModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
constructor(private _cartService: CartServiceService) {}
  isAddedToCart: boolean = false;
  @Input({ required: true }) isSmallCard: boolean = false;
  @Input({ required: true }) Products!: IProducts[];
  @Input() searchKey: string = '';

  addToCart(product: IProducts) {
   this._cartService.addToCart(product);
  }
}
