import { Injectable, signal, computed } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredients } from './create-recipe/ingredients/ingredients.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipes = signal<Array<Recipe>>([]);
  private ingredientList: Ingredients[] = [];

  allRecipes = this.recipes.asReadonly();
  constructor(){
    const recipe = localStorage.getItem('recipes');
    if (recipe) {
      this.recipes.set(JSON.parse(recipe));
    }
  }

  addIngredient(ingredient: Ingredients): void {
    console.log('Adding ingredient:', ingredient);
    this.ingredientList.push(ingredient);
    console.log('Current ingredient list:', this.ingredientList);
  }

  removeIngredient(id: string): void {
    console.log('Removing ingredient with id:', id);
    console.log('ingredients before removal:', this.ingredientList);
    this.ingredientList = this.ingredientList.filter(ing => ing.id !== id);
    console.log('Updated ingredient list:', this.ingredientList);
  }

  getIngredients(): Ingredients[] {
    return [...this.ingredientList]; // return a copy
  }

  addRecipe(title: string, process: string){
    console.log(this.ingredientList)
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      title: title,
      ingredients: this.ingredientList,
      process: process,
      favourites: false
    };
    console.log('Adding new recipe:', newRecipe);
    console.log('ingredient list for new recipe:', this.ingredientList);
    this.recipes.update((oldRecipe) => [...oldRecipe,newRecipe]);
    console.log('Updated recipes:', this.recipes());
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
