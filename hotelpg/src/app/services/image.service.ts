import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { LoginService } from './login.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  API_URI = 'http://localhost:3000/api';
  ruta = 'image';

  constructor( private http: HttpClient, private loginServ: LoginService ) {
  }

  getImagen(nombreImagen: string): any {
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.get(`${this.API_URI}/${this.ruta}/${nombreImagen}`, {headers})
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

  getImagePath(): string{
    return `${this.API_URI}/${this.ruta}/`;
  }
}
