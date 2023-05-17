import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, map } from 'rxjs';

interface Time {
    hours: number;
    minutes: number;
    seconds: number;
}

@Injectable({
    providedIn: 'root',
})
export class TimeService {
    private _reloj$ = new BehaviorSubject<Time>(this.currentTime);

    constructor() {
        interval(1000).subscribe(() => {
            this._reloj$.next(this.currentTime);
        });
    }

    get reloj(): Observable<string> {
        return this._reloj$.asObservable().pipe(
            map((time) => {
                return `${time.hours}:${time.minutes}:${time.seconds}`;
            })
        );
    }

    get currentTime(): Time {
        const now = new Date();

        return {
            hours: now.getHours(),
            minutes: now.getMinutes(),
            seconds: now.getSeconds(),
        };
    }
}
