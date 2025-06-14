import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from './Material/material.imports';
import { LandingPageComponent } from './Components/Home/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    MATERIAL_IMPORTS, 
    LandingPageComponent
  ]
})
export class AppComponent {
  constructor() {}
}
