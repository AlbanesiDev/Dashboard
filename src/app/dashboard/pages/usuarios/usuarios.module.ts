import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './abm-usuarios/add/add.component';
import { EditComponent } from './abm-usuarios/edit/edit.component';
import { DeleteComponent } from './abm-usuarios/delete/delete.component';
import { AngularMaterialModule } from 'src/app/shared/angularMaterial/AngularMaterial.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { DetallesComponent } from './detalles/detalles.component';
import { FormsModule } from '@angular/forms';
import { UsuariosComponent } from './usuarios.component';

@NgModule({
  declarations: [
    AddComponent,
    EditComponent,
    DeleteComponent,
    DetallesComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    PipesModule,
    FormsModule,
  ],
  exports: [
    UsuariosComponent
  ]
})
export class usuariosModule { }
