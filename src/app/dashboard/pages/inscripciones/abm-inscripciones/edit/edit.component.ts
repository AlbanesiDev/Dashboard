import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoursesServices } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  idControl = new FormControl('');
  firstNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  lastNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  courseControl = new FormControl('', [Validators.required]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);

  courses: string[] = [];
  commission: any[] = [];

  registerForm = new FormGroup({
    id: this.idControl,
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    course: this.courseControl,
    email: this.emailControl,
  });

  constructor(private matDialogRef: MatDialogRef<EditComponent>,
    private courseService: CoursesServices,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.firstNameControl.setValue(this.data.enrolled.firstName);
    this.lastNameControl.setValue(this.data.enrolled.lastName);
    this.courseControl.setValue(this.data.enrolled.course);
    this.emailControl.setValue(this.data.enrolled.email);
  }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      (courses) => {
        this.courses = courses.map((courses) => courses.course + ' ' + courses.commission);
      }
    );
    this.courseService.getCourses().subscribe((courses) => {
      this.commission = courses.map((course) => course.commission)
    });
  }

  save(): void {
    if (this.registerForm.valid) {
      this.idControl.setValue(this.data.enrolled.id);
      this.matDialogRef.close(this.registerForm.value);
    }
    else {
      this.registerForm.markAllAsTouched();
    }
  }
}
