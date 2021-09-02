import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { map, catchError } from 'rxjs/operators';
import { throwError, of  } from 'rxjs';
import { LoginUser } from '../models/LoginUser';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // variables generales de usuario
  idUsuario: string;
  nombreUsuario: string;
  rolUsuario: string;
  token: string;
  // variables usuarios de hotel
  idHotel: string;
  nombreHotel: string;
  nombreCompleto: string;
  color: string;

  API_URI = 'http://localhost:3000/api';

  constructor(public router: Router, private http: HttpClient) {
    if (this.estaLogeado()){
      // console.log('esta logeado');
      this.cargarLocalStorage();
      // tslint:disable-next-line: max-line-length
      // console.log( `CONSTRUCTOR idUsuario ${this.idUsuario}, nombreUsuario ${this.nombreUsuario}, nombreCompleto ${this.nombreCompleto}, rolUsuario ${this.rolUsuario}, idHotel ${this.idHotel}, Hotel ${this.nombreHotel}, color ${this.color}`);
    }
    else{
      console.log('no esta logeado');
    }
  }

  estaLogeado(): boolean {
    return localStorage.getItem('token') !== null; // ( this.token.length > 5) ? true : false;
  }

  loginAdmin(loginUser: LoginUser): any{
    return this.http.post(`${this.API_URI}/login/admin`, loginUser).pipe(
      map((resp: any) => {
          this.limpiarLocalStorage(); // remover por precaucion las variables extras de usuario de hotel
          this.guardarLocalStorageBase(resp.usuario.id_administrador, resp.usuario.nombre_usuario, 'admin', resp.tokenUsuario);
          return true;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  loginPersonal(loginUser: LoginUser): any{
    return this.http.post(`${this.API_URI}/login`, loginUser).pipe(
      map((resp: any) => {
          this.guardarLocalStorageBase(resp.usuario.id_usuario_op, resp.usuario.nombre_usuario, resp.usuario.rol, resp.tokenUsuario);
          this.guardarLocalStoragePersonal( resp.usuario.id_hotel, `${resp.usuario.nombres} ${resp.usuario.primer_apellido}`,
                                            resp.usuario.nombre_hotel, resp.usuario.color);
          return true;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  cambiarPasswordAdmin(user: LoginUser): any{
    return this.http.put(`${this.API_URI}/login/admin/reset/${this.idUsuario}`, user).pipe(
      map((resp: any) => {
          return true;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  cambiarPasswordNormal(user: LoginUser): any{
    return this.http.put(`${this.API_URI}/login/reset/${this.idUsuario}`, user).pipe(
      map((resp: any) => {
          return true;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }

  // limpiar local storage y redirigir a login
  logout(): void{
    this.limpiarLocalStorage();
    this.cambiarColor();
    this.router.navigate(['/main']);
  }

  // limpiar todas las variables del local storage
  limpiarLocalStorage(): void{
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('nombre_usuario');
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
    localStorage.removeItem('id_hotel'); // variable usuarios hotel
    localStorage.removeItem('nombre_hotel'); // variable usuarios hotel
    localStorage.removeItem('nombre_completo'); // variable usuarios hotel
    localStorage.removeItem('color'); // variable usuarios hotel
    this.nombreUsuario = '';
    this.idUsuario = '';
    this.rolUsuario = '';
    this.token = '';
    this.idHotel = ''; // variable usuarios hotel
    this.nombreHotel = ''; // variable usuarios hotel
    this.nombreCompleto = ''; // variable usuarios hotel
    this.color = ''; // variable usuarios hotel
  }

  // recargar los valores de las variables usando local storage
  cargarLocalStorage(): void{
    this.idUsuario = localStorage.getItem('id_usuario');
    this.nombreUsuario = localStorage.getItem('nombre_usuario');
    this.rolUsuario = localStorage.getItem('rol');
    this.token = localStorage.getItem('token');
    this.idHotel = localStorage.getItem('id_hotel'); // variable usuarios hotel
    this.nombreHotel = localStorage.getItem('nombre_hotel'); // variable usuarios hotel
    this.nombreCompleto = localStorage.getItem('nombre_completo'); // variable usuarios hotel
    this.color = localStorage.getItem('color'); // variable usuarios hotel
  }

  // guardar las variables de un usuario base
  guardarLocalStorageBase(idUsuario: string, nombreUsuario: string, rolUsuario: string, token: string): void {
    localStorage.setItem('id_usuario', idUsuario);
    localStorage.setItem('nombre_usuario', nombreUsuario);
    localStorage.setItem('rol', rolUsuario);
    localStorage.setItem('token', token);
    this.idUsuario = idUsuario;
    this.nombreUsuario = nombreUsuario;
    this.rolUsuario = rolUsuario;
    this.token = token;
  }

  // guardar los fatos de un usuario personal de hotel
  guardarLocalStoragePersonal(idHotel: string, nombreCompleto: string, nombreHotel: string, color: string): void {
    localStorage.setItem('id_hotel', idHotel);
    localStorage.setItem('nombre_completo', nombreCompleto);
    localStorage.setItem('nombre_hotel', nombreHotel);
    localStorage.setItem('color', color);
    this.idHotel = idHotel;
    this.nombreCompleto = nombreCompleto;
    this.nombreHotel = nombreHotel;
    this.color = color;
  }

  // cambiar color segun el tema
  cambiarColor(): void{
    if (!this.color){
      this.color = 'purple';
    }
    this.setCssProperty('primary1', `var(--${this.color}_primary1)`);
    this.setCssProperty('primary2', `var(--${this.color}_primary2)`);
    this.setCssProperty('primaryshadow', `var(--${this.color}_primaryshadow)`);
    if (this.color === 'soft-black'){
      this.setCssProperty('primarytext', `#ffffff88`);
    }else{
      this.setCssProperty('primarytext', `var(--primary1)`);

    }
  }

    // cambiar color segun el tema
  cambiarPorColor(color: string): void{
    this.setCssProperty('primary1', `var(--${color}_primary1)`);
    this.setCssProperty('primary2', `var(--${color}_primary2)`);
    this.setCssProperty('primaryshadow', `var(--${color}_primaryshadow)`);
    if (color === 'soft-black'){
      this.setCssProperty('primarytext', `#ffffff88`);
    }else{
      this.setCssProperty('primarytext', `var(--primary1)`);
    }
  }

  // probar un color
  probarColor(color: string): void{
    this.setCssProperty('primary1', `var(--${color}_primary1)`);
    this.setCssProperty('primary2', `var(--${color}_primary2)`);
    this.setCssProperty('primaryshadow', `var(--${color}_primaryshadow)`);
  }

  // alterar el estilo del la pagina actual
  setCssProperty(variable: string, value: string): void{
    document.documentElement.style.setProperty(`--${variable}`, value);
  }
}
