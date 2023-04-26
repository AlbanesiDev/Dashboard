import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {
  constructor(private matDialogRef: MatDialogRef<DeleteComponent>) {
  }

  delete(): void {
    this.matDialogRef.close(true);
  }
}
