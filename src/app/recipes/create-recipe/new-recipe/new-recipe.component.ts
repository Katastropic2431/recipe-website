import { type Ingredients } from '../../ingredients.model';
import { Component, inject, output, input, OnInit, effect } from '@angular/core';
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
  recipeId = input<string>('');
  isEditMode = input<boolean>(false);
  enteredTitle = '';
  enteredProcess = '';
  enteredId = '';
  addNewRecipe = output<Recipe>();

  private recipesService = inject(RecipesService)

  constructor() {
    effect(() => {
      this.enteredTitle = this.recipeTitle();
      this.enteredProcess = this.recipeProcess();
      this.enteredId = this.recipeId();
      console.log('Entered Title:', this.enteredTitle);
      console.log('Entered Process:', this.enteredProcess);
      console.log('Entered ID:', this.enteredId);
    });
  }

  ingredients = input<Ingredients[]>([]);
  ngOnInit() {
    this.enteredTitle = this.recipeTitle();
    this.enteredProcess = this.recipeProcess();
    console.log(this.recipeTitle());
    console.log(this.recipeProcess());
  }

  onSubmit() {
    if (this.isEditMode()) {
      if (this.enteredId === '') {
        console.error('Recipe ID is required for updating');
        return;
      }
      this.recipesService.updateRecipe(this.enteredId, this.enteredTitle, this.enteredProcess)
        .subscribe({
          next: (updatedRecipe) => console.log('Recipe updated:', updatedRecipe),
          error: (err) => console.error(err)
        });
    } else {
      this.recipesService.createRecipe(this.enteredTitle, this.enteredProcess)
        .subscribe({
          next: (newRecipe) => console.log('Recipe created:', newRecipe),
          error: (err) => console.error(err)
        });
    }
  }

}
