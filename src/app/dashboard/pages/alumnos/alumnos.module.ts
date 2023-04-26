import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './abm-alumnos/add/add.component';
import { EditComponent } from './abm-alumnos/edit/edit.component';
import { DeleteComponent } from './abm-alumnos/delete/delete.component';
import { AngularMaterialModule } from 'src/app/shared/angularMaterial/AngularMaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AlumnosComponent } from './alumnos.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DetallesComponent } from './detalles/detalles.component';

@NgModule({
  declarations: [
    AlumnosComponent,
    AddComponent,
    EditComponent,
    DeleteComponent,
    DetallesComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    AlumnosComponent
  ]
})
export class AlumnosModule { }
