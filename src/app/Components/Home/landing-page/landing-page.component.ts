import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../Material/material.imports';
import {MatDialog} from '@angular/material/dialog';
import { AssetsFormComponent } from '../../Form/assets-form/assets-form.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-landing-page',
  standalone: true,
imports: [MATERIAL_IMPORTS, NgIf, NgFor],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
assets: any[] = [];
  constructor(private dialog: MatDialog) {}
  openDialog(){
    const dialogRef = this.dialog.open(AssetsFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assets.push(result);
      }
    });
  }
}
