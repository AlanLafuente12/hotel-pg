import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

import { LoginService } from './login.service';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  API_URI = 'http://localhost:3000/api';
  ruta = 'subir';

  constructor( private http: HttpClient, private loginServ: LoginService ) {
  }

  subirImagen(image: File, idHotel: string): any {
    const formData = new FormData();
    formData.append('uploaded_image', image);
    const headers = new HttpHeaders().set('authorization', this.loginServ.token);
    return this.http.put(`${this.API_URI}/${this.ruta}/imagenhotel/${idHotel}`, formData, {headers})
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
