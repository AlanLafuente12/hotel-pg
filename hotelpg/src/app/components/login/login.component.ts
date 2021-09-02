// Angular
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// Servicios
import { LoginService } from '../../services/login.service';
// Modelos
import { LoginUser } from '../../models/LoginUser';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})

export class LoginComponent implements OnInit {
  @ViewChild('needFocus') needFocus: ElementRef;

  // el formulario que usa esta ventana
  formulario: FormGroup;
  // este objeto sera enviado a los servicios
  loginUser: LoginUser = { };

  // esta variable servira para diferencia entre login de un usuario normal y el de un administrador
  loginType: string;

  constructor(private loginService: LoginService,
              private router: Router,
              public data: ActivatedRoute) {

    // inicializamos la variable
    this.loginType  = data.snapshot.data.loginType;
    console.log('logintype ' + this.loginType);

    // cargamos los controles y sus validadores
    this.formulario = new FormGroup({
      nombre_usuario: new FormControl('', [
                                            Validators.required,
                                            Validators.minLength(3)
                                          ]),
      password: new FormControl('',  [
                                          Validators.required,
                                          Validators.minLength(3)
                                        ])
    });
  }

  ngOnInit(): void {
    this.loginService.limpiarLocalStorage();
    // implementar colores en pagina de login
    if (this.loginType === 'admin'){
      this.loginService.cambiarPorColor('admin'); // color especial para opciones de administrador
    } else if (this.loginType === 'personal'){
      this.loginService.cambiarPorColor('deep_purple'); // color personal (deep purple)
    }else{
      this.loginService.cambiarColor(); // color por defecto
    }
    setTimeout(() => this.needFocus.nativeElement.focus(), 150);
  }

  // metodo para distinguir el tipo de login de la ventana
  login(): void {
    if (this.loginType === 'admin'){
      this.loginAdmin();
    }
    if (this.loginType === 'personal'){
      this.loginPersonal();
    }
    if (this.loginType === 'cliente'){
      this.loginCliente();
    }

  }

  // login de usuarios administrador
  loginAdmin(): void {
    this.cargarDatos();
    this.loginService.loginAdmin(this.loginUser)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.credencialesCorrectas(true);
          this.router.navigate(['']);
        },
        (err: any) => {
          console.log(err);
          this.credencialesCorrectas(false);
        }
      );
  }

  // login para el personal de un hotel
  loginPersonal(): void {
    this.cargarDatos();
    this.loginService.loginPersonal(this.loginUser)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.credencialesCorrectas(true);
          this.router.navigate(['']);
        },
        (err: any) => {
          console.log(err);
          this.credencialesCorrectas(false);
        }
      );
  }

  // login para clientes de la aplicacion
  loginCliente(): void {
    alert('todavia no disponible');
  }

  credencialesCorrectas(correctas: boolean): void{
    if (correctas) {
      Swal.fire({
        icon: 'success',
        title: 'Exito!',
        text: 'Credenciales correctas!'
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Credenciales incorrectas!'
      });
    }
  }

  // este metodo carga los valores del formulario al objeto que sera enviado al servicio
  cargarDatos(): void{
    this.loginUser.nombre_usuario = this.formulario.controls.nombre_usuario.value;
    this.loginUser.password = this.formulario.controls.password.value;
  }
}
