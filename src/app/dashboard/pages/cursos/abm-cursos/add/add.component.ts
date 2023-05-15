import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CoursesServices } from 'src/app/core/services/courses.service';
import { TeachersServices } from 'src/app/core/services/teachers.service';
import { format } from 'date-fns';
import { ImageOption } from 'src/app/core/models/ImageOptions';

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
    
    teachersControl = new FormControl('', [Validators.required]);
    courseControl = new FormControl('', [Validators.required]);
    commissionControl = new FormControl('', [Validators.required]);
    dateStartControl = new FormControl('', [Validators.required]);
    dateEndControl = new FormControl('', [Validators.required]);
    imagePathControl = new FormControl('')

    courseNames: string[] = ['Desarrollo Web', 'Javascript', 'Angular', 'React', 'Vue', 'UX/UI'];
    commission: string[] = [];
    teachers: string[] = [];
    coursesImages: ImageOption[] = [];

    registerForm = new FormGroup({
        course: this.courseControl,
        commission: this.commissionControl,
        teacher: this.teachersControl,
        start: this.dateStartControl,
        end: this.dateEndControl,
        imagePath: this.imagePathControl
    });

    constructor(
        private matDialogRef: MatDialogRef<AddComponent>,
        private courseService: CoursesServices,
        private teacherService: TeachersServices,
    ) { }

    ngOnInit(): void {
        this.courseService.getCourses().subscribe((courses) => {
            this.commission = courses.map((course) => course.commission)
        });

        this.courseService.getImageOptions().subscribe((courses) => {
            this.coursesImages = courses;
        });

        this.teacherService.getTeachers().subscribe(
            (teachers) => {
                this.teachers = teachers.map((teacher) => `${teacher.firstName} ${teacher.lastName}`);
            }
        );
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        this.registerForm.patchValue({ commission: randomNumber.toString() });
    }
    save(): void {
        if (this.registerForm.valid) {
            //===================================================================================
            const startDateValue = this.dateStartControl.value;
            const endDateValue = this.dateEndControl.value;
            const startDate = startDateValue ? format(new Date(startDateValue), 'dd/MM/yyyy') : '';
            const endDate = endDateValue ? format(new Date(endDateValue), 'dd/MM/yyyy') : '';
            this.registerForm.patchValue({ start: startDate, end: endDate });
            //===================================================================================
            const selectedCourseName = this.courseControl.value;
            const selectedCourse = this.coursesImages.find(course => course.name === selectedCourseName);
            if (selectedCourse) {
                this.registerForm.patchValue({ imagePath: selectedCourse.imagePath });
            }
            //===================================================================================
            this.matDialogRef.close(this.registerForm.value);
            //===================================================================================
        } else {
            this.registerForm.markAllAsTouched();
        }
    }
}
