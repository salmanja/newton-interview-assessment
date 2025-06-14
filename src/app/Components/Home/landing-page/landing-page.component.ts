import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../Material/material.imports';
import { MatDialog } from '@angular/material/dialog';
import { AssetsFormComponent } from '../../Form/assets-form/assets-form.component';
import { NgIf, NgFor } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MATERIAL_IMPORTS, NgIf, NgFor],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  assets: any[] = [];
  totalValue: number = 0;

  constructor(
  private http: HttpClient,
    private dialog: MatDialog,
  private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
   this.iconRegistry.addSvgIcon(
      'hand-dollar',
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/hand-dollar.svg')
    );
  }
  

  formatCurrency(value: number): string {
    return `$${value.toFixed(2)}`;
  }

  openDialog() {
    const dialogRef = this.dialog.open(AssetsFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.assets.push(result);
        this.calculateTotalValue();
      }
    });
  }
  calculateTotalValue() {
    this.totalValue = this.assets.reduce((sum, asset) => sum + Number(asset.value), 0);
  }
}
