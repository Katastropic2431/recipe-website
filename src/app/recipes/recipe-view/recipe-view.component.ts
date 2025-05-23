import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipesService } from '../recipes.service';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-recipe-view',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.css'
})
export class RecipeViewComponent implements OnInit{
  route = inject(ActivatedRoute);
  recipeId = ''
  recipesService = inject(RecipesService);
  getRecipeItem = this.recipesService.allRecipes().filter((recipe)=>this.recipeId===recipe.id)[0];

  constructor(){
    this.route.params.subscribe((event) => {
      this.recipeId = event['id'];
    });
  }

  ngOnInit() {
    this.getRecipeItem = this.recipesService.allRecipes().filter((recipe)=>this.recipeId===recipe.id)[0];
  }
}
