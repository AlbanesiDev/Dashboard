import { BehaviorSubject, Observable, of } from 'rxjs';
import { Register } from "src/app/core/models/Register";
import { Login } from "src/app/core/models/Login";

export const USER_ADMIN_MOCK: Register = {
  id: 1,
  firstName: 'Test',
  lastName: 'Admin',
  email: 'TestAdmin@mail.com',
  password: '12345678',
  token: 's3mgTAC6z8Z6YyiJR5Th7Gky2ZkTQIlbPM0lpE0u',
  role: "Administrador",
}

export class AuthServiceMock {

  private authUser$ = new BehaviorSubject<Register | null>(null);

  UserLogin(formValue: Login): void {
    this.authUser$.next(USER_ADMIN_MOCK);
  }

  CheckToken(): Observable<boolean> {
    return of(true);
  }
}