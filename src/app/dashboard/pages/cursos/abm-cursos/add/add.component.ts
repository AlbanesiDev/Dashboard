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
    noteControl = new FormControl('', [Validators.required, Validators.max(10)]);
    emailControl = new FormControl('', [Validators.required, Validators.email]);
    courses: string[] = ['Desarrollo Web', 'Javascript', 'Angular', 'React', 'Vue'];

    registerForm = new FormGroup({
        firstName: this.firstNameControl,
        lastName: this.lastNameControl,
        course: this.courseControl,
        note: this.noteControl,
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
