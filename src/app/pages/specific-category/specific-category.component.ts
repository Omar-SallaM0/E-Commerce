import { Component } from '@angular/core';
import { CategoryServiceService } from '../../core/services/category-service.service';
import { IProducts } from '../../core/interfaces/iregister';
import { CardComponent } from '../../../shared/cards/card/card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-specific-category',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './specific-category.component.html',
  styleUrl: './specific-category.component.scss'
})
export class SpecificCategoryComponent {
 constructor(
    private _categoryService: CategoryServiceService,
    private _activatedRoute: ActivatedRoute
  ) {}
  categoryType: string = '';
  products: IProducts[] = [];
  ngOnInit(): void {
    this.categoryType =
      this._activatedRoute.snapshot.paramMap.get('category') ?? '';
    this.getSpecificCategory(this.categoryType);
  }

  getSpecificCategory(type: string) {
    this._categoryService
      .getSpecificCategory(type)
      .subscribe((next) => (this.products = next.products));
  }
}
