import { Component, input, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

import { RouterLink } from '@angular/router';
import { RecipesService } from './../../recipes.service';
import { Recipe } from './../../recipe.model';


@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.css'
})
export class RecipeItemComponent {
  recipe = input.required<Recipe>();

  private recipesService = inject(RecipesService)

  onRemoveRecipe(recipeId: string){
    console.log('Removing recipe with ID:', recipeId);
    this.recipesService.deleteRecipe(recipeId).subscribe({
      next: () => console.log('Recipe deleted successfully'),
      error: (err) => console.error('Error deleting recipe:', err)
    });
  }

  onToggleFavourite(recipeId: string) {
    const sub = this.recipesService.toggleFavourite(recipeId).subscribe();
  }
}
