import { Component, OnDestroy } from '@angular/core';
import { Time } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { Register } from '../core/models/Register';
import { cursos, estudiantes, profesores } from '../core/models/Links';
import { TimeService } from '../core/services/time.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {
  
  //Sidevar
  showFiller = false;
  panelOpenState = false;
  //ButtonMostrarHora
  mostrarHora = true;
  verHora = 'Ocultar hora';
  //Hora
  horaActual: Time | null = null;
  horaActual$: Observable<string>
  //Links
  linksProfesores = profesores;
  linksEstudiantes = estudiantes;
  linksCursos = cursos;
  //Auth
  authUser$: Observable<Register | null>;
  destroyed$ = new Subject<void>();

  constructor(
    private timeService: TimeService,
    private authService: AuthService,
  ) {
    this.horaActual$ = this.timeService.reloj;
    this.authUser$ = this.authService.getUserAuthenticated();
  }

  toggleMostrarHora() {
    this.mostrarHora = !this.mostrarHora;
    this.verHora = this.mostrarHora ? 'Ocultar hora' : 'Ver hora';
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  Userlogout(): void {
    this.authService.UserLogout();
  }
}


