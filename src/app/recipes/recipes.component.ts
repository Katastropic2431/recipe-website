import { Ingredients } from './create-recipe/ingredients/ingredients.model';
import { Component, input } from '@angular/core';
import { RecipeListComponent } from './recipe-list/recipe-list.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [RecipeListComponent, MatIconModule, MatButtonModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
}
