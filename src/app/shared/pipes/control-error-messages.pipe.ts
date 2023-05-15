import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrors'
})
export class ControlErrorsPipe implements PipeTransform {

  transform(error: any, ...args: unknown[]): unknown {
    if (!error || !error.value) return '';

    let defaultMsg = 'Error desconocido';

    const opciones: Record<string, string> = {
      required: 'Este campo es requerido',
      minlength: `Mínimo ${error.value.requiredLength} caracteres`,
      maxlength: `Máximo ${error.value.requiredLength} caracteres`,
      min: 'Debe ser mayor a 0',
      max: 'La nota máxima es 10',
    }

    if (opciones[error.key]) {
      defaultMsg = opciones[error.key]
    }
    return defaultMsg;
  }
}
