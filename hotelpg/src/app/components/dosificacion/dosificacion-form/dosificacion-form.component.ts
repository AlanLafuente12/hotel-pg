// Angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
// Servicios
import { DosificacionService } from '../../../services/dosificacion.service';
import { LoginService } from '../../../services/login.service';
// Modelos
import { Dosificacion } from '../../../models/Dosificacion';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dosificacion-form',
  templateUrl: './dosificacion-form.component.html',
  styleUrls: []
})
export class DosificacionFormComponent implements OnInit {

  formulario: FormGroup;
  dosificacion: Dosificacion  = { };

  titulo: string;
  advertirObligatorios: boolean = false;

  constructor(private dosificacionService: DosificacionService,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              private loginService: LoginService) {

    this.formulario = new FormGroup({
      numero_autorizacion: new FormControl('',  [
                                                  Validators.required,
                                                  Validators.pattern(/^[0-9]*$/)
                                                ]),
      fecha_limite_emision: new FormControl('',  [
                                                    Validators.required
                                                  ]),
      llave_dosificacion: new FormControl('', [
                                                Validators.required
                                              ]),
      numero_inicial_factura: new FormControl('', [
                                                    Validators.required,
                                                    Validators.pattern(/^[0-9]*$/)
                                                  ]),
      leyenda: new FormControl('',  [
                                      Validators.required,
                                      Validators.minLength(3)
                                    ]),
      numero_autorizacion_confirmacion: new FormControl('',  [
                                                  Validators.required,
                                                  Validators.pattern(/^[0-9]*$/)
                                                ]),
      fecha_limite_emision_confirmacion: new FormControl('',  [
                                                    Validators.required
                                                  ]),
      llave_dosificacion_confirmacion: new FormControl('', [
                                                Validators.required
                                              ]),
      numero_inicial_factura_confirmacion: new FormControl('', [
                                                    Validators.required,
                                                    Validators.pattern(/^[0-9]*$/)
                                                  ]),
      leyenda_confirmacion: new FormControl('',  [
                                      Validators.required,
                                      Validators.minLength(3)
                                    ])
    });
  }

  ngOnInit(): void {
    this.titulo = 'Agregar Dosificación';
  }

  crearDosificacion(): void{
    if (this.formulario.valid){
      if (this.confirmacionesCorrectas()){
        this.cargarDatos();
        this.dosificacionService.createDosificacion(this.dosificacion)
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              '¡Creado!',
              'El elemento ha sido creado con éxito',
              'success'
            );
            this.router.navigate(['dosificacion']);
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
      else{
        Swal.fire(
          '¡Error!',
          'Error con los campos de confirmación',
          'error'
        );
      }
    }
    else{
      this.advertirObligatorios = true;
    }
  }


  cargarDatos(): void{
    // cargando valores del usuario en el objeto
    this.dosificacion.id_usuario_op = parseInt(this.loginService.idUsuario, 10);
    this.dosificacion.id_hotel = parseInt(this.loginService.idHotel, 10);

    // cargando valores de formulario en el objeto
    this.dosificacion.numero_autorizacion = this.formulario.controls.numero_autorizacion.value;
    this.dosificacion.fecha_limite_emision = this.formulario.controls.fecha_limite_emision.value;
    this.dosificacion.llave_dosificacion = this.formulario.controls.llave_dosificacion.value;
    this.dosificacion.numero_inicial_factura = this.formulario.controls.numero_inicial_factura.value;
    this.dosificacion.numero_actual_factura = this.formulario.controls.numero_inicial_factura.value;
    this.dosificacion.leyenda = this.formulario.controls.leyenda.value;
  }

  confirmacionesCorrectas(): boolean{
    return  this.formulario.controls.numero_autorizacion.value === this.formulario.controls.numero_autorizacion_confirmacion.value &&
            this.formulario.controls.fecha_limite_emision.value === this.formulario.controls.fecha_limite_emision_confirmacion.value &&
            this.formulario.controls.llave_dosificacion.value === this.formulario.controls.llave_dosificacion_confirmacion.value &&
            this.formulario.controls.numero_inicial_factura.value === this.formulario.controls.numero_inicial_factura_confirmacion.value &&
            this.formulario.controls.leyenda.value === this.formulario.controls.leyenda_confirmacion.value;
  }
}

