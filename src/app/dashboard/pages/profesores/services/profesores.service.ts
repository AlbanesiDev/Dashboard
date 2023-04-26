import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profesor } from '../profesores.component';

@Injectable({
  providedIn: 'root',
})
export class ProfesoresService {
  private alumnos$ = new BehaviorSubject<Profesor[]>([
    {
      id: 1,
      firstName: 'Amelia',
      lastName: 'Mayo',
      course: 'Angular',
      comision: 33210,
      email: 'example@abc'
    },
    {
      id: 2,
      firstName: 'Cynthia',
      lastName: 'Paz',
      course: 'Angular',
      comision: 40300,
      email: 'example@abc'
    },
    {
      id: 3,
      firstName: 'Alain',
      lastName: 'Corrales',
      course: 'React',
      comision: 12023,
      email: 'example@abc'
    },
    {
      id: 4,
      firstName: 'Abdelaziz',
      lastName: 'Granados',
      course: 'Desarrollo Web',
      comision: 13420,
      email: 'example@abc'
    },
    {
      id: 5,
      firstName: 'Estela',
      lastName: 'Avila',
      course: 'Javascript',
      comision: 18272,
      email: 'example@abc'
    },
  ]);

  constructor() {}

  obtenerInscripcion(): Observable<Profesor[]> {
    return this.alumnos$.asObservable();
  }
}
