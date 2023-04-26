import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfesoresComponent } from './dashboard/pages/profesores/profesores.component';
import { AlumnosComponent } from './dashboard/pages/alumnos/alumnos.component';
import { InscripcionesComponent } from './dashboard/pages/inscripciones/inscripciones.component';
import { CursosComponent } from './dashboard/pages/cursos/cursos.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'profesores',
        children: [
          {
            path: '',
            component: ProfesoresComponent,
          },
        ],
      },
      {
        path: 'alumnos',
        children: [
          {
            path: '',
            component: AlumnosComponent,
          },
        ],
      },
      {
        path: 'inscripciones',
        children: [
          {
            path: '',
            component: InscripcionesComponent,
          },
        ],
      },
      {
        path: 'cursos',
        children: [
          {
            path: '',
            component: CursosComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
