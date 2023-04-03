import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipeform: FormGroup;

  id: number;
  editmode = false;

  constructor(private route:ActivatedRoute, private recipeservice: RecipeService, private router:Router){}

  onaddingredient(){
    (<FormArray>this.recipeform.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onsubmit(){
    if(this.editmode){
      this.recipeservice.updaterecipe(this.id, this.recipeform.value)
    }else{
      this.recipeservice.addrecipe(this.recipeform.value)
    }
    this.oncancel();
  }

  ngOnInit(){
    this.route.params.subscribe((params:Params) => {
      this.id = +params['id'];
      this.editmode = params['id'] != null;
      this.initform();
    })
  }

  private initform(){
    let recipename ='';
    let recipeimagepath= '';
    let recipedescription = '';
    let recipeingredients = new FormArray([]);

    if(this.editmode){
      const recipe = this.recipeservice.getrecipe(this.id);
      recipename= recipe.name;
      recipeimagepath = recipe.imagepath;
      recipedescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients ){
          recipeingredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

    this.recipeform = new FormGroup({
      'name' : new FormControl(recipename, Validators.required),
      'imagepath': new FormControl(recipeimagepath, Validators.required),
      'description': new FormControl(recipedescription, Validators.required),
      'ingredients': recipeingredients
    })

  }

  oncancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }


}
