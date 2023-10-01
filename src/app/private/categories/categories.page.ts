import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  items: any[] = [];// Create an array of 16 items

  constructor(private _categoriesService: CategoriesService,private router:Router) {
  }

  openGame(id: number) {
    const dataToSend = {categories:[id]};
    this.router.navigate(['tabs/game', JSON.stringify(dataToSend)]);
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
    this.getCategories()
  }

}
