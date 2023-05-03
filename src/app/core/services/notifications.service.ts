import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {
  private mensaje$ = new Subject()
  constructor() {
    const obs = new Subject();
  }
  mostrarMensaje(msg: string) {
    this.mensaje$.next(msg);
  };
}
