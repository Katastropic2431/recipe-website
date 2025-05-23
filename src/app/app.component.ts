import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [MatFormFieldModule, RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gdp-angular-project';
}
