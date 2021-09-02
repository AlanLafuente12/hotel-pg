import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { Admin } from '../models/Admin';
import { LoginService } from './login.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  API_URI = 'http://localhost:3000/api';
  ruta = 'admin';

  constructor( private http: HttpClient, private loginServ: LoginService ) {
  }
  getAdmins(): any{
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
  getAdmin(id: string): any{
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
  createAdmin(admin: Admin): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.post(`${this.API_URI}/${this.ruta}`, admin, {headers})
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
  updateAdmin(id: string, admin: Admin): any{
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.put(`${this.API_URI}/${this.ruta}/${id}`, admin, {headers})
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
  deleteAdmin(id: string): any{
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
  resetPasswordAdmin(admin: Admin): any{
    return this.http.put(`${this.API_URI}/login/admin/reset/${admin.id_administrador}`, admin).pipe(
      map((resp: any) => {
          return true;
      }),
      catchError(err => {
        return throwError(err);
      })
    );
  }
}
