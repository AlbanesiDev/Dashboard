import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, catchError, throwError } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/Login';
import { enviroment } from 'src/app/environments/Test';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUser$ = new BehaviorSubject<Usuario | null>(null);

  constructor(private router: Router, private httpClient: HttpClient) { }

  getUserAuthenticated(): Observable<Usuario | null> {
    return this.authUser$.asObservable();
  }

  Userlogin(formValue: Login): void {
    this.httpClient
      .get<Usuario[]>(`${enviroment.apiBaseUrl}/usuarios`, {
        params: {
          ...formValue,
        },
      })
      .subscribe({
        next: (usuarios) => {
          const UserAuthenticated = usuarios[0];
          if (UserAuthenticated) {
            localStorage.setItem('token', UserAuthenticated.token);
            this.authUser$.next(UserAuthenticated);
            this.router.navigate(['dashboard']);
          } else {
            this.showInvalidData();
          }
        },
      });
  }

  Userlogout(): void {
    localStorage.removeItem('token');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }

  CheckToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<Usuario[]>(
      `${enviroment.apiBaseUrl}/usuarios?token=${token}`,
      {
        headers: new HttpHeaders({
          Authorization: token || '',
        }),
      }
    )
    .pipe(
      map((usuarios) => {
        const UserAuthenticated = usuarios[0];
        if (UserAuthenticated) {
          localStorage.setItem('token', UserAuthenticated.token);
          this.authUser$.next(UserAuthenticated);
        }
        return !!UserAuthenticated;
      }),
      catchError((err) => {
        this.showInvalidToken();
        return throwError(() => err);
      })
    );
  }

  UserRegister(user: Usuario): void {
    this.httpClient
      .post<Usuario>(`${enviroment.apiBaseUrl}/usuarios`, user)
      .subscribe((response) => {
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
