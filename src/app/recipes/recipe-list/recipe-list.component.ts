import { Component, EventEmitter, Output, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit{

  @Output()recipewasselected = new EventEmitter<Recipe>();
  recipes: Recipe[];

  constructor(private recipeservice:RecipeService, private router:Router, private route: ActivatedRoute){}

  ngOnInit(){
    this.recipes = this.recipeservice.getrecipes();
  }

  onnewrecipe(){
    this.router.navigate(['new'],{relativeTo: this.route} )

  }

}
