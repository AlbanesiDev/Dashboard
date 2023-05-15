import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TeachersServices } from 'src/app/core/services/teachers.service';
import { Courses } from 'src/app/core/models/Courses';
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

    courseNames: string[] = ['Desarrollo Web', 'Javascript', 'Angular', 'React', 'Vue', 'UX/UI'];
    teachers: string[] = [];


    registerForm = new FormGroup({
        course: this.courseControl,
        commission: this.commissionControl,
        teacher: this.teachersControl,
        start: this.dateStartControl,
        end: this.dateEndControl,
    });
    
    constructor(
        private matDialogRef: MatDialogRef<EditComponent>,
        private fb: FormBuilder,
        private teacherService: TeachersServices,
        @Inject(MAT_DIALOG_DATA) public course: Courses
    ) { }

    ngOnInit(): void {
        this.teacherService.getTeachers().subscribe(
            (teachers) => {
                this.teachers = teachers.map((teacher) => teacher.firstName + ' ' + teacher.lastName);
            }
        );
        this.registerForm = this.fb.group({
            course: [this.course.course, Validators.required],
            commission: [this.course.commission, Validators.required],
            teacher: [this.course.teacher, Validators.required],
            start: [this.course.start, Validators.required],
            end: [this.course.end, Validators.required]
        });        
    }

    save(): void {
        console.log('xd')
        if (this.registerForm.valid) {
            this.matDialogRef.close(this.registerForm.value);
        }
    }

    cancel(): void {
        this.matDialogRef.close();
    }   
}