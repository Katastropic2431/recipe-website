import { Injectable, signal, computed } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from './create-recipe/ingredients/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes = signal<Array<Recipe>>([]);
  private ingredientList: Ingredients[] = [];

  // allRecipes = (this.recipes.asReadonly());
  allRecipes = this.recipes.asReadonly();
  constructor(){
    const recipe = localStorage.getItem('recipes');

    if (recipe) {
      this.recipes.set(JSON.parse(recipe));
    }
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
    console.log('Updated ingredient list:', this.ingredientList);
    // Also remove the ingredient from all recipes' ingredients arrays
    this.recipes.update((recipes) =>
      recipes.map((recipe) => ({
      ...recipe,
      ingredients: recipe.ingredients.filter((ingredient: Ingredients) => ingredient.id !== id)
      }))
    );
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

  // remove
  removeRecipe(recipeId: string){
    this.recipes.update((recipe)=> recipe.filter((recipe)=> recipe.id !== recipeId))
    this.saveRecipes();
  }

  // edit title
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

  // edit process
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

  // print all recipes
  printAllRecipes(){
    console.log('All recipes:', this.recipes());
  }

  // save recipes
  saveRecipes(){
    localStorage.setItem('recipes', JSON.stringify(this.recipes()))
  }
}