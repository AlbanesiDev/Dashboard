import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProfesoresService } from '../../../profesores/services/profesores.service';
import { Profesor } from '../../../profesores/profesores.component';
@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.scss']
})

export class AddComponent {
    profesorControl = new FormControl('', [Validators.required]);
    courseControl = new FormControl('', [Validators.required]);
    comisionControl = new FormControl('', [Validators.required]);
    dateStartControl = new FormControl('', [Validators.required]);
    dateEndControl = new FormControl('', [Validators.required]);

    courses: string[] = ['Desarrollo Web', 'Javascript', 'Angular', 'React', 'Vue'];
    comisions: number[] = [33210, 40300, 12023, 13420, 13420]
    profesores: Profesor[] = [];

    registerForm = new FormGroup({
        profesor: this.profesorControl,
        course: this.courseControl,
        comisions: this.comisionControl,
        start: this.dateStartControl,
        end: this.dateEndControl,
    });


    constructor(
        private matDialogRef: MatDialogRef<AddComponent>,
        private profesoresService: ProfesoresService
    ) {
        this.profesoresService.obtenerProfesores().subscribe((firstName: Profesor[]) => {
            this.profesores = firstName;
        });
    }

    save(): void {
        if (this.registerForm.valid) {
            this.matDialogRef.close(this.registerForm.value);
            console.log(this.registerForm.value);
        }
        else {
            this.registerForm.markAllAsTouched();
        }
    }
}
