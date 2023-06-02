// External Dependencies
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Internal Dependencies
import { DashboardComponent } from './dashboard.component';

import { PipesModule } from '../shared/pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { AngularMaterialModule } from '../shared/angularMaterial/AngularMaterial.module';

import { AlumnosModule } from './pages/alumnos/alumnos.module';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { CursosModule } from './pages/cursos/cursos.module';
import { CursosComponent } from './pages/cursos/cursos.component';
import { ProfesoresModule } from './pages/profesores/profesores.module';
import { ProfesoresComponent } from './pages/profesores/profesores.component';
import { InscripcionesModule } from './pages/inscripciones/inscripciones.module';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';
import { AdminGuard } from '../auth/guards/admin.guard';
import { usuariosModule } from './pages/usuarios/usuarios.module';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    AngularMaterialModule,
    DirectivesModule,
    PipesModule,
    AlumnosModule,
    CursosModule,
    InscripcionesModule,
    ProfesoresModule,
    usuariosModule,
    RouterModule.forChild([
      {
        path: 'usuarios',
        canActivate: [AdminGuard],
        component: UsuariosComponent
      },
      {
        path: 'profesores',
        canActivate: [AdminGuard],
        component: ProfesoresComponent
      },
      {
        path: 'alumnos',
        component: AlumnosComponent
      },
      {
        path: 'cursos',
        component: CursosComponent
      },
      {
        path: 'inscripciones',
        component: InscripcionesComponent
      }
    ])
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
