import { Component, OnChanges, OnInit, SimpleChanges, inject, input} from '@angular/core';
import { Ingredients, CreateIngredientsRequest} from '../ingredients.model';
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
  recipeId: string = '';
  loadTitle = ""
  loadProcess = ""
  isEditMode = false;
  ingredients: Ingredients[] = [];
  recipe: Recipe | null = null; // Will hold the recipe fetched from the backend


  private recipesService = inject(RecipesService);


  constructor() {
    // Get recipeId from route params
    this.route.params.subscribe((params) => {
      this.recipeId = params['id'];
    });
  }
  // not implemented yet
  onRemoveIngredient(id: string){
    this.ingredients = this.ingredients.filter(ing => ing.id !== id);
    this.recipesService.removeIngredient(id);
  }

  // not implemented yet
  onAddIngredient(ingredient: Ingredients){
    this.ingredients.push(ingredient);
    this.recipesService.addIngredient(ingredient);
  }
  
  // Fetch recipe by ID from backend
  fetchRecipe() {
    this.recipesService.getRecipeById(this.recipeId).subscribe({
      next: (data) => {
        this.recipe = data;
        this.loadTitle = this.recipe.title
        this.loadProcess = this.recipe.process
        this.ingredients = this.recipe.ingredients
        console.log('loadTitle:', this.loadTitle);
        console.log('loadProcess:', this.loadProcess);
        console.log('ingredients:', this.ingredients);
      },
      error: (err) => console.error(err),
    });
  }

  ngOnInit(): void {
    this.isEditMode = !!this.recipeId;
    if (this.isEditMode){
      console.log('Edit mode is enabled for recipe ID:', this.recipeId);
    }
    this.fetchRecipe();
  }

}
