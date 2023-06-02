import { Component, OnInit } from '@angular/core';
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
    emailControl = new FormControl('', [Validators.required, Validators.email]);
    passwordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
    roleControl = new FormControl('', [Validators.required]);

    rolesNames: string[] = ['Administrador', 'Usuario'];

    registerForm = new FormGroup({
        firstName: this.firstNameControl,
        lastName: this.lastNameControl,
        email: this.emailControl,
        password: this.passwordControl,
        role: this.roleControl,
    });

    constructor(
        private matDialogRef: MatDialogRef<AddComponent>,
    ) { }

    save(): void {
        if (this.registerForm.valid) {
            this.matDialogRef.close(this.registerForm.value);
        }
        else {
            this.registerForm.markAllAsTouched();
        }
    }
}