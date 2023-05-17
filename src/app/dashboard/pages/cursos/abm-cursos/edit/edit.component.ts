import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeachersServices } from 'src/app/core/services/teachers.service';
import { Courses } from 'src/app/core/models/Courses';
import { CoursesServices } from 'src/app/core/services/courses.service';
import { ImageOption } from 'src/app/core/models/ImageOptions';
import { format } from 'date-fns';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    teachersControl = new FormControl('', [Validators.required]);
    courseControl = new FormControl('', [Validators.required]);
    commissionControl = new FormControl('', [Validators.required]);
    dateStartControl = new FormControl('', [Validators.required]);
    dateEndControl = new FormControl('', [Validators.required]);
    imagePathControl = new FormControl('')

    courseNames: string[] = ['Desarrollo Web', 'Javascript', 'Angular', 'React', 'Vue', 'UX/UI'];
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
        private matDialogRef: MatDialogRef<EditComponent>,
        private fb: FormBuilder,
        private teacherService: TeachersServices,
        private courseService: CoursesServices,
        @Inject(MAT_DIALOG_DATA) public course: Courses
    ) {
        this.teachersControl.patchValue(course.teacher);
        this.courseControl.patchValue(course.course);
        this.commissionControl.patchValue(course.commission);
        this.dateStartControl.patchValue(course.start);
        this.dateEndControl.patchValue(course.end);
    }

    ngOnInit(): void {
        this.teacherService.getTeachers().subscribe(
            (teachers) => {
                this.teachers = teachers.map((teacher) => teacher.firstName + ' ' + teacher.lastName);
            }
        );
        this.courseService.getImageOptions().subscribe((courses) => {
            this.coursesImages = courses;
        });
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
            const editedCourse = { id: this.course.id, ...this.registerForm.value, endDate, startDate };
            this.matDialogRef.close(editedCourse);
            //===================================================================================
        } else {
            this.registerForm.markAllAsTouched();
        }
    }

    cancel(): void {
        this.matDialogRef.close();
    }
}