type NavItem = {
  path: string;
  title: string;
}

const profesores: NavItem[] = [
  {
    path: 'profesores',
    title: 'Profesores',
  }
]

const estudiantes: NavItem[] = [
  {
    path: 'alumnos',
    title: 'Alumnos',
  },
  {
    path: 'inscripciones',
    title: 'Inscripciones',
  },
]

const cursos: NavItem[] = [
  {
    path: 'cursos',
    title: 'Cursos',
  },
]

export { profesores, estudiantes, cursos };


