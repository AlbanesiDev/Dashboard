import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})
export class AddComponent {
    firstNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
    lastNameControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
    courseControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]);
    comisionControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
    emailControl = new FormControl('', [Validators.required, Validators.email]);
    courses: string[] = ['Desarrollo Web', 'Javascript', 'Angular', 'React', 'Vue', 'UX/UI'];
    comisions: number[] = [33210, 40300, 12023, 13420, 13420]

    registerForm = new FormGroup({
        firstName: this.firstNameControl,
        lastName: this.lastNameControl,
        course: this.courseControl,
        comision: this.comisionControl,
        email: this.emailControl,
    });

    constructor(private matDialogRef: MatDialogRef<AddComponent>) {
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
