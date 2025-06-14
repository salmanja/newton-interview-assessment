import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MATERIAL_IMPORTS } from '../../../Material/material.imports';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-assets-form',
  standalone: true,
  imports: [MATERIAL_IMPORTS,ReactiveFormsModule],
  templateUrl: './assets-form.component.html',
  styleUrl: './assets-form.component.scss'
})
export class AssetsFormComponent {
addAssetsForm: FormGroup;

constructor(private dialogRef: MatDialogRef<AssetsFormComponent>,
  private fb: FormBuilder) {
  this.addAssetsForm = this.fb.group({
    //form feilds with validation
    type: ['', Validators.required],
    value: [null, [Validators.required, Validators.min(0)]],
  });
}

//submit handler
onSubmit():void {
  if (this.addAssetsForm.valid) {
 this.dialogRef.close(this.addAssetsForm.value);
  } 
}
onCancel(): void {
  this.dialogRef.close();
  this.addAssetsForm.reset();
}
}