import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser$ = new Subject<Usuario>();

  constructor() { }

  obtenerUsuarioAutenticado(): Observable<Usuario> {
    return this.authUser$.asObservable();
  }

  login(usuario: Usuario): void {
    this.authUser$.next(usuario);
  }
}
