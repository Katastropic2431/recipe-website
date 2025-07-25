import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { NgFor, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-view',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    NgFor,
    MatStepperModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.css',
})
export class RecipeViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dialog = inject(MatDialog);
  private recipesService = inject(RecipesService);

  recipeId = '';
  recipe: Recipe | null = null; // Will hold the recipe fetched from the backend

  constructor() {
    // Get recipeId from route params
    this.route.params.subscribe((params) => {
      this.recipeId = params['id'];
    });
  }

  ngOnInit() {
    this.fetchRecipe();
  }

  // Fetch recipe by ID from backend
  private fetchRecipe() {
    this.recipesService.getRecipeById(this.recipeId).subscribe({
      next: (data) => {
        this.recipe = data;
        console.log('Fetched recipe:', data);
      },
      error: (err) => console.error(err),
    });
  }

  public get processSteps(): string[] {
    return this.recipe?.process
      .split('\n')
      .map((s) => s.replace(/^\d+\.\s*/, ''))
      .filter(Boolean) || [];
  }
}
