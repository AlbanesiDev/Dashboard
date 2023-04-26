import { Component } from '@angular/core';
import { Time } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../core/models';
import { profesores, estudiantes, cursos } from './nav-items';
import { TimeService } from '../core/services/time.service';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  //Sidevar
  showFiller = false;
  panelOpenState = false;
  //ButtonMostrarHora
  mostrarHora = true;
  verHora = 'Ocultar hora';
  //Hora
  horaActual: Time | null = null;
  horaActual$: Observable<string>

  authUser$: Observable<Usuario>;

  linksProfesores = profesores;
  linksEstudiantes = estudiantes;
  linksCursos = cursos;

  destroyed$ = new Subject<void>();

  constructor(
    private timeService: TimeService,
    private authService: AuthService,
    private router: Router
    ) {
    this.horaActual$ = this.timeService.reloj;
    this.authUser$ = this.authService.obtenerUsuarioAutenticado()
  }

  toggleMostrarHora() {
    this.mostrarHora = !this.mostrarHora;
    this.verHora = this.mostrarHora ? 'Ocultar hora' : 'Ver hora';
  }
  ngOnDestroy() {    
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  logout(): void {
    this.router.navigate(['auth', 'login']);
  }
}

