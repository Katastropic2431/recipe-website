import { RecipeItemComponent } from '../recipe-list/recipe-item/recipe-item.component';
import { RecipesService } from '../recipes.service';
import { Ingredients } from './ingredients.model';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent {
  ingredientsList = input<Array<Ingredients>>()
  private recipeService = inject(RecipesService);


}
