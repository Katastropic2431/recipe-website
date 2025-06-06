import { type Ingredients } from './../ingredients/ingredients.model';
import { Component, inject, output, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipesService } from '../../recipes.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'
import { MatSelectModule} from '@angular/material/select';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-new-recipe',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  standalone: true,
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent implements OnInit {
  recipeTitle = input<string>('');
  recipeProcess = input<string>('');
  recipieId = input<string|null>('');
  isEditMode = input<boolean>(false);
  enteredTitle = '';
  enteredProcess = '';
  addNewRecipe = output<Recipe>();

  private recipesService = inject(RecipesService)

  ngOnInit() {
    this.enteredTitle = this.recipeTitle();
    this.enteredProcess = this.recipeProcess();
  }

  onSubmit(){
    this.addNewRecipe.emit({
      id: this.recipieId() || Date.now().toString(),
      title: this.enteredTitle,
      ingredients: this.recipesService.getIngredients(),
      process: this.enteredProcess,
      favourites: false
    });
    this.enteredTitle = ''
    this.enteredProcess = ''
  }

}
