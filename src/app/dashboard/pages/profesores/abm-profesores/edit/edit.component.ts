import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

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
  comisionControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  courses: string[] = ['Desarrollo Web', 'Javascript', 'Angular', 'React', 'Vue', 'UX/UI'];
  comisions: number[] = [33210, 40300, 12023, 13420, 13420]

  registerForm = new FormGroup({
    id: this.idControl,
    firstName: this.firstNameControl,
    lastName: this.lastNameControl,
    course: this.courseControl,
    comision: this.comisionControl,
    email: this.emailControl,
  });

  constructor(private matDialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.firstNameControl.setValue(this.data.profesor.firstName); 
    this.lastNameControl.setValue(this.data.profesor.lastName); 
    this.courseControl.setValue(this.data.profesor.course); 
    this.comisionControl.setValue(this.data.profesor.comision); 
    this.emailControl.setValue(this.data.profesor.email); 
  }

  save(): void{
    if(this.registerForm.valid){
      this.idControl.setValue(this.data.profesor.id);
      this.matDialogRef.close(this.registerForm.value);
    }
    else{
      this.registerForm.markAllAsTouched();
    }
  }
}
