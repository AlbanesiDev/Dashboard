import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map, catchError, throwError } from 'rxjs';
import { Register } from '../models/Register';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/Login';
import { enviroment } from 'src/app/environments/Test';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUser$ = new BehaviorSubject<Register | null>(null);

  constructor(private router: Router, private httpClient: HttpClient) { }

  getUserAuthenticated(): Observable<Register | null> {
    return this.authUser$.asObservable();
  }
  
  UserLogin(formValue: Login): void {
    this.httpClient
      .get<Register[]>(`${enviroment.apiBaseUrl}/Users`, {
        params: {
          ...formValue,
        },
      })
      .subscribe({
        next: (users) => {
          const UserAuthenticated = users[0];
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

  UserLogout(): void {
    localStorage.removeItem('token');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }

  CheckToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<Register[]>(
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

  UserRegister(user: Register): void {
    this.httpClient
      .post<Register>(`${enviroment.apiBaseUrl}/Users`, user)
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
