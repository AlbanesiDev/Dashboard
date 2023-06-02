import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, catchError, throwError } from 'rxjs';
import { Users } from '../models/Users';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/Login';
import { enviroment } from 'src/app/environments/Test';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { SetUserAuthenticated, RemoveUserAuthenticated } from 'src/app/store/auth/auth.actions';
import { selectAuthUser } from 'src/app/store/auth/auth.selectors';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUser$ = new BehaviorSubject<Users | null>(null);

  constructor(private router: Router, private httpClient: HttpClient, private store: Store<AppState>) { }

  getUserAuthenticated(): Observable<Users | null> {
    return this.store.select(selectAuthUser);
  }
  
  SetUserAuthenticated(usuario: Users): void {    
    this.store.dispatch(SetUserAuthenticated({ payload: usuario }))
    this.authUser$.next(usuario)
  }


  UserLogin(formValue: Login): void {
    this.httpClient
      .get<Users[]>(`${enviroment.apiBaseUrl}/Users`, {
        params: {
          ...formValue,
        },
      })
      .subscribe({
        next: (users) => {
          const UserAuthenticated = users[0];
          if (UserAuthenticated) {
            localStorage.setItem('token', UserAuthenticated.token);
            this.SetUserAuthenticated(UserAuthenticated);
            this.router.navigate(['dashboard']);
          } else {
            this.showInvalidData();
          }
        },
      });
  }

  UserLogout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(RemoveUserAuthenticated());
    this.router.navigate(['auth']);
  }

  CheckToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<Users[]>(
      `${enviroment.apiBaseUrl}/Users?token=${token}`,
      {
        headers: new HttpHeaders({
          Authorization: token || '',
        }),
      }
    )
    .pipe(
      map((users) => {
        const UserAuthenticated = users[0];
        if (UserAuthenticated) {
          localStorage.setItem('token', UserAuthenticated.token);
          this.SetUserAuthenticated(UserAuthenticated);
        }
        return !!UserAuthenticated;
      }),
      catchError((err) => {
        this.showInvalidToken();
        return throwError(() => err);
      })
    );
  }

  UserRegister(Usuarios: Users): void {
    this.httpClient
      .post<Users>(`${enviroment.apiBaseUrl}/Users`, Usuarios)
      .subscribe(() => {
        this.showRegistrationSuccessful();
      });
  }

  showRegistrationSuccessful() {
    Swal.fire({
      title: 'Registro exitoso',
      icon: 'success',
      showConfirmButton: false,
      timer: 1700,
    });
  }
  showInvalidData() {
    Swal.fire({
      title: '¡Usuario y/o contraseña incorrectos!',
      icon: 'warning',
      showConfirmButton: true,
    });
  }
  showInvalidToken() {
    Swal.fire({
      title: 'Error al verificar el token',
      icon: 'error',
      showConfirmButton: true,
    });
  }
}
