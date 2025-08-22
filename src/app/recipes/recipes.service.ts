import { inject, Injectable, signal, DestroyRef, Signal } from '@angular/core';
import { Recipe, createRecipeRequest } from './recipe.model';
import { Ingredients } from './ingredients.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private readonly httpClient = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8000/api';
  private recipes = signal<Array<Recipe>>([]);
  allRecipes = this.recipes.asReadonly();
  private ingredientList = signal<Ingredients[]>([]);
  allIngredients = this.ingredientList.asReadonly();

  constructor() {
    this.fetchRecipe('Failed to fetch recipes');
  }

  // api to get recipe by id
  getRecipeById(recipeId: string) {
    return this.httpClient
      .get<Recipe>(`${this.apiUrl}/recipes/${recipeId}`)
      .pipe(
        tap((recipe) => {
          this.ingredientList.set([]);
          this.ingredientList.set(recipe.ingredients);
        }),
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

    return this.httpClient
      .put(`${this.apiUrl}/recipes`, null, {
        params: { id: recipeId },
      })
      .pipe(
        tap(() => this.fetchRecipe('Failed to fetch recipes after creation')),
        catchError((error) => {
          console.error('Failed to toggle favourite:', error);
          // Revert local state if API fails
          this.recipes.set(currentRecipes);
          return throwError(() => new Error('Failed to toggle favourite'));
        })
      );
  }

  // api to create recipe with ingredients
  createRecipe(title: string, process: string) {
    const recipePayload = {
      title: title,
      process: process,
      favourites: false,
      ingredients: this.ingredientList(),
    };

    console.log(
      'Submitting recipePayload:',
      JSON.stringify(recipePayload, null, 2)
    );

    return this.httpClient
      .post<Recipe>(
        `${this.apiUrl}/recipes/recipe-with-ingredient`,
        recipePayload
      )
      .pipe(
        tap(() => this.fetchRecipe('Failed to fetch recipes after creation')),
        tap(() => this.clearIngredients()),
        catchError((error) => {
          console.error('Failed to create recipe:', error);
          return throwError(() => new Error('Failed to create recipe'));
        })
      );
  }

  // api to update recipe with ingredients
  updateRecipe(recipeId: string, title: string, process: string) {
    const recipePayload = {
      title: title,
      process: process,
      favourites: false,
      ingredients: this.ingredientList(),
    };

    console.log(
      'Submitting recipePayload:',
      JSON.stringify(recipePayload, null, 2)
    );

    return this.httpClient
      .put<Recipe>(`${this.apiUrl}/recipes/${recipeId}`, recipePayload)
      .pipe(
        tap(() => this.fetchRecipe('Failed to fetch recipes after creation')),
        tap(() => this.clearIngredients()),
        catchError((error) => {
          console.error('Failed to update recipe:', error);
          return throwError(() => new Error('Failed to update recipe'));
        })
      );
  }

  addIngredient(ingredient: Ingredients) {
    this.ingredientList.update((current) => {
      if (current.some((i) => i.id === ingredient.id)) return current; // skip dup
      return [...current, ingredient];
    });
  }

  removeIngredient(id: string) {
    // Remove ingredient from the ingredientList
    console.log('Removing ingredient with id:', id);
    // Remove ingredient from the ingredientList
    this.ingredientList.update((currentIngredients) =>
      currentIngredients.filter(
        (ingredient: Ingredients) => ingredient.id !== id
      )
    );
  }

  clearIngredients() {
    console.log('Clearing all ingredients');
    this.ingredientList.set([]);
  }

  deleteRecipe(recipeId: string) {
    console.log('Deleting recipe with ID:', recipeId);
    return this.httpClient.delete(`${this.apiUrl}/recipes/${recipeId}`).pipe(
      tap(() => {
        this.fetchRecipe('Failed to fetch recipes after deletion');
      }),
      catchError((error) => {
        console.error('Failed to delete recipe:', error);
        return throwError(() => new Error('Failed to delete recipe'));
      })
    );
  }

  private fetchRecipe(errorMessage: string) {
    const subscription = this.httpClient
      .get<Recipe[]>(`${this.apiUrl}/recipes`)
      .subscribe({
        next: (resData) => {
          console.log(resData);
          this.recipes.set(resData);
        },
        error: (error) => {
          console.log(error);
          return throwError(() => new Error(errorMessage));
        },
      });
  }
}
