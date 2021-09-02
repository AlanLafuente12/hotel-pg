import { Injectable } from '@angular/core';

import { LoginService } from './login.service';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(public router: Router, private loginService: LoginService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // recibira la lista de roles esperados
    const expectedRoles = route.data.expectedRoles;
    // recorrer la lista de roles esperados
    for (const expectedRole of expectedRoles){
      // revisar encuentra en la lista de roles
      if (this.loginService.rolUsuario === expectedRole) {
        // retornar que puede continuar
        return true;
      }
    }
    // deslogear
    this.loginService.logout();
    // retornar que no puede continuar
    return false;
  }
}
