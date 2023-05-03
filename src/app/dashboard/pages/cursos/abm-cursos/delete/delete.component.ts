import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  
  comisionDeleteFormControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]);
  comision: number[] = []


  registerForm = new FormGroup({
    comision: this.comisionDeleteFormControl
  });
  
  constructor(
    private matDialogRef: MatDialogRef<DeleteComponent>,
    
    ) {


  }

  delete(): void {
    if (this.registerForm.valid) {
      this.matDialogRef.close(true);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

}
