import { Recipe } from '../recipe.model';
import { Component, inject, ChangeDetectionStrategy} from '@angular/core';
import { MatFormField, MatError, MatHint } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'dialog-recipe-edit-title',
  templateUrl: 'dialog-recipe-edit-title.html',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatButtonModule, MatFormField, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,  MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DialogRecipeEditTitle {
  readonly dialogRef = inject(MatDialogRef<DialogRecipeEditTitle>);
  data = inject<{title: string}>(MAT_DIALOG_DATA);
  dataTitle = this.data.title.toString();

  constructor() {
      console.log(this.data)
    }

  onSubmit(): void {
    this.dialogRef.beforeClosed().subscribe(() => this.dialogRef.close(this.dataTitle));
  }
}
