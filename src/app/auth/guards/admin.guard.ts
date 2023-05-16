import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(private authService: AuthService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.authService.getUserAuthenticated()
        .pipe(
            map((usuarioAutenticado) => {
                if (usuarioAutenticado?.role !== 'Administrador') {
                    this.invalidRole()
                    return false;
                } else {
                    return true;
                }
            })
        )
    }

    invalidRole() {
        Swal.fire({
            title: 'No tienes los permisos suficientes para acceder a esta ruta',
            icon: 'error',
            showConfirmButton: true,
        });
    }
}
