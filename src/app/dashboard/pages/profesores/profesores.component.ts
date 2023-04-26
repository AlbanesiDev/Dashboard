import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent } from './abm-profesores/add/add.component';
import { EditComponent } from './abm-profesores/edit/edit.component';
import { DeleteComponent } from './abm-profesores/delete/delete.component';
import { DetallesComponent } from './detalles/detalles.component';
import { ProfesoresService } from './services/profesores.service';

export interface Profesor{
  id: number;
  firstName: string;
  lastName: string;
  course: string;
  comision: number;
  email: string;
}

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})

export class ProfesoresComponent {  
  displayedColumns: string[] = ['id', 'fullName', 'course', 'comision', 'email', 'info', 'edit', 'delete'];

  dataSource = new MatTableDataSource<Profesor>();

  constructor(
    private matDialog: MatDialog,
    private inscripcionesService: ProfesoresService
    ) {
      this.inscripcionesService.obtenerInscripcion()
      .subscribe((inscripciones) => {
        this.dataSource.data = inscripciones;
      })
    }

  openDetallesDialog(profesor: Profesor): void {
    this.matDialog.open(DetallesComponent, {
      data: profesor
    });
  }

  createProfesor(): void{
    const dialog = this.matDialog.open(AddComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.dataSource.data = [...this.dataSource.data, {
          ...value,
          id: this.dataSource.data[this.dataSource.data.length-1].id + 1
        }];
      }
    });
  }

  edit(profesor: Profesor): void{
    const dialog = this.matDialog.open(EditComponent, {
      data: {
        profesor
      }
    });
    dialog.afterClosed().subscribe((value) => {
      if(value){
        let index = this.dataSource.data.findIndex(item => item.id === profesor.id);
        this.dataSource.data[index] = value;
        this.dataSource.data = this.dataSource.data;
      }
    });
  }

  delete(id: number): void{
    const dialog = this.matDialog.open(DeleteComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.dataSource.data = this.dataSource.data.filter((profesor) => {
          return profesor.id !== id;});
      }
    });
  }
}
