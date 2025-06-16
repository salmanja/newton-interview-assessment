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
    private sanitizer: DomSanitizer
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
    this.assetsFormArray.push(this.createAssetFormGroup());
  }

  removeAsset(index: number): void {
    if (this.assetsFormArray.length > 1) {
      this.assetsFormArray.removeAt(index);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.assetsForm.valid) {
      const formValue = this.assetsForm.value;
      const assets: AssetFormData[] = formValue.assets.map((asset: any) => ({
        type: asset.type,
        value: parseFloat(asset.value) || 0,
      }));
      this.dialogRef.close(assets);
    }
  }

  isFormValid(): boolean {
    return this.assetsForm.valid;
  }
}
