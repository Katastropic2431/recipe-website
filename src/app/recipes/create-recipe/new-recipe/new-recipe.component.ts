import { type Ingredients } from './../ingredients/ingredients.model';
import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipesService } from '../../recipes.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'
import { MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-new-recipe',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  standalone: true,
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent {
  enteredTitle = '';
  enteredIngredients = '';
  enteredProcess = '';
  enteredUnit: 'tablespoon' | 'teaspoon' | 'cup' | 'kilogram' | 'gram' = 'tablespoon';
  enteredQuanity = '';
  addNewRecipe = output<void>();

  private recipesService = inject(RecipesService)

  onSubmit(){
    this.recipesService.addRecipe(this.enteredTitle, this.enteredProcess);
    this.enteredTitle = ''
    this.enteredIngredients = ''
    this.enteredProcess = ''
    this.addNewRecipe.emit();
  }

}
