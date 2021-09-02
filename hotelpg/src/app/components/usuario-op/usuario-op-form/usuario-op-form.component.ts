// Angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Servicios
import { HotelService } from '../../../services/hotel.service';
import { UsuarioOpService } from '../../../services/usuario-op.service';
import { LoginService } from '../../../services/login.service';
// Modelos
import { Hotel } from '../../../models/Hotel';
import { UsuarioOp } from '../../../models/UsuarioOp';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-op-form',
  templateUrl: './usuario-op-form.component.html',
  styleUrls: []
})
export class UsuarioOpFormComponent implements OnInit {

  formulario: FormGroup;
  usuarioOp: UsuarioOp = { };
  tipoUsuarios: string;

  titulo: string;
  editando: boolean = false;
  advertirObligatorios: boolean = false;

  // lista de hoteles
  hoteles: Hotel[];
  hotelesResult: Hotel[] = [];
  hotelAsignado: Hotel = null;

  constructor(private usuarioOpService: UsuarioOpService,
              private hotelService: HotelService,
              public loginService: LoginService,
              private router: Router,
              public activatedRoute: ActivatedRoute) {

    this.formulario = new FormGroup({
      nombre_usuario: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      password_nuevo: new FormControl('',  [
        Validators.required,
        Validators.minLength(7)
      ]),
      password_repetir_nuevo: new FormControl('',  [
        Validators.required,
        Validators.minLength(7)
      ]),
      nombres: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      primer_apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      segundo_apellido: new FormControl('', [
        Validators.minLength(3)
      ]),
      // rol: new FormControl('', Validators.required), // no se asignaran roles
      id_hotel: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.tipoUsuarios = this.activatedRoute.snapshot.data.navbarTitle;
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.usuarioOpService.getUsuario(params.id)
        .subscribe(
          (res: any) => {
            this.usuarioOp = res;
            this.formulario.setValue({
                  nombre_usuario: this.usuarioOp.nombre_usuario,
                  password_nuevo: '',
                  password_repetir_nuevo: '',
                  nombres: this.usuarioOp.nombres,
                  primer_apellido: this.usuarioOp.primer_apellido,
                  segundo_apellido: this.usuarioOp.segundo_apellido,
                  // rol: this.usuarioOp.rol, // no se asignaran roles
                  id_hotel: ''
                  // si se instancia 1 control, tienen que instanciarse todos
                });
          },
          (err: any) => {
            console.log(err);
          }
        );
      // deshabilitar nombre de usuario
      // this.formulario.controls.nombre_usuario.disable();
      // instanciando la variable 'editando'
      this.editando = true;
    }
    if (this.editando){
      if (this.tipoUsuarios === 'Empleados'){
        this.titulo = 'Editar Empleado';
      }
      if (this.tipoUsuarios === 'Gerentes'){
        this.titulo = 'Editar Gerente';
      }
      console.log('editar');
    }
    else{
      if (this.tipoUsuarios === 'Empleados'){
        this.titulo = 'Agregar Empleado';
      }
      if (this.tipoUsuarios === 'Gerentes'){
        this.titulo = 'Agregar Gerente';
      }
      console.log('agregar');
    }
    this.cargarHoteles();
  }

  cargarHoteles(): void{
    // obtener los lista de hoteles
    this.hotelService.getHoteles().subscribe(
      (res: any) => {
        this.hoteles = res;

        // si esta editando
        if (this.editando || this.loginService.rolUsuario === 'gerente'){
          // buscar el hotel del usuario en la lista de hoteles
          for (const hotel of this.hoteles){
            if (hotel.id_hotel === this.usuarioOp.id_hotel ||
                hotel.id_hotel === parseInt(this.loginService.idHotel, 10)){
              this.hotelAsignado = hotel;
              this.asignarHotel(hotel);
              break;
            }
          }
        }
      },
      (err: any) => console.error(err)
    );
  }

  crearUsuario(): void{
    if (this.formulario.valid){

      // asignar rol segun el tipo de ventana
      if (this.tipoUsuarios === 'Empleados'){
        this.usuarioOp.rol = 'empleado';
      }
      if (this.tipoUsuarios === 'Gerentes'){
        this.usuarioOp.rol = 'gerente';
      }

      this.cargarDatos();
      console.log(this.usuarioOp);
      this.usuarioOpService.createUsuario(this.usuarioOp)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(
            '¡Creado!',
            'El elemento ha sido creado con exito',
            'success'
            );

          // redireccionar segun tipo de ventana
          if (this.tipoUsuarios === 'Empleados'){
            this.router.navigate(['empleado']);
          }
          if (this.tipoUsuarios === 'Gerentes'){
            this.router.navigate(['gerente']);
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    else{
      this.advertirObligatorios = true;
      console.log('advertir obligatorios');
    }
  }

  modificarUsuario(): void {
    if (this.formulario_valido()){
      console.log(this.usuarioOp.nombre_hotel);
      this.cargarDatos();
      console.log(this.usuarioOp);
      this.usuarioOpService.updateUsuario(this.usuarioOp.id_usuario_op.toString(), this.usuarioOp)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(
            '¡Modificado!',
            'El elemento ha sido modificado con exito',
            'success'
          );

          // redireccionar segun tipo de ventana
          if (this.tipoUsuarios === 'Empleados'){
            this.router.navigate(['empleado']);
          }
          if (this.tipoUsuarios === 'Gerentes'){
            this.router.navigate(['gerente']);
          }
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    else{
      console.log('algo falla en el formulario :/');
      this.advertirObligatorios = true;
    }
  }

  buscarHotel(texto: string): void{
    const auxResult: Hotel[] = [];
    if (texto.length > 0){
      for (const hotel of this.hoteles){
        const nombre = hotel.nombre_hotel.toLocaleLowerCase();
        if (nombre.indexOf(texto) >= 0){
          auxResult.push(hotel);
        }
      }
    }
    this.hotelesResult = auxResult;
  }

  // este metodo es usado desde el archivo html
  asignarHotel(asignado: Hotel): void{
    // instancia el objeto hotel que es usado por el control 'id_hotel' del formulario
    this.hotelAsignado = asignado;
    // vacia la lista de hoteles buscado
    this.hotelesResult = [];
    // selecciona el hotel en el control 'id_hotel' del formulario
    this.formulario.controls.id_hotel.setValue(asignado.id_hotel);
  }

  cargarDatos(): void{
    // cargando valores del usuario en el objeto
    this.usuarioOp.id_hotel = parseInt(this.loginService.idHotel, 10);

    // cargando valores de formulario en el objeto
    this.usuarioOp.nombre_usuario = this.formulario.controls.nombre_usuario.value;
    this.usuarioOp.password = this.formulario.controls.password_nuevo.value;
    this.usuarioOp.nombres = this.formulario.controls.nombres.value;
    this.usuarioOp.primer_apellido = this.formulario.controls.primer_apellido.value;
    this.usuarioOp.segundo_apellido = this.formulario.controls.segundo_apellido.value;
    // this.usuarioOp.rol = this.formulario.controls.rol.value;
    this.usuarioOp.id_hotel = this.formulario.controls.id_hotel.value;
  }

  // valida todos los controles excepto password (modificar usuario)
  formulario_valido(): boolean{
    return (this.formulario.controls.nombre_usuario.valid &&
    this.formulario.controls.nombres.valid &&
    this.formulario.controls.primer_apellido.valid &&
    this.formulario.controls.segundo_apellido.valid &&
    // this.formulario.controls.rol.valid &&
    this.formulario.controls.id_hotel.valid);
  }
}
