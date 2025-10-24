import { Ingredients } from '../../interfaces/ingredients.model';
import { Component, input } from '@angular/core';
import { RecipeListComponent } from '../../component/recipe-list/recipe-list.component';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RecipeListComponent, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
