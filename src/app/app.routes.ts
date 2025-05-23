import { RecipesComponent } from './recipes/recipes.component';
import { RecipeViewComponent } from './recipes/recipe-view/recipe-view.component';
import { Routes } from '@angular/router'
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: RecipesComponent
  },
  {
    path: 'recipe-view-component/:id',
    component: RecipeViewComponent
  },
  {
    path: 'recipe-edit-component/:id',
    component: RecipeEditComponent
  }

];
