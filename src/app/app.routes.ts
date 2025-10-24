import { HomeComponent } from './pages/home/home.component';
import { RecipeViewComponent } from './pages/recipe-view/recipe-view.component';
import { Routes } from '@angular/router'
import { CreateRecipeComponent } from './pages/create-recipe/create-recipe.component';


  export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'recipe-view-component/:id',
    component: RecipeViewComponent
  },
  {
    path: 'recipe-edit-component/:id',
    component: CreateRecipeComponent
  },
  {
    path: 'recipe-create',
    component: CreateRecipeComponent
  }

];
