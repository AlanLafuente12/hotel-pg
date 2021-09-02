import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Habitacion } from '../models/Habitacion';
import { LoginService } from './login.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  API_URI = 'http://localhost:3000/api';
  ruta = 'habitacion';

  constructor( private http: HttpClient, private loginServ: LoginService ) {
  }

  getHabitaciones(id: string): any {
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
  getHabitacionesLibres(id: string): any {
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.get(`${this.API_URI}/${this.ruta}/list/libres/${id}`, {headers})
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
  getHabitacion(id: string): any{
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
  createHabitacion(habitacion: Habitacion): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.post(`${this.API_URI}/${this.ruta}`, habitacion, {headers})
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
  updateHabitacion(id: string, habitacion: Habitacion): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.put(`${this.API_URI}/${this.ruta}/${id}`, habitacion, {headers})
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
  deleteHabitacion(id: string): any{
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
}
