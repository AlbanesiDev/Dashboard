import { Pipe, PipeTransform } from '@angular/core';
import { Students } from 'src/app/core/models/Students';

@Pipe({
  name: 'fullname'
})
export class FullnamePipe implements PipeTransform {

  transform(value: Students, ...args: unknown[]): unknown {
    return `${value.firstName} ${value.lastName}`;
  }

}
