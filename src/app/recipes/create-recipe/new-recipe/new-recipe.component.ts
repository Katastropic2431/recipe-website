import { type Ingredients } from '../../ingredients.model';
import { Component, inject, output, input, OnInit, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RecipesService } from '../../recipes.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input'
import { MatSelectModule} from '@angular/material/select';
import { Recipe } from '../../recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-recipe',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  standalone: true,
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent implements OnInit {
  recipe = input<Recipe|null>(null);
  recipeId = input<string>('');
  isEditMode = input<boolean>(false);
  enteredTitle = '';
  enteredProcess = '';
  router = inject(Router);
  enteredId = '';
  addNewRecipe = output<Recipe>();

  private recipesService = inject(RecipesService)

  constructor() {
    effect(() => {
      this.enteredTitle = this.recipe()!.title;
      this.enteredProcess = this.recipe()!.process;
      this.enteredId = this.recipeId();
    });
  }

  ingredients = input<Ingredients[]>([]);
  ngOnInit() {
    this.enteredTitle = this.recipe()!.title;
    this.enteredProcess = this.recipe()!.process;
    console.log(this.recipe()!.title);
    console.log(this.recipe()!.process);
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
    this.router.navigate(['/']);
  }

}
