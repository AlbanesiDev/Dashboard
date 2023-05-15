import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent } from './abm-profesores/add/add.component';
import { EditComponent } from './abm-profesores/edit/edit.component';
import { DeleteComponent } from './abm-profesores/delete/delete.component';
import { DetallesComponent } from './detalles/detalles.component';
import { TeachersServices } from 'src/app/core/services/teachers.service';
import { Teachers } from 'src/app/core/models/Teachers';

@Component({
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
  styleUrls: ['./profesores.component.scss']
})

export class ProfesoresComponent {  
  displayedColumns: string[] = ['id', 'fullName', 'course', 'commission', 'email', 'info', 'edit', 'delete'];

  dataSource = new MatTableDataSource<Teachers>();

  constructor(
    private matDialog: MatDialog,
    private teachersServices: TeachersServices
    ) {
      this.teachersServices.getTeachers().subscribe((teachers) => {
        this.dataSource.data = teachers;
      });
    }

  openDetallesDialog(teacher: Teachers): void {
    this.matDialog.open(DetallesComponent, {
      data: teacher
    });
  }

  createTeacher(): void{
    const dialog = this.matDialog.open(AddComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.teachersServices.createTeacher(value).subscribe((teacher) => {
          this.dataSource.data = [...this.dataSource.data, {
            ...teacher,
            id: this.dataSource.data[this.dataSource.data.length - 1].id + 1
          }];
        });
      }
    });
  }

  edit(teacher: Teachers): void{
    const dialog = this.matDialog.open(EditComponent, {
      data: {
        teacher
      }
    });
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.teachersServices.editTeacher(value)
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
        const teacher = this.dataSource.data.find(a => a.id === id);
        if (teacher) {
          this.teachersServices.deleteTeacher(teacher).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(a => a.id !== id);
          });
        }
      }
    });
  }
}
