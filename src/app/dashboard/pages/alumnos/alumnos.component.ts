import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent } from './abm-alumnos/add/add.component';
import { EditComponent } from './abm-alumnos/edit/edit.component';
import { DeleteComponent } from './abm-alumnos/delete/delete.component';
import { DetallesComponent } from './detalles/detalles.component';
import { StudentsServices } from 'src/app/core/services/students.service';
import { Students } from 'src/app/core/models/Students';
import { AddEnrolledComponent } from './abm-alumnos/addEnrolled/addEnrolled.component';
import { Observable, map } from 'rxjs';
import { NavItem, cursos, estudiantes, profesores } from 'src/app/core/models/Links';
import { Users } from 'src/app/core/models/Users';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.scss']
})

export class AlumnosComponent {  
  
  displayedColumns: string[] = ['id', 'fullName', 'course', 'note', 'email', 'info', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Students>();
  
  linksProfesores = profesores;
  linksEstudiantes = estudiantes;
  linksCursos = cursos;
  authUser$: Observable<Users | null>;

  constructor(
    private matDialog: MatDialog,
    private studentsService: StudentsServices,
    private authService: AuthService
  ) {
    this.studentsService.getStudents().subscribe((students) => {
      this.dataSource.data = students;
    });
    this.authUser$ = this.authService.getUserAuthenticated();
  }

  openDetallesDialog(student: Students): void {
    this.matDialog.open(DetallesComponent, {
      data: student
    });
  }

  addAlumno(): void {
    const dialog = this.matDialog.open(AddEnrolledComponent, {
    });
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

  verifyRole(link: NavItem): Observable<boolean> {
    return this.authUser$.pipe(
      map((user: Users | null) => {
        if (user && link.allowedRoles.length > 0) {
          return link.allowedRoles.includes(user.role);
        }
        return true;
      })
    );
  }
}
