import { RecipeItemComponent } from '../../recipe-list/recipe-item/recipe-item.component';
import { RecipesService } from '../../recipes.service';
import { Component, inject, input, output} from '@angular/core';
import { type Ingredients } from './../ingredients/ingredients.model';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'
import { MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-ingredients',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent {
  ingredientsList = input<Array<Ingredients>>()
  private recipesService = inject(RecipesService);
  ingredient = output<Ingredients>();

  // BLAH
  enteredIngredients = '';
  enteredProcess = '';
  enteredUnit: 'tablespoon' | 'teaspoon' | 'cup' | 'kilogram' | 'gram' = 'tablespoon';
  enteredQuanity = '';

  onSubmit(){

  }

  onAddIngredient(){
    const saveId = Date.now().toString();
    this.ingredient.emit({
      id: saveId,
      name: this.enteredIngredients,
      quanity: this.enteredQuanity,
      unit: this.enteredUnit,
    });
    this.recipesService.addIngredient({
      id: saveId,
      name: this.enteredIngredients,
      quanity: this.enteredQuanity,
      unit:this.enteredUnit,
    });
  }
}
