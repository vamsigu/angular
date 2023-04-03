import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppinListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slitem: NgForm;
  subscription : Subscription;
  editmode= false;
  editeditemindex : number;
  editingredient: Ingredient;

  constructor(private slservice: ShoppinListService){}

  ngOnInit(): void {
     this.subscription=this.slservice.startedediting.subscribe((index:number) => {
      this.editeditemindex = index;
      this.editmode = true; 
      this.editingredient = this.slservice.getingredient(index);
      this.slitem.setValue({
        name: this.editingredient.name,
        amount: this.editingredient.amount
      })

    })
  }

  onadditem(form: NgForm){

    const value = form.value
    const newingredient = new Ingredient(value.name, value.amount);
    if (this.editmode){
      this.slservice.updateingredient(this.editeditemindex, newingredient)  
     } else{
      this.slservice.onaddingredient(newingredient);
     }
     this.editmode = false;
     form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onclear(){
    this.slitem.reset();
    this.editmode= false;
  }

  ondelete(){
    this.slservice.deleteingredient(this.editeditemindex);
    this.onclear();
  }

}
