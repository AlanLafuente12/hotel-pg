// Angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Servicios
import { LoginService } from '../../../services/login.service';
import { HuespedService } from '../../../services/huesped.service';
// Modelos
import { Huesped } from '../../../models/Huesped';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-huesped-form',
  templateUrl: './huesped-form.component.html',
  styleUrls: []
})
export class HuespedFormComponent implements OnInit {

  formulario: FormGroup;
  huesped: Huesped = { };

  titulo: string;
  editando: boolean = false;
  advertirObligatorios: boolean = false;

  constructor(private huespedService: HuespedService,
              private loginService: LoginService,
              private router: Router,
              public activatedRoute: ActivatedRoute) {

    this.formulario = new FormGroup({
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
      documento_identidad: new FormControl('', [
        Validators.required,
        Validators.minLength(7)
      ]),
      fecha_nacimiento: new FormControl(''),
      estado_civil: new FormControl(''),
      ocupacion: new FormControl(''),
      nacionalidad: new FormControl('', [
        Validators.pattern(/^[a-zA-Z]*$/),
        Validators.minLength(3)
      ]),
      telefono: new FormControl('', [
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(7)
      ]),
      correo: new FormControl('', [
        Validators.email
      ])
    });
  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.huespedService.getHuesped(params.id)
        .subscribe(
          (res: any) => {
            this.huesped = res;
            this.formulario.setValue({
              nombres: this.huesped.nombres,
              primer_apellido: this.huesped.primer_apellido,
              segundo_apellido: this.huesped.segundo_apellido,
              documento_identidad: this.huesped.documento_identidad,
              fecha_nacimiento: this.huesped.fecha_nacimiento === null ? null : this.huesped.fecha_nacimiento.substr(0, 10),
              estado_civil: this.huesped.estado_civil,
              ocupacion: this.huesped.ocupacion,
              nacionalidad: this.huesped.nacionalidad,
              telefono: this.huesped.telefono,
              correo: this.huesped.correo
            });
          },
          (err: any) => {
            console.log(err);
          }
        );
      this.editando = true;
    }
    if (this.editando){
      this.titulo = 'Editar Huésped';
      console.log('editar');
    }
    else{
      this.titulo = 'Agregar Huésped';
      console.log('agregar');
    }
  }

  crearHuesped(): void{
    if (this.formulario.valid)
    {
      this.cargarDatos();
      console.log(this.huesped);
      this.huespedService.createHuesped(this.huesped)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(
            '¡Creado!',
            'El elemento ha sido creado con éxito',
            'success'
            );
          this.router.navigate(['huesped']);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    else{
      this.advertirObligatorios = true;
    }
  }

  modificarHuesped(): void{
    if (this.formulario.valid)
    {
      console.log('modificar huesped');
      this.cargarDatos();
      console.log(this.huesped);
      this.huespedService.updateHuesped(this.huesped.id_huesped.toString(), this.huesped)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(
            '¡Modificado!',
            'El elemento ha sido modificado con éxito',
            'success'
          );
          this.router.navigate(['huesped']);
        },
        (err: any) => {
          console.log(err);
        }
      );
    }
    else{
      this.advertirObligatorios = true;
    }
  }

  cargarDatos(): void{
    // cargando valores del usuario en el objeto
    this.huesped.id_usuario_op = parseInt(this.loginService.idUsuario, 10);
    this.huesped.id_hotel = parseInt(this.loginService.idHotel, 10);

    // cargando valores de formulario en el objeto
    this.huesped.nombres = this.formulario.controls.nombres.value;
    this.huesped.primer_apellido = this.formulario.controls.primer_apellido.value;
    this.huesped.segundo_apellido = this.formulario.controls.segundo_apellido.value;
    this.huesped.documento_identidad = this.formulario.controls.documento_identidad.value;
    this.huesped.fecha_nacimiento = this.formulario.controls.fecha_nacimiento.value === '' ?
      null : this.formulario.controls.fecha_nacimiento.value;
    this.huesped.estado_civil = this.formulario.controls.estado_civil.value;
    this.huesped.ocupacion = this.formulario.controls.ocupacion.value;
    this.huesped.nacionalidad = this.formulario.controls.nacionalidad.value;
    this.huesped.telefono = this.formulario.controls.telefono.value;
    this.huesped.correo = this.formulario.controls.correo.value;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.huesped.last_update = date + ' ' + time;
  }
}
