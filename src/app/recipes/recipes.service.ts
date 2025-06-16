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
  private destoryRef = inject(DestroyRef);
  private readonly apiUrl = 'http://localhost:8000';
  private recipes = signal<Array<Recipe>>([]);
  private ingredientList: Ingredients[] = [];
  allRecipes = this.recipes.asReadonly();
  constructor(){
    this.fetchRecipe();
  }

  private fetchRecipe() {
    const subscription = this.httpClient.get<Recipe[]>(`${this.apiUrl}/recipes`).subscribe({
      next: (resData) => {
        console.log(resData);
        this.recipes.set(resData);
        console.log('Recipes fetched successfully:', this.recipes());
      }
    })
  }

  // Add ingredients to recipe
  addIngredient(ingredient: Ingredients){
    console.log('Adding ingredient:', ingredient);
    this.ingredientList.push(ingredient);
  }

  loadIngredients(id: string | null){
    if (!id) {
      console.log('No recipe ID provided to load ingredients.');
      return;
    }
    this.ingredientList = [];
    // load ingredients from specific recipe
    const recipe = this.recipes().find(recipe => recipe.id === id);
    if (recipe) {
      this.ingredientList = recipe.ingredients;
      console.log('Loaded ingredients for recipe:', recipe.title, this.ingredientList);
    }
  }

  removeIngredient(id: string){
    // Remove ingredient from the ingredientList
    console.log('Removing ingredient with id:', id);
    // Remove ingredient from the ingredientList
    this.ingredientList = this.ingredientList.filter((ingredient: Ingredients) => ingredient.id !== id);
    console.log('Updated recipes after removing ingredient:', this.recipes());
    this.saveRecipes();
  }

  getIngredients(){
    return this.ingredientList;
  }

  addRecipe(title: string, process: string){
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      title: title,
      ingredients: this.ingredientList,
      process: process,
      favourites: false
    };

    this.recipes.update((oldRecipe) => [...oldRecipe,newRecipe]);
    this.ingredientList = [];
    this.saveRecipes();
  }

  addRecipeAPI(title: string, process: string) {
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      title: title,
      ingredients: this.ingredientList,
      process: process,
      favourites: false
    };
    const prevRecipe = this.recipes();


    if (!prevRecipe.some((p) => p.id === newRecipe.id)) {
      this.recipes.set([...prevRecipe, newRecipe]);
    }

    return this.httpClient
      .put('http://localhost:3000/recipe', newRecipe)
      .pipe(
        catchError(() => {
          this.recipes.set(prevRecipe);
          return throwError(() => new Error('Failed to store selected place'));
        })
      );
  }

  // Update recipe
  updateRecipe(recipeId: string | null, title: string, process: string){
    if (!recipeId) return;
    this.recipes.update((recipe)=> recipe.map((recipe)=> {
      if (recipe.id === recipeId) {
        return {...recipe, title: title, process: process, ingredients: this.ingredientList};
      } else {
        return recipe;
      }
    }));
    this.ingredientList = [];
    this.saveRecipes();
  }

  // Add to favourites
  toggleFavourite(recipeId: string){
    this.recipes.update((recipe)=> recipe.map((recipe)=> {
      if (recipe.id === recipeId) {
      if ( recipe.favourites == true){
          return {...recipe, favourites: false}
        } else {
          return {...recipe, favourites: true}
        }
       } else {
        return recipe;
       }
    }));
    this.saveRecipes();
  }

  // Remove Recipe
  removeRecipe(recipeId: string){
    this.recipes.update((recipe)=> recipe.filter((recipe)=> recipe.id !== recipeId))
    this.saveRecipes();
  }

  // Edit title
  editRecipeTitle(recipeId: string, title: string){
    this.recipes.update((recipe)=> recipe.map((recipe)=> {
      if (recipe.id === recipeId) {
        return {...recipe, title: title}
      } else {
        return recipe;
      }
    }));
    this.saveRecipes();
  }

  // Edit Process
  editRecipeProcess(recipeId: string, process: string){
    this.recipes.update((recipe)=> recipe.map((recipe)=> {
      if (recipe.id === recipeId) {
        return {...recipe, process: process}
      } else {
        return recipe;
      }
    }));
    this.saveRecipes();
  }

  // Print All Recipe
  printAllRecipes(){
    console.log('All recipes:', this.recipes());
  }

  // Save Recipes
  saveRecipes(){
    localStorage.setItem('recipes', JSON.stringify(this.recipes()))
  }
}
