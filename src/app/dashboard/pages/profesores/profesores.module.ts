import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './abm-profesores/add/add.component';
import { DeleteComponent } from './abm-profesores/delete/delete.component';
import { EditComponent } from './abm-profesores/edit/edit.component';
import { AngularMaterialModule } from 'src/app/shared/angularMaterial/AngularMaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { ProfesoresComponent } from './profesores.component';
import { DetallesComponent } from './detalles/detalles.component';

@NgModule({
  declarations: [
    ProfesoresComponent,
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
    ProfesoresComponent
  ]
})
export class ProfesoresModule { }
