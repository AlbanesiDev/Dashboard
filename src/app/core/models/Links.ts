export interface NavItem {
  path: string;
  title: string;
  allowedRoles: string[];
}

export const usuarios: NavItem[] = [
  {
    path: 'usuarios',
    title: 'Usuarios',
    allowedRoles: ['Administrador'],
  }
]

export const profesores: NavItem[] = [
  {
    path: 'profesores',
    title: 'Profesores',
    allowedRoles: ['Administrador'],
  }
]

export const estudiantes: NavItem[] = [
  {
    path: 'alumnos',
    title: 'Alumnos',
    allowedRoles: [''],
  },
  {
    path: 'inscripciones',
    title: 'Inscripciones',
    allowedRoles: [''],
  },
]

export const cursos: NavItem[] = [
  {
    path: 'cursos',
    title: 'Cursos',
    allowedRoles: ['Administrador', 'Usuario'],
  },
]