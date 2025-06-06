import { Component, OnChanges, OnInit, SimpleChanges, inject, input} from '@angular/core';
import { Ingredients } from './ingredients/ingredients.model';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { ActivatedRoute } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [IngredientsComponent, NewRecipeComponent, MatButtonModule, MatIconModule],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css'
})
export class CreateRecipeComponent implements OnInit{
  ingredients: Ingredients[] = []
  route = inject(ActivatedRoute);
  recipeId: string | null = '';
  loadTitle = ""
  loadProcess = ""
  isEditMode = false;
  private recipesService = new RecipesService();

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.recipeId;
    this.recipesService.loadIngredients(this.recipeId);
    if (this.isEditMode){
      this.loadRecipe(this.recipeId);
      console.log('Edit mode is enabled for recipe ID:', this.recipeId);
    }
  }

  onAddIngredient(ingredient: Ingredients){
    this.ingredients.push(ingredient);
  }

  onAddRecipe(){
    this.ingredients = [];
  }

  onRemoveIngredient(id: string){
    this.recipesService.removeIngredient(id);
    this.ingredients = this.ingredients.filter((ingredient) => ingredient.id !== id);
  }

  loadRecipe(recipeId: string | null) {
      const recipe = this.recipesService.allRecipes().find(r => r.id === recipeId);
      if (recipe) {
        this.ingredients = recipe.ingredients;
        this.loadTitle = recipe?.title || '';
        this.loadProcess = recipe?.process || '';
      }
      console.log('Loaded recipe:', recipe);
      console.log('Loaded title:', this.loadTitle);
      console.log('Loaded process:', this.loadProcess);
      console.log('Loaded ingredients:', this.ingredients);
  }

}
