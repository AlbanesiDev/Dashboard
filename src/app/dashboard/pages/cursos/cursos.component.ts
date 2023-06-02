import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Courses } from 'src/app/core/models/Courses';
import { CoursesServices } from 'src/app/core/services/courses.service';
import { AddComponent } from './abm-cursos/add/add.component';
import { EditComponent } from './abm-cursos/edit/edit.component';
import { DeleteComponent } from './abm-cursos/delete/delete.component';
import { DetallesComponent } from './detalles/detalles.component';
import { Observable, map } from 'rxjs';
import { NavItem, cursos, estudiantes, profesores } from 'src/app/core/models/Links';
import { Users } from 'src/app/core/models/Users';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {
  courses: Courses[] = [];
  
  linksProfesores = profesores;
  linksEstudiantes = estudiantes;
  linksCursos = cursos;
  authUser$: Observable<Users | null>;

  constructor(
    private courseService: CoursesServices,
    private matDialog: MatDialog,
    private authService: AuthService,
  ) { 
    this.authUser$ = this.authService.getUserAuthenticated();
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => (this.courses = courses));
  }

  createCourse(): void {
    const dialogRef = this.matDialog.open(AddComponent);
    dialogRef.afterClosed().subscribe((newCourse) => {
      if (newCourse) {
        this.courseService.createCourse(newCourse).subscribe((createdCourse) => {
          this.courses.push(createdCourse);
        });
      }
    });
  }

  editCourse(course: Courses): void {
    const dialogRef = this.matDialog.open(EditComponent, {
      data: course
    });
    dialogRef.afterClosed().subscribe((editCourse) => {
      if (editCourse) {
        const editedCourse: Courses = { ...editCourse };
        this.courseService.updateCourse(editedCourse).subscribe((result: Courses) => {
          const index = this.courses.findIndex(c => c.id === editCourse.id);
          if (index !== -1) {
            this.courses[index] = result;
          }
        });
      }
    });
  }

  deleteCourse(id: number, commission: string): void {
    const dialog = this.matDialog.open(DeleteComponent, {
      data: { id, commission }
    });
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.courseService.deleteCourse(id).subscribe(() => {
          this.courses = this.courses.filter((course) => course.id !== id);
        });
      }
    });
  }

  viewStudents(course: string, commission: string): void {
    const dialogRef = this.matDialog.open(DetallesComponent, {
      data: { course, commission }
    })
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