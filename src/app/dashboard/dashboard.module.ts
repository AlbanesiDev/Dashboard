import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../shared/angularMaterial/AngularMaterial.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { CursosModule } from './pages/cursos/cursos.module';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';
import { ProfesoresModule } from './pages/profesores/profesores.module';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
    DirectivesModule,
    PipesModule,
    AppRoutingModule,
    AlumnosModule,
    CursosModule,
    InscripcionesModule,
    ProfesoresModule,
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
