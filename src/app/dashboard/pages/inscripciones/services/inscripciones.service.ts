import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../inscripciones.component';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  private alumnos$ = new BehaviorSubject<Alumno[]>([
    {
      id: 1,
      firstName: 'Carles',
      lastName: 'Vilches',
      course: 'Angular',
      comision: 33210,
      email: 'example@abc',
    },
    {
      id: 2,
      firstName: 'Norma',
      lastName: 'Saavedra',
      course: 'Desarrollo Web',
      comision: 13420,
      email: 'example@abc',
    },
  ]);

  constructor() {}

  obtenerInscripcion(): Observable<Alumno[]> {
    return this.alumnos$.asObservable();
  }
}
