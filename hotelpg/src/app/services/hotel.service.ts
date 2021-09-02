import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Hotel } from '../models/Hotel';
import { LoginService } from './login.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  API_URI = 'http://localhost:3000/api';
  ruta = 'hotel';

  constructor( private http: HttpClient, private loginServ: LoginService ) {
  }
/*
  getHoteles(): any {
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.get(`${this.API_URI}/${this.ruta}`, {headers})
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
  getHotel(id: string): any{
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
  */
  getHoteles(): any {
    return this.http.get(`${this.API_URI}/${this.ruta}`)
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
  getHotel(id: string): any{
    return this.http.get(`${this.API_URI}/${this.ruta}/${id}`)
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
  createHotel(hotel: Hotel): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.post(`${this.API_URI}/${this.ruta}`, hotel, {headers})
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
  updateHotel(id: string, hotel: Hotel): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.put(`${this.API_URI}/${this.ruta}/${id}`, hotel, {headers})
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
  deleteHotel(id: string): any{
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
