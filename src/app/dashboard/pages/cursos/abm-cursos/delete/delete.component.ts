import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {  
  @Input() commission: string;
  commissionInput: string = '';
  commissionDeleteFormControl = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]);
  
  registerForm = new FormGroup({
    commission: this.commissionDeleteFormControl
  });

  constructor(
    private matDialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: number, commission: string }
  ) {
    this.commission = data.commission;
  }

  ngOnInit(): void {}

  deletes(): void {
    if (this.registerForm.valid && this.data.commission == this.commissionDeleteFormControl.value) {
      this.matDialogRef.close(true);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
  
  
  cancel(): void {
    this.matDialogRef.close();
  };
}