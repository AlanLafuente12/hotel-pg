import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { CategoriaHabitacion } from '../models/CategoriaHabitacion';
import { LoginService } from './login.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoriaHabitacionService {

  API_URI = 'http://localhost:3000/api';
  ruta = 'categoriahabitacion';

  constructor( private http: HttpClient, private loginServ: LoginService ) {
  }

  getCategoriasHabitacion(id: string): any {
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
  getCategoriaHabitacion(id: string): any{
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
  createCategoriaHabitacion(categoriaHabitacion: CategoriaHabitacion): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.post(`${this.API_URI}/${this.ruta}`, categoriaHabitacion, {headers})
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
  updateCategoriaHabitacion(id: string, categoriaHabitacion: CategoriaHabitacion): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.put(`${this.API_URI}/${this.ruta}/${id}`, categoriaHabitacion, {headers})
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
  deleteCategoriaHabitacion(id: string): any{
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
