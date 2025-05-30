import { Component } from '@angular/core';
import { Ingredients } from './ingredients/ingredients.model';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [IngredientsComponent, NewRecipeComponent],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent {
  ingredients: Ingredients[] = []
  onAddIngredient(ingredient: Ingredients){
    this.ingredients.push(ingredient);
  }

  onAddRecipeTest(){
    this.ingredients = [];
  }
}
