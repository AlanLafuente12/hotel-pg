import { Injectable } from '@angular/core';

import { LoginService } from './login.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DefaultRoutingService implements CanActivate {

  constructor(public router: Router, private loginService: LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // verificar si esta logeado
    if (!this.loginService.estaLogeado()) {
      // deslogear
      this.loginService.logout();
      // redireccionar a login
      this.router.navigate(['main']);
    }else{
      switch (this.loginService.rolUsuario) {
        case 'admin':
          // redireccionar a hoteles
          this.router.navigate(['hotel']);
          break;
        case 'gerente':
          // redireccionar a usuarios
          this.router.navigate(['hotel/manage']);
          break;
        case 'empleado':
          // redireccionar a hospedajes
          this.router.navigate(['hospedaje']);
          break;
      }
    }
    return false;
  }
}
