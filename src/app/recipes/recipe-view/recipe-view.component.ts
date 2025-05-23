import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RecipesService } from '../recipes.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogRecipeEditTitle } from './dialog-recipe-edit-title';
import { DialogRecipeEditProcess } from './dialog-recipe-edit-process';
import {
  MatDialog,
  MatDialogModule,
  MAT_DIALOG_DATA,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
  MatDialogConfig,
} from '@angular/material/dialog';
@Component({
  selector: 'app-recipe-view',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './recipe-view.component.html',
  styleUrl: './recipe-view.component.css',
})

export class RecipeViewComponent implements OnInit {
  route = inject(ActivatedRoute);
  recipeId = '';
  dialog = inject(MatDialog) ;
  recipesService = inject(RecipesService);
  getRecipeItem = this.recipesService
    .allRecipes()
    .filter((recipe) => this.recipeId === recipe.id)[0];

  constructor() {
    this.route.params.subscribe((event) => {
      this.recipeId = event['id'];

    });
  }

  ngOnInit() {
    this.getRecipeItem = this.recipesService
      .allRecipes()
      .filter((recipe) => this.recipeId === recipe.id)[0];
  }


  openDialogEditTitle() {
    const dialogRef = this.dialog.open(DialogRecipeEditTitle, {
      data: { title: this.getRecipeItem.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog was closed: ${result}`);
      if (result !== undefined) {
        this.getRecipeItem.title = result;
        this.recipesService.editRecipeTitle(this.getRecipeItem.id, result);
      } else {
        console.log('Dialog was closed without changes');
      }
    });

  }

  openDialog(){
    const dialogRef = this.dialog.open(testingDialog, {
      data: { name: 'Angular' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogEditProcess(){
     const dialogRef = this.dialog.open(DialogRecipeEditProcess, {
      width: '800px',
      height: '800px',
      data: { process: this.getRecipeItem.process },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog was closed: ${result}`);
      if (result !== undefined) {
        this.getRecipeItem.process = result;
        this.recipesService.editRecipeProcess(this.getRecipeItem.id, result);
      } else {
        console.log('Dialog was closed without changes');
      }
    });
  }
}

@Component({
  selector: 'testing-dialog',
  templateUrl: 'testing-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class testingDialog {}
