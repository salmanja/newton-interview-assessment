import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../Material/material.imports';
import { MatDialog } from '@angular/material/dialog';
import { AssetsFormComponent } from '../../Form/assets-form/assets-form.component';
import { NgIf, NgFor } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export interface Asset {
  type: string;
  value: number;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [MATERIAL_IMPORTS, NgIf, NgFor],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  assets: Asset[] = [];
  totalValue: number = 0;

  constructor(
    private dialog: MatDialog,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.iconRegistry.addSvgIcon(
      'hand-dollar',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/hand-dollar.svg'
      )
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AssetsFormComponent, {
      width: '640px',
      minWidth: '600px',
      disableClose: true,
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.length > 0) {
        this.assets.push(...result);
        this.calculateTotalValue();
      }
    });
  }

  calculateTotalValue(): void {
    this.totalValue = this.assets.reduce((sum, asset) => sum + asset.value, 0);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }

  removeAsset(index: number): void {
    this.assets.splice(index, 1);
    this.calculateTotalValue();
  }
}
