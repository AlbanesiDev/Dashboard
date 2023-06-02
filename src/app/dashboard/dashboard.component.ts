import { Component, OnDestroy } from '@angular/core';
import { Time } from '@angular/common';
import { Observable, Subject, map } from 'rxjs';
import { Users } from '../core/models/Users';
import { NavItem, cursos, estudiantes, profesores, usuarios } from '../core/models/Links';
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
  linksUsuarios = usuarios;
  linksProfesores = profesores;
  linksEstudiantes = estudiantes;
  linksCursos = cursos;
  //Auth
  authUser$: Observable<Users | null>;
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

  getFullName(user: Users | null): string {
    if (user) {
      return user.firstName + ' ' + user.lastName;
    }
    return '';
  }

  getRoleStyles(user: Users | null): any {
    if (user) {
      if (user.role === 'Administrador') {
        return { color: '#fc3f3f' };
      } else if (user.role === 'Usuario') {
        return { color: '#7f4edb' };
      }
    }
    return {};
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  Userlogout(): void {
    this.authService.UserLogout();
  }
  
  verifyRole(link: NavItem): Observable<boolean> {
    return this.authUser$.pipe(
      map((user: Users | null) => {
        if (user && link.allowedRoles.length > 0) {
          return link.allowedRoles.includes(user.role);
        }
        return true;
      })
    );
  }
}


