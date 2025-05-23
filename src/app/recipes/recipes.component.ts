import { Ingredients } from './ingredients/ingredients.model';
import { Component, input } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { IngredientsComponent } from "./ingredients/ingredients.component";

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeListComponent, NewRecipeComponent, IngredientsComponent],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  ingredients: Ingredients[] = []
  onAddIngredient(ingredient: Ingredients){
    this.ingredients.push(ingredient);
  }

  onAddRecipeTest(){
    this.ingredients = [];
  }
}
