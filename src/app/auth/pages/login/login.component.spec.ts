import { LoginComponent } from "./login.component";
import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { AngularMaterialModule } from "src/app/shared/angularMaterial/AngularMaterial.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "src/app/shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from "src/app/core/services/auth.service";
import { AuthServiceMock } from "../../mock/auth-service.mock";

describe('Pruebas del LoginComponent', () => {
    let component: LoginComponent;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LoginComponent
            ],
            imports: [
                HttpClientModule,
                AngularMaterialModule,
                ReactiveFormsModule,
                RouterTestingModule,
                SharedModule,
                BrowserAnimationsModule
            ],
            providers: [
                {
                    provide: AuthService,
                    useClass: AuthServiceMock,
                }
            ]
        }).compileComponents();
        const fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Si el campo de email no ha sido completado, entonces el FormControl del email debe ser marcado como inválido.', () => {
        component.loginForm.setValue({ email: null, password: null })
        expect(component.emailControl.invalid).toBeTrue();
    });
    it('Si el campo contraseña no ha sido completado, entonces el FormControl de contraseña debe ser marcado como inválido.', () => {
        component.loginForm.setValue({ email: null, password: null })
        expect(component.passwordControl.invalid).toBeTrue();
    });
    it('Si el loginForm es inválido, tiene que marcar todos los controles como touched.', () => {
        component.loginForm.setValue({ email: null, password: null })
        const spyOnMarkAllAsTouched = spyOn(component.loginForm, 'markAllAsTouched');
        component.onSubmit();
        expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
    });
    it('Si el loginForm es válido, debe llamarse al método UserLogin del AuthService.', () => {
        component.loginForm.setValue({ email: 'TestAdmin@mail.com', password: '12345678' });
        const spyOnAuthServiceLogin = spyOn(TestBed.inject(AuthService), 'UserLogin');
        component.onSubmit();
        expect(component.loginForm.valid).toBeTrue();
        expect(spyOnAuthServiceLogin).toHaveBeenCalled();
    });
});