import { RecipesService } from '../recipes.service';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {
  recipesService = inject(RecipesService)
  route = inject(ActivatedRoute)
  recipeId = ''
  getRecipeItem: Recipe|undefined = undefined;

  constructor(){
    this.route.params.subscribe((event) => {
      this.recipeId = event['id'];
    });
  }

  ngOnInit(): void {
    this.getRecipeItem = this.recipesService.allRecipes().filter((recipe)=> recipe.id === this.recipeId)[0]
  }

}
