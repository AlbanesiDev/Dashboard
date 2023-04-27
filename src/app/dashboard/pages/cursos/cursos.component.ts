import { Component } from '@angular/core';
import { ProfesoresService } from '../profesores/services/profesores.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Profesor } from '../profesores/profesores.component';

import { AddComponent } from './abm-cursos/add/add.component';
import { DeleteComponent } from './abm-cursos/delete/delete.component';
import { EditComponent } from './abm-cursos/edit/edit.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})

export class CursosComponent { 

  constructor(
    private matDialog: MatDialog,
    ) {
    } 

    createCurso(): void{
    const dialog = this.matDialog.open(AddComponent);
  }
}