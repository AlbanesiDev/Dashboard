import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from "@angular/router";
import { TestBed } from '@angular/core/testing';
import { AuthService } from "./auth.service";
import { Login } from "../models/Login";
import { Users } from "../models/Users";
import { skip } from 'rxjs';
import { enviroment } from "src/app/environments/Test";

describe('Pruebas del AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('El UserLogin debe funcionar.', (done) => {
    const loginTest: Login = {
      email: 'UserTest@mail.com',
      password: '12345678'
    };
    const MOCK_REQUEST_RESULT: Users[] = [
      {
        id: 1,
        firstName: 'User',
        lastName: 'Test',
        email: loginTest.email,
        password: loginTest.password,
        token: 'iA6rUahrvQOTMdXpKyWuHjO12LowOE7GQqxqfbi3',
        role: 'Usuario'
      }
    ];

    spyOn(TestBed.inject(Router), 'navigate');
    service
      .getUserAuthenticated()
      .pipe(skip(1))
      .subscribe((usuario) => {
        expect(usuario).toEqual(MOCK_REQUEST_RESULT[0]);
        done();
      });
    service.UserLogin(loginTest);
    httpController
      .expectOne({
        url: `${enviroment.apiBaseUrl}/Users?email=${loginTest.email}&password=${loginTest.password}`,
        method: 'GET',
      })
      .flush(MOCK_REQUEST_RESULT);
  });

  it('El UserLogout debe emitir un authUser null, remover el token del LocalStorage y redireccionar al Login.',
    () => {
      const spyOnNavigate = spyOn(TestBed.inject(Router), 'navigate');
      const loginTest: Login = {
        email: 'UserTest@mail.com',
        password: '12345678',
      };
      const MOCK_REQUEST_RESULT: Users[] = [
        {
          id: 1,
          firstName: 'User',
          lastName: 'Test',
          email: loginTest.email,
          password: loginTest.password,
          token: 'iA6rUahrvQOTMdXpKyWuHjO12LowOE7GQqxqfbi3',
          role: 'Usuario'
        },
      ];

      service.UserLogin(loginTest);
      httpController
        .expectOne({
          url: `${enviroment.apiBaseUrl}/Users?email=${loginTest.email}&password=${loginTest.password}`,
          method: 'GET',
        })
        .flush(MOCK_REQUEST_RESULT);

      service.UserLogout();
      const tokenLs = localStorage.getItem('token');
      expect(tokenLs).toBeNull();
      expect(spyOnNavigate).toHaveBeenCalled();
    });
});