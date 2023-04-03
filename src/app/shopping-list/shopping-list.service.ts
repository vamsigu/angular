
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model"
export class ShoppinListService{
    startedediting = new Subject<number>();
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ]

    getingredients(){
        return this.ingredients;
    }

    getingredient(index: number){
        return this.ingredients[index]
    }
    
    onaddingredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
    }

    onaddingingredients(ingredients: Ingredient[]){
        for( let ingredient of ingredients){
            this.onaddingredient(ingredient);
        }
    }

    updateingredient(index:number, newingredient: Ingredient){
        this.ingredients[index] = newingredient;
    }

    deleteingredient(index:number){
        this.ingredients.splice(index, 1);
    }
}