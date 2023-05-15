import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Students } from 'src/app/core/models/Students';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})
export class DetallesComponent {
  constructor(
    public dialogRef: MatDialogRef<DetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public student: Students
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
