import { Component } from '@angular/core';
import { CategoryServiceService } from '../../core/services/category-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  constructor(private _categoryService:CategoryServiceService){}
   allCategory: string[] = [];

ngOnInit(): void {
  this.displayAllCategory();
}

displayAllCategory() {
  this._categoryService.getAllCategory().subscribe((next) => {
    this.allCategory = next;

    console.log(this.allCategory);
    console.log(this.allCategory.length);
  });
}

   getImageCategory(type: string): string {
    return `../../../assets/${type}.jpg`;
  }
}
