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
    this.ingredientList.push(ingredient);
  }

  removeIngredient(index: number){
    this.ingredientList = this.ingredientList.filter((ingredient)=> ingredient.name)
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


  // save recipes
  saveRecipes(){
    localStorage.setItem('recipes', JSON.stringify(this.recipes()))
  }
}
