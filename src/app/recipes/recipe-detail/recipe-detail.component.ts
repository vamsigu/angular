import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit{

   recipe: Recipe;
   id: number;
   editmode: false;

  constructor( private recipeservice: RecipeService, private route:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.route.params.subscribe((params : Params) =>{
      this.id = +params['id'];
      this.recipe = this.recipeservice.getrecipe(this.id);
    })
    
  }

  oneditrecipe(){
    this.router.navigate(['edit'], {relativeTo:this.route});
  }

  onaddtoshoppinglist(){
    this.recipeservice.onaddingtoshoppinglist(this.recipe.ingredients);

  }

  ondelete(){
    this.recipeservice.deleterecipe(this.id);
    this.router.navigate(['./recipes'])
  }

}
