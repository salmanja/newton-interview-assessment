import { Component } from '@angular/core';
import { MATERIAL_IMPORTS } from '../../../Material/material.imports';
import { MatDialog } from '@angular/material/dialog';
import { AssetsFormComponent } from '../../Form/assets-form/assets-form.component';
import { NgIf, NgFor } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar
  ) {
    this.iconRegistry.addSvgIcon(
      'hand-dollar',
      this.sanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/hand-dollar.svg'
      )
    );
  }

  openDialog(): void {
    try {
      const dialogRef = this.dialog.open(AssetsFormComponent, {
        width: '640px',
        minWidth: '600px',
        disableClose: true,
        panelClass: 'custom-dialog-container',
        position: { top: '10vh' },
        hasBackdrop: true,
        backdropClass: 'dark-backdrop',
      });

      dialogRef.afterClosed().subscribe((result) => {
        try {
          if (result && result.length > 0) {
            this.assets.push(...result);
            this.calculateTotalValue();
            this.snackBar.open(
              `Added ${result.length} asset(s) successfully!`,
              'Close',
              {
                duration: 3000,
              }
            );
          }
        } catch (error) {
          console.error('Error processing assets:', error);
          this.snackBar.open(
            'Error adding assets. Please try again.',
            'Close',
            {
              duration: 3000,
            }
          );
        }
      });
    } catch (error) {
      console.error('Error opening dialog:', error);
      this.snackBar.open('Could not open form. Please try again.', 'Close', {
        duration: 3000,
      });
    }
  }

  calculateTotalValue(): void {
    try {
      this.totalValue = this.assets.reduce(
        (sum, asset) => sum + asset.value,
        0
      );
    } catch (error) {
      console.error('Error calculating total:', error);
      this.totalValue = 0;
    }
  }

  formatCurrency(value: number): string {
    try {
      return new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    } catch (error) {
      console.error('Error formatting currency:', error);
      return '0.00';
    }
  }

  removeAsset(index: number): void {
    try {
      this.assets.splice(index, 1);
      this.calculateTotalValue();
      this.snackBar.open('Asset removed successfully!', 'Close', {
        duration: 2000,
      });
    } catch (error) {
      console.error('Error removing asset:', error);
      this.snackBar.open('Could not remove asset. Please try again.', 'Close', {
        duration: 3000,
      });
    }
  }
}
