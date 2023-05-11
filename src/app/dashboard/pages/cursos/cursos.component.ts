import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Courses } from 'src/app/core/models/Courses';
import { CoursesServices } from 'src/app/core/services/courses.service';
import { AddComponent } from './abm-cursos/add/add.component';
import { EditComponent } from './abm-cursos/edit/edit.component';
import { DeleteComponent } from './abm-cursos/delete/delete.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})

export class CursosComponent implements OnInit {
  courses: Courses[] = [];
  constructor(
    private courseService: CoursesServices,
    private matDialog: MatDialog,
  ) { }

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

  editCourse(id: number, course: Courses): void {
    const dialogRef = this.matDialog.open(EditComponent, {
      data: course
    });
    dialogRef.afterClosed().subscribe((editCourse) => {
      if (editCourse) {
        this.courseService.editCourse(editCourse).subscribe((result) => {
          const index = this.courses.findIndex(c => c.id === editCourse.id);
          if (index !== -1) {
            this.courses[index] = editCourse;
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
}