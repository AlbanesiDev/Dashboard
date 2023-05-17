import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CoursesServices } from 'src/app/core/services/courses.service';
@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

    firstNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
    lastNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
    courseControl = new FormControl('', [Validators.required]);
    emailControl = new FormControl('', [Validators.required, Validators.email]);

    courses: string[] = [];
    commission: any[] = []

    registerForm = new FormGroup({
        firstName: this.firstNameControl,
        lastName: this.lastNameControl,
        course: this.courseControl,
        email: this.emailControl,
    });

    constructor(
        private matDialogRef: MatDialogRef<AddComponent>,
        private courseService: CoursesServices,
        ) {
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
            this.matDialogRef.close(this.registerForm.value);
        }
        else {
            this.registerForm.markAllAsTouched();
        }
    }
}
