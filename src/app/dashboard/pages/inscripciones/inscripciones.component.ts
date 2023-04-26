import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent } from './abm-inscripciones/add/add.component';
import { EditComponent } from './abm-inscripciones/edit/edit.component';
import { DeleteComponent } from './abm-inscripciones/delete/delete.component';
import { DetallesComponent } from './detalles/detalles.component';
import { InscripcionesService } from './services/inscripciones.service';

export interface Alumno {
  id: number;
  firstName: string;
  lastName: string;
  course: string;
  comision: number;
  email: string;
}

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss'],
})
export class InscripcionesComponent {
  displayedColumns: string[] = [
    'id',
    'fullName',
    'course',
    'comision',
    'email',
    'info',
    'edit',
    'delete',
  ];
  

  dataSource = new MatTableDataSource<Alumno>();

  constructor(
    private matDialog: MatDialog,
    private inscripcionesService: InscripcionesService
    ) {
      this.inscripcionesService.obtenerInscripcion()
      .subscribe((inscripciones) => {
        this.dataSource.data = inscripciones;
      })
    }


  openDetallesDialog(alumno: Alumno): void {
    this.matDialog.open(DetallesComponent, {
      data: alumno,
    });
  }

  createAlumno(): void {
    const dialog = this.matDialog.open(AddComponent);
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.dataSource.data = [
          ...this.dataSource.data,
          {
            ...value,
            id: this.dataSource.data[this.dataSource.data.length - 1].id + 1,
          },
        ];
      }
    });
  }

  edit(alumno: Alumno): void {
    const dialog = this.matDialog.open(EditComponent, {
      data: {
        alumno,
      },
    });
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        let index = this.dataSource.data.findIndex(
          (item) => item.id === alumno.id
        );
        this.dataSource.data[index] = value;
        this.dataSource.data = this.dataSource.data;
      }
    });
  }

  delete(id: number): void {
    const dialog = this.matDialog.open(DeleteComponent);
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.dataSource.data = this.dataSource.data.filter((alumno) => {
          return alumno.id !== id;
        });
      }
    });
  }
}
