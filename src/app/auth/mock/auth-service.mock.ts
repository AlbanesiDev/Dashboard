import { BehaviorSubject, Observable, of } from 'rxjs';
import { Users } from "src/app/core/models/Users";
import { Login } from "src/app/core/models/Login";

export const USER_ADMIN_MOCK: Users = {
  id: 1,
  firstName: 'Test',
  lastName: 'Admin',
  email: 'TestAdmin@mail.com',
  password: '12345678',
  token: 's3mgTAC6z8Z6YyiJR5Th7Gky2ZkTQIlbPM0lpE0u',
  role: "Administrador",
}

export class AuthServiceMock {

  private authUser$ = new BehaviorSubject<Users | null>(null);

  UserLogin(formValue: Login): void {
    this.authUser$.next(USER_ADMIN_MOCK);
  }

  CheckToken(): Observable<boolean> {
    return of(true);
  }
}