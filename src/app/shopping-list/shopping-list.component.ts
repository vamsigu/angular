import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  private subscription : Subscription;

  constructor(private slservice: ShoppinListService){}

  ngOnInit(){
    this.ingredients = this.slservice.getingredients();
  }

  onedititem(index:number){
    this.slservice.startedediting.next(index);
  }

}
