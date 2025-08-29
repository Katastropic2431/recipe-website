import { Component, output} from '@angular/core';
import { type Ingredients, CreateIngredientsRequest } from '../../ingredients.model';
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
  ingredient = output<Ingredients>();
  enteredIngredients = '';
  enteredUnit: 'tablespoon' | 'teaspoon' | 'cup' | 'kilogram' | 'gram' = 'tablespoon';
  enteredquantity = '';


  onAddIngredient(){
    const saveId = Date.now().toString();
    this.ingredient.emit({
      id: saveId,
      name: this.enteredIngredients,
      quantity: this.enteredquantity ? parseFloat(this.enteredquantity) : 0,
      unit: this.enteredUnit,
    });
  }
}
