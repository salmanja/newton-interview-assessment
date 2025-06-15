import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MATERIAL_IMPORTS } from '../../../Material/material.imports';
import { NgFor } from '@angular/common';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface AssetFormData {
  type: string;
  value: number;
}

@Component({
  selector: 'app-assets-form',
  standalone: true,
  imports: [MATERIAL_IMPORTS, ReactiveFormsModule, NgFor],
  templateUrl: './assets-form.component.html',
  styleUrl: './assets-form.component.scss',
})
export class AssetsFormComponent {
  assetsForm: FormGroup;

  assetTypes = [
    { value: 'Gift', label: 'Gift' },
    { value: 'Savings', label: 'Savings' },
    { value: 'RRSP', label: 'RRSP' },
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AssetsFormComponent>,
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

    this.assetsForm = this.fb.group({
      assets: this.fb.array([this.createAssetFormGroup()]),
    });
  }

  get assetsFormArray(): FormArray {
    return this.assetsForm.get('assets') as FormArray;
  }

  getAssetFormGroup(index: number): FormGroup {
    return this.assetsFormArray.at(index) as FormGroup;
  }

  createAssetFormGroup(): FormGroup {
    return this.fb.group({
      type: ['', Validators.required],
      value: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  addAnotherAsset(): void {
    try {
      this.assetsFormArray.push(this.createAssetFormGroup());
    } catch (error) {
      console.error('Error adding asset:', error);
      this.snackBar.open('Could not add asset. Please try again.', 'Close', {
        duration: 3000,
      });
    }
  }

  removeAsset(index: number): void {
    try {
      if (this.assetsFormArray.length > 1) {
        this.assetsFormArray.removeAt(index);
      }
    } catch (error) {
      console.error('Error removing asset:', error);
      this.snackBar.open('Could not remove asset. Please try again.', 'Close', {
        duration: 3000,
      });
    }
  }

  onClose(): void {
    try {
      this.dialogRef.close();
    } catch (error) {
      console.error('Error closing dialog:', error);
    }
  }

  onSave(): void {
    try {
      if (this.assetsForm.valid) {
        const formValue = this.assetsForm.value;
        const assets: AssetFormData[] = formValue.assets.map((asset: any) => ({
          type: asset.type,
          value: parseFloat(asset.value) || 0,
        }));
        this.dialogRef.close(assets);
      } else {
        this.snackBar.open('Please fill in all required fields.', 'Close', {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error saving assets:', error);
      this.snackBar.open('Could not save assets. Please try again.', 'Close', {
        duration: 3000,
      });
    }
  }

  isFormValid(): boolean {
    return this.assetsForm.valid;
  }
}
