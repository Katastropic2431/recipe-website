import { inject, Injectable, signal, DestroyRef } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from './create-recipe/ingredients/ingredients.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8000/api';
  private recipes = signal<Array<Recipe>>([]);
  allRecipes = this.recipes.asReadonly();
  constructor(){
    this.fetchRecipe('Failed to fetch recipes');
  }

  // api to get recipe by id
  getRecipeById(recipeId: string) {
    return this.httpClient.get<Recipe>(`${this.apiUrl}/recipes/${recipeId}`).pipe(
      catchError((error) => {
        console.error('Failed to fetch recipe:', error);
        return throwError(() => new Error('Failed to fetch recipe'));
      })
    );
  }

  // api to toggle favourite status of a recipe
  toggleFavourite(recipeId: string) {
    const currentRecipes = [...this.recipes()];
    const recipe = currentRecipes.find((r) => r.id === recipeId);

    if (!recipe) return throwError(() => new Error('Recipe not found'));

    const updatedRecipe = { ...recipe, favourites: !recipe.favourites };
    this.recipes.update((recipes) =>
      recipes.map((r) => (r.id === recipeId ? updatedRecipe : r))
    );

    return this.httpClient.put(`${this.apiUrl}/recipes`, null, {
      params: { id: recipeId }
    }).pipe(
      catchError((error) => {
        console.error('Failed to toggle favourite:', error);
        // Revert local state if API fails
        this.recipes.set(currentRecipes);
        return throwError(() => new Error('Failed to toggle favourite'));
      })
    );
  }

  updateRecipe(recipeId: string, title: string, process: string) {
    return this.httpClient
      .put(`${this.apiUrl}/recipes/${recipeId}`, { title, process })
      .pipe(
        catchError((error) => {
          console.error('Failed to update recipe:', error);
          return throwError(() => new Error('Failed to update recipe'));
        })
      );
  }
  
  private fetchRecipe(errorMessage: string) {
    const subscription = this.httpClient.get<Recipe[]>(`${this.apiUrl}/recipes`).subscribe({
      next: (resData) => {
        console.log(resData);
        this.recipes.set(resData);
      },
      error: (error) => {
        console.log(error);
        return throwError(() => new Error(errorMessage));
      }
    })
  }
}
