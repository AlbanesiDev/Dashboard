import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  profesorControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
  courseControl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(14)]);
  courses: string[] = ['Desarrollo Web', 'Javascript', 'Angular', 'React', 'Vue'];

  registerForm = new FormGroup({
    profesor: this.profesorControl,
    course: this.courseControl,
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

  range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
  });
}
