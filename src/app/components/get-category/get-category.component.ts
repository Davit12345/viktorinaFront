import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {Router} from "@angular/router";

@Component({
  selector: 'get-category',
  templateUrl: './get-category.component.html',
  styleUrls: ['./get-category.component.scss'],
})
export class GetCategoryComponent  implements OnInit {

  @Output() categoryID: EventEmitter<any> = new EventEmitter();
  items: any[] = [];

  constructor(private _categoriesService: CategoriesService,private router:Router) {
    this.getCategories()
  }

  chooseCategoryId(id: number) {
    // const dataToSend = {categories:[id]};
    // this.router.navigate(['tabs/game', JSON.stringify(dataToSend)]);
    this.categoryID.emit(id)
  }

  getCategories() {

    this._categoriesService.getCategories({})
      .subscribe(
        res => {
          this.items = res
        }
      );
  }

  ngOnInit() {

  }

}
