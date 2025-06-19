import { Component, OnChanges, OnInit, SimpleChanges, inject, input} from '@angular/core';
import { Ingredients } from './ingredients/ingredients.model';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [IngredientsComponent, NewRecipeComponent, MatButtonModule, MatIconModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent implements OnInit{
  route = inject(ActivatedRoute);
  recipeId: string | null = '';
  loadTitle = ""
  loadProcess = ""
  isEditMode = false;
  ingredients: Ingredients[] = [];
  // Using a service to manage recipes
  // This allows us to share state across components
  private recipesService = inject(RecipesService);

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.recipeId;
    this.ingredients = []
    if (this.isEditMode){
      console.log('Edit mode is enabled for recipe ID:', this.recipeId);
      this.loadRecipe(this.recipeId);
    }
  }

  onAddIngredient(ingredient: Ingredients){
    this.ingredients.push(ingredient);
    this.recipesService.addIngredient(ingredient);
  }

  onAddRecipe(recipe: Recipe){
    if (this.isEditMode) {
      this.recipesService.updateRecipe(this.recipeId, recipe.title, recipe.process);
      console.log('Recipe updated:', recipe);
      this.ingredients = [];
      return;
    }
    console.log('Adding new recipe:', recipe);
    this.recipesService.addRecipeAPI(recipe.title, recipe.process);
    this.ingredients = [];
  }

  onRemoveIngredient(id: string){
    this.ingredients = this.ingredients.filter(ing => ing.id !== id);
    this.recipesService.removeIngredient(id);
  }

  loadRecipe(recipeId: string | null) {
      const recipe = this.recipesService.allRecipes().find(r => r.id === recipeId);
      if (recipe) {
        // load ingredients into service
        this.recipesService.loadIngredients(recipeId);
        this.ingredients = recipe.ingredients;
        this.loadTitle = recipe?.title || '';
        this.loadProcess = recipe?.process || '';
      }
  }

}
