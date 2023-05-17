import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './abm-inscripciones/add/add.component';
import { DeleteComponent } from './abm-inscripciones/delete/delete.component';
import { EditComponent } from './abm-inscripciones/edit/edit.component';
import { AngularMaterialModule } from 'src/app/shared/angularMaterial/AngularMaterial.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { InscripcionesComponent } from './inscripciones.component';
import { DetallesComponent } from './detalles/detalles.component';

@NgModule({
  declarations: [
    InscripcionesComponent,
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
    InscripcionesComponent
  ]
})
export class InscripcionesModule { }
