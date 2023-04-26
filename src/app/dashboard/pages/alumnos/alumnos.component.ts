import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent } from './abm-alumnos/add/add.component';
import { EditComponent } from './abm-alumnos/edit/edit.component';
import { DeleteComponent } from './abm-alumnos/delete/delete.component';
import { DetallesComponent } from './detalles/detalles.component';
import { AlumnosService } from './services/alumnos.service';

export interface Alumno{
  id: number;
  firstName: string;
  lastName: string;
  course: string;
  note: number;
  email: string;
}

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})

export class AlumnosComponent {  
  displayedColumns: string[] = ['id', 'fullName', 'course', 'note', 'email', 'info', 'edit', 'delete'];
  
  dataSource = new MatTableDataSource<Alumno>();

  constructor(
    private matDialog: MatDialog,
    private inscripcionesService: AlumnosService
    ) {
      this.inscripcionesService.obtenerInscripcion()
      .subscribe((inscripciones) => {
        this.dataSource.data = inscripciones;
      })
    }

  openDetallesDialog(alumno: Alumno): void {
    this.matDialog.open(DetallesComponent, {
      data: alumno
    });
  }
  

  createAlumno(): void{
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

  edit(alumno: Alumno): void{
    const dialog = this.matDialog.open(EditComponent, {
      data: {
        alumno
      }
    });
    dialog.afterClosed().subscribe((value) => {
      if(value){
        let index = this.dataSource.data.findIndex(item => item.id === alumno.id);
        this.dataSource.data[index] = value;
        this.dataSource.data = this.dataSource.data;
      }
    });
  }

  delete(id: number): void{
    const dialog = this.matDialog.open(DeleteComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.dataSource.data = this.dataSource.data.filter((alumno) => {
          return alumno.id !== id;});
      }
    });
  }
}
