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
import { AddEnrolledComponent } from './abm-alumnos/addEnrolled/addEnrolled.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AlumnosComponent,
    AddComponent,
    AddEnrolledComponent,
    EditComponent,
    DeleteComponent,
    DetallesComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule,
  ],
  exports: [
    AlumnosComponent
  ]
})
export class AlumnosModule { }
