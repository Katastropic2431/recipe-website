import { Injectable, signal, computed } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from './create-recipe/ingredients/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes = signal<Recipe[]>([]);
  private ingredientList = signal<Ingredients[]>([]);

  readonly allRecipes = this.recipes.asReadonly();
  readonly ingredients = this.ingredientList.asReadonly();

  constructor() {
    const saved = localStorage.getItem('recipes');
    if (saved) {
      this.recipes.set(JSON.parse(saved));
    }
  }

  /** INGREDIENT METHODS **/

  addIngredient(ingredient: Ingredients): void {
    console.log('Adding ingredient:', ingredient);
    this.ingredientList.update((list) => [...list, ingredient]);
  }

  removeIngredient(ingredientId: string): void {
    console.log('Removing ingredient with id:', ingredientId);
    this.ingredientList.update((list) =>
      list.filter((i) => i.id !== ingredientId)
    );

    this.recipes.update((recipes) =>
      recipes.map((r) => ({
        ...r,
        ingredients: r.ingredients.filter((i) => i.id !== ingredientId)
      }))
    );

    this.saveRecipes();
  }

  loadIngredients(recipeId: string | null): void {
    if (!recipeId) return;
    const recipe = this.recipes().find((r) => r.id === recipeId);
    this.ingredientList.set(recipe?.ingredients || []);
  }

  clearIngredients(): void {
    this.ingredientList.set([]);
  }

  /** RECIPE METHODS **/

  addRecipe(title: string, process: string): void {
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      title,
      process,
      ingredients: this.ingredientList(),
      favourites: false
    };

    this.recipes.update((prev) => [...prev, newRecipe]);
    this.clearIngredients();
    this.saveRecipes();
  }

  updateRecipe(recipeId: string, title: string, process: string): void {
    this.recipes.update((recipes) =>
      recipes.map((r) =>
        r.id === recipeId
          ? { ...r, title, process, ingredients: this.ingredientList() }
          : r
      )
    );

    this.clearIngredients();
    this.saveRecipes();
  }

  removeRecipe(recipeId: string): void {
    this.recipes.update((recipes) =>
      recipes.filter((r) => r.id !== recipeId)
    );
    this.saveRecipes();
  }

  toggleFavourite(recipeId: string): void {
    this.recipes.update((recipes) =>
      recipes.map((r) =>
        r.id === recipeId
          ? { ...r, favourites: !r.favourites }
          : r
      )
    );
    this.saveRecipes();
  }

  editRecipeTitle(recipeId: string, title: string): void {
    this.recipes.update((recipes) =>
      recipes.map((r) =>
        r.id === recipeId ? { ...r, title } : r
      )
    );
    this.saveRecipes();
  }

  editRecipeProcess(recipeId: string, process: string): void {
    this.recipes.update((recipes) =>
      recipes.map((r) =>
        r.id === recipeId ? { ...r, process } : r
      )
    );
    this.saveRecipes();
  }

  printAllRecipes(): void {
    console.log('All recipes:', this.recipes());
  }

  private saveRecipes(): void {
    localStorage.setItem('recipes', JSON.stringify(this.recipes()));
  }
}
