import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  selectedrecipe: Recipe;

  constructor(private recipeservice:RecipeService){}

  ngOnInit() {
    this.recipeservice.recipeselected.subscribe((recipe:Recipe)=> {
      this.selectedrecipe = recipe;
    })
    
  }

}
