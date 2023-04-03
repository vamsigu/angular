import { EventEmitter, Injectable } from "@angular/core"
import { Recipe } from "../recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppinListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService{
    recipeselected = new EventEmitter<Recipe>();

    private recipes: Recipe[]= [
        new Recipe('A test recipe', 'This is a test recipe','https://cdn2.bigcommerce.com/n-arxsrf/uy50rek/products/2695/images/17752/recipes_raedunn__56626.1568305402.1280.1280.jpg?c=2',
        [new Ingredient('buns', 2),
        new Ingredient('meat', 1)])
      ];

    getrecipes(){
        return this.recipes
    }

    getrecipe(id: number){
        return this.recipes[id]
    }
     constructor(private slservice:ShoppinListService){}

    
    onaddingtoshoppinglist(ingredients:Ingredient[]){
        this.slservice.onaddingingredients(ingredients);
    }

    addrecipe(recipe: Recipe){
        this.recipes.push(recipe);
    }

    updaterecipe(index:number, newrecipe: Recipe){
        this.recipes[index]= newrecipe;
    }

    deleterecipe(index:number){
        this.recipes.splice(index, 1);
    }
}