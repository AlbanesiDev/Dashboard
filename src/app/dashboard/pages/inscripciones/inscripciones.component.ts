import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AddComponent } from './abm-inscripciones/add/add.component';
import { EditComponent } from './abm-inscripciones/edit/edit.component';
import { DeleteComponent } from './abm-inscripciones/delete/delete.component';
import { DetallesComponent } from './detalles/detalles.component';
import { InscriptionsServices } from 'src/app/core/services/Inscription.service';
import { Inscription } from 'src/app/core/models/Inscription';


@Component({
  selector: 'app-alumnos',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})

export class InscripcionesComponent {  

  displayedColumns: string[] = ['id', 'fullName', 'course', 'email', 'info', 'edit', 'delete'];
  
  dataSource = new MatTableDataSource<Inscription>();

  constructor(
    private matDialog: MatDialog,
    private inscriptionsServices: InscriptionsServices,
  ) {
    this.inscriptionsServices.getInscriptions().subscribe((enrolled) => {
      this.dataSource.data = enrolled;
    });
  }

  openDetallesDialog(enrolled: Inscription): void {
    this.matDialog.open(DetallesComponent, {
      data: enrolled
    });
  }

  createInscriptions(): void {
    const dialog = this.matDialog.open(AddComponent);
    dialog.afterClosed().subscribe((value) => {
      if (value) {
        this.inscriptionsServices.createInscription(value).subscribe((enrolled) => {
          this.dataSource.data = [...this.dataSource.data, {
            ...enrolled,
            id: this.dataSource.data[this.dataSource.data.length - 1].id + 1
          }];
        });
      }
    });
  }
  
  edit(enrolled: Inscription): void{
    const dialog = this.matDialog.open(EditComponent, {
      data: {
        enrolled
      }
    });
    dialog.afterClosed().subscribe((value) => {
      if(value){
        this.inscriptionsServices.editInscription(value)
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
        const enrolled = this.dataSource.data.find(a => a.id === id);
        if (enrolled) {
          this.inscriptionsServices.deleteInscription(enrolled).subscribe(() => {
            this.dataSource.data = this.dataSource.data.filter(a => a.id !== id);
          });
        }
      }
    });
  }
}
