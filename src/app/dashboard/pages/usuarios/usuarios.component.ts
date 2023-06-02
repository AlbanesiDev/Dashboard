import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from 'src/app/core/models/Users';
import { UsersServices } from 'src/app/core/services/users.service';
import { AddComponent } from './abm-usuarios/add/add.component';
import { DetallesComponent } from './detalles/detalles.component';
import { EditComponent } from './abm-usuarios/edit/edit.component';
import { DeleteComponent } from './abm-usuarios/delete/delete.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email', 'role', 'detalles', 'edit', 'delete'];
  dataSource = new MatTableDataSource<Users>();

  constructor(
    private matDialog: MatDialog, 
    private usersService: UsersServices
  ) { 
    this.usersService.getUser().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  openDetallesDialog(student: Users): void {
    this.matDialog.open(DetallesComponent, {
      data: student
    });
  }

  createUser(): void {
    const dialog = this.matDialog.open(AddComponent);
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        const token = this.generateToken();
        value.token = token;
        this.usersService.createUser(value).subscribe((student) => {
          this.dataSource.data = [...this.dataSource.data, {
            ...student,
            id: this.dataSource.data[this.dataSource.data.length - 1].id + 1
          }];
        });
      }
    });
  }
  
  edit(user: Users, role: string): void{
    const dialog = this.matDialog.open(EditComponent, {
      data: {
        user, role
      }
    });
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.usersService.editUser(value)
        .subscribe(() => {
          let index = this.dataSource.data.findIndex(item => item.id === value.id);
          this.dataSource.data[index] = value;
          this.dataSource.data = this.dataSource.data;
        });
      }
    });
  }

  delete(id: number): void{
    const dialog = this.matDialog.open(DeleteComponent);
    dialog.afterClosed().subscribe((value) => {
      if(value){
        const student = this.dataSource.data.find(a => a.id === id);
        if (student) {
          this.usersService.deleteUser(student).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(a => a.id !== id);
          });
        }
      }
    });
  }

  generateToken(): string {
    let cadena = '';
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < 40; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      cadena += caracteres.charAt(indice);
    }
    return cadena;
  }
}
