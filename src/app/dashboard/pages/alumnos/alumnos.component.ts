import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent } from './abm-alumnos/add/add.component';
import { EditComponent } from './abm-alumnos/edit/edit.component';
import { DeleteComponent } from './abm-alumnos/delete/delete.component';
import { DetallesComponent } from './detalles/detalles.component';
import { StudentsServices } from 'src/app/core/services/students.service';
import { Students } from 'src/app/core/models/Students';

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
  displayedColumns: string[] = ['id', 'fullName', 'course', 'commission', 'note', 'email', 'info', 'edit', 'delete'];
  
  dataSource = new MatTableDataSource<Students>();

  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsServices
  ) {
    this.studentsService.getStudents().subscribe((students) => {
      this.dataSource.data = students;
    });
  }

  openDetallesDialog(student: Students): void {
    this.matDialog.open(DetallesComponent, {
      data: student
    });
  }
  createAlumno(): void {
    const dialog = this.matDialog.open(AddComponent);
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.studentsService.createStudent(value).subscribe((student) => {
          this.dataSource.data = [...this.dataSource.data, {
            ...student,
            id: this.dataSource.data[this.dataSource.data.length - 1].id + 1
          }];
        });
      }
    });
  }
  
  edit(student: Students): void{
    const dialog = this.matDialog.open(EditComponent, {
      data: {
        student
      }
    });
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.studentsService.editStudent(value)
        .subscribe(() => {
          let index = this.dataSource.data.findIndex(item => item.id === value.id);
          this.dataSource.data[index] = value;
          this.dataSource.data = this.dataSource.data;
        });
      }
    });
  }

  delete(id: number): void{
    const dialog = this.matDialog.open(DeleteComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        const student = this.dataSource.data.find(a => a.id === id);
        if (student) {
          this.studentsService.deleteStudent(student).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(a => a.id !== id);
          });
        }
      }
    });
  }
}
