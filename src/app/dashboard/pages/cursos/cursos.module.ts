import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angularMaterial/AngularMaterial.module';
import { CursosComponent } from './cursos.component';
import { AddComponent } from './abm-cursos/add/add.component';
import { DeleteComponent } from './abm-cursos/delete/delete.component';
import { EditComponent } from './abm-cursos/edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    CursosComponent,
    AddComponent,
    DeleteComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule
  ],
  exports: [
    CursosComponent
  ]
})
export class CursosModule { }
