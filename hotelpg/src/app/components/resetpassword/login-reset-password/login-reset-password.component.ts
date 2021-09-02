// Angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// Servicios
import { LoginService } from '../../../services/login.service';
// Modelos
import { LoginUser } from '../../../models/LoginUser';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-reset-password',
  templateUrl: './login-reset-password.component.html',
  styleUrls: []
})
export class LoginResetPasswordComponent implements OnInit {

  formulario: FormGroup;
  loginUser: LoginUser = { };

  advertirObligatorios: boolean = false;

  constructor(private loginService: LoginService,
              public activatedRoute: ActivatedRoute,
              private router: Router) {

    this.formulario = new FormGroup({
      password_actual: new FormControl('', [
                                            Validators.required,
                                            Validators.minLength(3)
                                          ]),
      password_nuevo: new FormControl('',  [
                                          Validators.required,
                                          Validators.minLength(7)
                                        ]),
      password_nuevo_confirmacion: new FormControl('',  [
                                          Validators.required,
                                          Validators.minLength(7)
                                        ])
    });
  }

  ngOnInit(): void {
  }

  cambiarPassword(): void{
    if (this.formulario.valid)
    {
      if (this.formulario.controls.password_nuevo.value === this.formulario.controls.password_nuevo_confirmacion.value)
      {
        this.cargarDatosLoginActual();

        // para usuarios admin
        if (this.loginService.rolUsuario === 'admin')
        {
          // vertificar login actual
          this.loginService.loginAdmin(this.loginUser)
          .subscribe(
            (res: any) => {
              // cargar nuevo password
              this.cargarDatosLoginNuevo();
              this.loginService.cambiarPasswordAdmin(this.loginUser)
              .subscribe(
                (res2: any) => {
                  console.log(res2);
                  Swal.fire(
                    '¡Éxito!',
                    'La contraseña ha sido actualizada',
                    'success'
                  );
                  this.router.navigate(['hotel']);
                },
                (err2: any) => {
                  console.log(err2);
                  Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Hubo un problema'
                  });
                }
              );
            },
            (err: any) => {
              console.log(err);
              Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Credenciales incorrectas'
              });
            }
          );
        }
        // para usuarios normales
        else{
          // vertificar login actual
          this.loginService.loginPersonal(this.loginUser)
          .subscribe(
            (res: any) => {
              // cargar nuevo password
              this.cargarDatosLoginNuevo();
              this.loginService.cambiarPasswordNormal(this.loginUser)
              .subscribe(
                // tslint:disable-next-line: no-shadowed-variable
                (res2: any) => {
                  console.log(res2);
                  Swal.fire(
                    '¡Éxito!',
                    'La contraseña ha sido actualizada',
                    'success'
                  );
                  this.router.navigate(['hotel']);
                },
                (err2: any) => {
                  console.log(err2);
                  Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Hubo un problema'
                  });
                }
              );
            },
            (err: any) => {
              console.log(err);
              Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Credenciales incorrectas'
              });
            }
          );
        }
      }
      else{
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Las contraseñas no coinciden'
        });
      }
    }
    else{
      this.advertirObligatorios = true;
    }
  }

  cargarDatosLoginActual(): void{
    this.loginUser.nombre_usuario = this.loginService.nombreUsuario;
    this.loginUser.password = this.formulario.controls.password_actual.value;
  }
  cargarDatosLoginNuevo(): void{
    this.loginUser.nombre_usuario = this.loginService.nombreUsuario;
    this.loginUser.password = this.formulario.controls.password_nuevo.value;
  }
}
