import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Hospedaje, HospedajeHabitacion, HospedajeProducto, HospedajeHuesped } from '../models/Hospedaje';
import { LoginService } from './login.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HospedajeService {

  API_URI = 'http://localhost:3000/api';
  ruta = 'hospedaje';

  constructor( private http: HttpClient, private loginServ: LoginService ) {
  }

  getHospedajes(id: string): any {
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.get(`${this.API_URI}/${this.ruta}/list/${id}`, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }
  getHospedaje(id: string): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.get(`${this.API_URI}/${this.ruta}/${id}`, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }
  createHospedaje(hospedaje: Hospedaje): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.post(`${this.API_URI}/${this.ruta}`, hospedaje, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }
  updateHospedaje(id: string, hospedaje: Hospedaje): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.put(`${this.API_URI}/${this.ruta}/${id}`, hospedaje, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }
  deleteHospedaje(id: string): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.delete(`${this.API_URI}/${this.ruta}/${id}`, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }

  // HUESPED
  getHospedajeHuespedes(idHospedaje: string): any {
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.get(`${this.API_URI}/${this.ruta}/huesped/${idHospedaje}`, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }
  createHospedajeHuesped(hospedajeHuesped: HospedajeHuesped): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.post(`${this.API_URI}/${this.ruta}/huesped`, hospedajeHuesped, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }
  deleteHospedajeHuesped(idhosp: string, idhues: string): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.delete(`${this.API_URI}/${this.ruta}/huesped/${idhosp}/${idhues}`, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }

  // HABITACION
  getHospedajeHabitaciones(idHospedaje: string): any {
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.get(`${this.API_URI}/${this.ruta}habitacion/${idHospedaje}`, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }
  createHospedajeHabitacion(hospedajeHabitacion: HospedajeHabitacion): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.post(`${this.API_URI}/${this.ruta}habitacion`, hospedajeHabitacion, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }
  updateHospedajeHabitacion(hospedajeHabitacion: HospedajeHabitacion): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.put(`${this.API_URI}/${this.ruta}habitacion`, hospedajeHabitacion, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }
  deleteHospedajeHabitacion(idhosp: string, idhab: string): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.delete(`${this.API_URI}/${this.ruta}habitacion/${idhosp}/${idhab}`, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }

  // PRODUCTO
  getHospedajeProductos(idHospedaje: string): any {
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.get(`${this.API_URI}/${this.ruta}producto/${idHospedaje}`, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }
  createHospedajeProducto(hospedajeProducto: HospedajeProducto): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.post(`${this.API_URI}/${this.ruta}producto`, hospedajeProducto, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }
  updateHospedajeProducto(hospedajeProducto: HospedajeProducto): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.put(`${this.API_URI}/${this.ruta}producto`, hospedajeProducto, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }
  deleteHospedajeProducto(idhosp: string, idprod: string): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.delete(`${this.API_URI}/${this.ruta}producto/${idhosp}/${idprod}`, {headers})
      .pipe(
        map( (resp: any) => {
          return resp;
        }),
        catchError( err => {
          this.loginServ.logout();
          return throwError(err);
        })
      );
  }
}
