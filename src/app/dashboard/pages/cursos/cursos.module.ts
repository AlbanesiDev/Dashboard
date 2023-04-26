import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angularMaterial/AngularMaterial.module';
import { CursosComponent } from './cursos.component';
import { CrudCursosComponent } from './crud-cursos/crud-cursos.component';



@NgModule({
  declarations: [
    CursosComponent,
    CrudCursosComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ]
})
export class CursosModule { }
