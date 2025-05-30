import { RecipesService } from '../recipes.service';
import { Component, inject, signal, computed } from '@angular/core';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';

@Component({
  selector: 'app-recipe-list',
  imports: [RecipeItemComponent],
  standalone: true,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent {
  private recipesService = inject(RecipesService);
  selectedFilter = signal<string>('show-all');
  showRecipesTemp = this.recipesService.allRecipes;

  onChangeFilterTemp(filter:string){
    console.log(filter);
    if (filter === 'show-favourites'){
      this.showRecipesTemp = computed(() => this.recipesService.allRecipes().filter((recipes) => recipes.favourites === true));
    } else if (filter === 'show-non-favourites'){
      this.showRecipesTemp = computed(() => this.recipesService.allRecipes().filter((recipes) => recipes.favourites === false));
    } else {
      this.showRecipesTemp = this.recipesService.allRecipes;
    }
    console.log(this.showRecipesTemp)
  }
}
