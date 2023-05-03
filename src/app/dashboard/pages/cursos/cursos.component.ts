import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddComponent } from './abm-cursos/add/add.component';
import { DeleteComponent } from './abm-cursos/delete/delete.component';
import { EditComponent } from './abm-cursos/edit/edit.component';
import { CursosService } from './services/cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent { 

  cursos: { id: number; nombre: string; imagen: string; comision: string; profesor: string; fechaInicio: string; fechaFin: string; }[] = [];


  constructor(
    private matDialog: MatDialog,
    private cursoService: CursosService
  ) {
    this.cursos = this.cursoService.cursos;
  } 

  createCurso(): void {
    const dialog = this.matDialog.open(AddComponent);

    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.cursos.push({
          ...value,
          id: this.cursos[this.cursos.length - 1].id + 1
        });
      }
    });
  }

  editCurso(): void {
    const dialog = this.matDialog.open(EditComponent);
  }

  deleteCurso(id: number): void {  
    const dialog = this.matDialog.open(DeleteComponent);

    dialog.afterClosed().subscribe((value) => {
      if(value) {
        this.cursos = this.cursos.filter((cursos) => {
        return cursos.id !== id;});
      }
    })
  }
}
