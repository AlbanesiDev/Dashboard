import { Injectable } from '@angular/core';
export interface Curso {
  id: string;
  nombre: string;
  imagen: string;
  comision: string;
}
@Injectable({
  providedIn: 'root'
})
export class CursosService {
  
  cursos = [
    {
      id: 1,
      nombre:'Angular',
      imagen:'/assets/Cards/Angular.png',
      comision:'',
      profesor: 'Juan Pérez',
      fechaInicio: '01/06/2023',
      fechaFin: '31/07/2023'
    },
    {
      id: 2,
      nombre:'Desarrollo Web',
      imagen:'/assets/Cards/DesarrolloWeb.png',
      comision:'',
      profesor: 'Juan Pérez',
      fechaInicio: '01/06/2023',
      fechaFin: '31/07/2023'
    },    
    {
      id: 3,
      nombre:'Javascript',
      imagen:'/assets/Cards/Javascript.png',
      comision:'',
      profesor: 'Juan Pérez',
      fechaInicio: '01/06/2023',
      fechaFin: '31/07/2023'
    },
    {
      id: 4,
      nombre:'React',
      imagen:'/assets/Cards/React.png',
      comision:'',
      profesor: 'Juan Pérez',
      fechaInicio: '01/06/2023',
      fechaFin: '31/07/2023'
    },    {
      id: 5,
      nombre:'UX/UI',
      imagen:'/assets/Cards/ui-ux.png',
      comision:'',
      profesor: 'Juan Pérez',
      fechaInicio: '01/06/2023',
      fechaFin: '31/07/2023'
    },
    {
      id: 6,
      nombre:'Vue',
      imagen:'/assets/Cards/Vue.png',
      comision:'',
      profesor: 'Juan Pérez',
      fechaInicio: '01/06/2023',
      fechaFin: '31/07/2023'
    },
  ]
  constructor() { }
}
