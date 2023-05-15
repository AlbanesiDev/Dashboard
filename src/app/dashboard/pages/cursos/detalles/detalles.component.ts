import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.scss']
})

export class DetallesComponent {  
  displayedColumns: string[] = ['id', 'fullName', 'course', 'note', 'email', 'info', 'edit', 'delete'];
  

  constructor(
  ) {
  }
  

  createAlumno(): void{
  }

  edit(): void{
  }

  delete(): void{
  }
}