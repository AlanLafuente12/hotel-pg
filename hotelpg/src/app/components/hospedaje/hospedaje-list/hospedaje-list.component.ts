// Angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// Servicios
import { HospedajeService } from '../../../services/hospedaje.service';
import { LoginService } from '../../../services/login.service';
// Modelos
import { Hospedaje } from '../../../models/Hospedaje';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospedaje-list',
  templateUrl: './hospedaje-list.component.html',
  styleUrls: []
})
export class HospedajeListComponent implements OnInit {

  formulario: FormGroup;

  // categoria de habitacion a editar o crear
  hospedaje: Hospedaje = { };
  // lista de categorias de habitacion
  hospedajes: Hospedaje[];

  // variable que indica si se esta editando un elemento de la lista
  editando: boolean = false;
  advertirObligatorios: boolean = false;

  constructor(private hospedajeService: HospedajeService,
              private loginService: LoginService,
              public activatedRoute: ActivatedRoute,
              private router: Router) {

    this.formulario = new FormGroup({
      nombre_titular: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  ngOnInit(): void {
    this.obtenerHospedajes();
  }

  obtenerHospedajes(): void{
    this.hospedajeService.getHospedajes(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.hospedajes = res;
      },
      (err: any) => console.error(err)
    );
  }

  crearHospedaje(): void{
    if (this.formulario.valid)
    {
      this.cargarDatos();
      this.hospedajeService.createHospedaje(this.hospedaje)
      .subscribe(
        (res: any) => {
          Swal.fire(
            '¡Creado!',
            'El elemento ha sido creado con éxito',
            'success'
          );
          this.obtenerHospedajes();
          this.limpiarFormulario();
          // cerrar modal
          document.getElementById('btnCloseModal').click();
          // ir a vista
          this.router.navigate(['hospedaje/view', res.insertId]);
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

  verHospedaje(id: string): void{
    console.log('apretado');
    this.router.navigate(['hospedaje/view', id]);
  }

  comenzarEdicionHospedaje(hospedaje: Hospedaje): void{
    // cambiar variable editando a verdadero
    this.editando = true;
    // limpiar datos de formulario
    this.formulario.controls.nombre_titular.setValue(hospedaje.nombre_titular);
    // asignar el hospedaje recuperado al hospedaje que se enviara al servicio
    this.hospedaje = hospedaje;
    // limpiar datos que no se estan modificando
    this.hospedaje.check_in = undefined;
    this.hospedaje.check_out = undefined;
  }

  editarHospedaje(): void{
    if (this.formulario.valid)
    {
      this.cargarDatos();
      // tslint:disable-next-line: max-line-length
      this.hospedajeService.updateHospedaje(this.hospedaje.id_hospedaje.toString(), this.hospedaje)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(
            '¡Modificado!',
            'El elemento ha sido modificado con éxito',
            'success'
          );
          this.obtenerHospedajes();
          this.limpiarFormulario();
          // cambiar el estado de editando a falso
          this.editando = false;
          // cerrar modal
          document.getElementById('btnCloseModal').click();
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

  eliminarHospedaje(id: string): void{
    Swal.fire({
      title: '¿Está seguro de eliminar este elemento?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.hospedajeService.deleteHospedaje(id)
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              '¡Eliminado!',
              'El elemento ha sido eliminado con éxito',
              'success'
            );
            this.obtenerHospedajes();
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    });
  }

  cargarDatos(): void{
    // cargando valores del usuario en el objeto
    this.hospedaje.id_usuario_op = parseInt(this.loginService.idUsuario, 10);
    this.hospedaje.id_hotel = parseInt(this.loginService.idHotel, 10);

    // cargando valores de formulario en el objeto
    this.hospedaje.nombre_titular = this.formulario.controls.nombre_titular.value;
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    this.hospedaje.last_update = date + ' ' + time;
  }

  limpiarFormulario(): void{
    // no advertir de obligatorios
    this.advertirObligatorios = false;
    // limpiar datos de objeto
    this.hospedaje = {};

    // limpiar datos de formulario
    this.formulario.controls.nombre_titular.setValue('');
  }
}
