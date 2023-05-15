import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent {
    idControl = new FormControl('');
    firstNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
    lastNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
    courseControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]);
    noteControl = new FormControl('', [Validators.required, Validators.max(10)]);
    emailControl = new FormControl('', [Validators.required, Validators.email]);
    courses: string[] = ['Desarrollo Web', 'Javascript', 'Angular', 'React', 'Vue'];

    registerForm = new FormGroup({
        id: this.idControl,
        firstName: this.firstNameControl,
        lastName: this.lastNameControl,
        course: this.courseControl,
        note: this.noteControl,
        email: this.emailControl,
    });

    constructor(private matDialogRef: MatDialogRef<EditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.firstNameControl.setValue(this.data.student.firstName);
        this.lastNameControl.setValue(this.data.student.lastName);
        this.courseControl.setValue(this.data.student.course);
        this.noteControl.setValue(this.data.student.note);
        this.emailControl.setValue(this.data.student.email);
    }

    save(): void {
        if (this.registerForm.valid) {
            this.idControl.setValue(this.data.student.id);
            this.matDialogRef.close(this.registerForm.value);
        }
        else {
            this.registerForm.markAllAsTouched();
        }
    }
}
