import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersServices } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

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
    private matDialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersServices
  ) {
    this.firstNameControl.setValue(this.data.user.firstName);
    this.lastNameControl.setValue(this.data.user.lastName);
    this.emailControl.setValue(this.data.user.email);
    this.roleControl.setValue(this.data.user.role);
  }

  save(): void {
    if (this.registerForm.valid) {
      const updatedUser = {
        ...this.data.user,
        ...this.registerForm.value
      };

      this.usersService.editUser(updatedUser)
        .subscribe(() => {
          this.matDialogRef.close(updatedUser);
        });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
