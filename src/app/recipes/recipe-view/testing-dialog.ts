import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent} from '@angular/material/dialog';

@Component({
  selector: 'testing-dialog',
  templateUrl: 'testing-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class testingDialog {}
