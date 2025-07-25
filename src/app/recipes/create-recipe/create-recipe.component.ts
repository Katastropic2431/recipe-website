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
    }
  }

}
