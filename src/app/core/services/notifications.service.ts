import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificationsService {

  private mensaje$ = new Subject()

  constructor() {
    // const obs = new Observable((suscriber) => {
    //   suscriber.next(1)
    //   suscriber.next(2)
    // })

    // if (obs instanceof Observable) {
    //   /// true
    // }


    // // SALIDA... 1 .... 2,
    // obs.subscribe((v) => console.log(v))


    const obs = new Subject();

    // obs.next(1)

    // SALIDA... 1 .... 2,
    // obs.subscribe((v) => console.log(v))


    // this.mensaje$.subscribe((msg) => alert(msg));
  }

  mostrarMensaje(msg: string) {
    this.mensaje$.next(msg);
  };
}
