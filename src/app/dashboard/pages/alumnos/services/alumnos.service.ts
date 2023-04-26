import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alumno } from '../alumnos.component';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  private alumnos$ = new BehaviorSubject<Alumno[]>([
    {
      id: 1,
      firstName: 'Alba',
      lastName: 'Robledo',
      course: 'Angular',
      note: 10,
      email: 'example@abc'
    },
    {
      id: 2,
      firstName: 'Amelia',
      lastName: 'Calleja',
      course: 'Angular',
      note: 4,
      email: 'example@abc'
    },
    {
      id: 3,
      firstName: 'Cristobal',
      lastName: 'Huertas',
      course: 'React',
      note: 7,
      email: 'example@abc'
    },
    {
      id: 4,
      firstName: 'Felisa',
      lastName: 'Almeida',
      course: 'Desarrollo Web',
      note: 10,
      email: 'example@abc'
    },
    {
      id: 5,
      firstName: 'Oliva',
      lastName: 'Tovar',
      course: 'Javascript',
      note: 8,
      email: 'example@abc'
    },
  ]);
  constructor() {}

  obtenerInscripcion(): Observable<Alumno[]> {
    return this.alumnos$.asObservable();
  }
}
