// Angular
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// Servicios
import { AdminService } from '../../../services/admin.service';
// Modelos
import { Admin } from '../../../models/Admin';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador-form',
  templateUrl: './administrador-form.component.html',
  styleUrls: []
})
export class AdministradorFormComponent implements OnInit {

  formulario: FormGroup;
  admin: Admin = { };

  titulo: string;
  editando: boolean = false;
  advertirObligatorios: boolean = false;

  constructor(private adminService: AdminService,
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
                                        ])
    });

  }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params.id){
      this.adminService.getAdmin(params.id)
        .subscribe(
          (res: any) => {
            this.admin = res;
            this.formulario.setValue({
              nombre_usuario: this.admin.nombre_usuario,
              password_nuevo: '',
              password_repetir_nuevo: ''
            });
          },
          (err: any) => {
            console.log(err);
          }
        );
      this.editando = true;
    }
    if (this.editando){
      this.titulo = 'Editar Admin';
      console.log('editar');
    }
    else{
      this.titulo = 'Agregar Admin';
      console.log('agregar');
    }
  }

  crearAdmin(): void{
    if (this.formulario.valid)
    {
      if (this.formulario.controls.password_nuevo.value === this.formulario.controls.password_repetir_nuevo.value)
      {
        this.cargarDatos();
        console.log(this.admin);
        this.adminService.createAdmin(this.admin)
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res.ok === false){
              Swal.fire(
                '¡Error!',
                res.mensaje ,
                'error'
              );
            }else{
              Swal.fire(
                '¡Creado!',
                'El elemento ha sido creado con éxito',
                'success'
              );
            }
            this.router.navigate(['admin']);
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Las contraseñas no coinciden!'
        });
      }
    }
    else{
      this.advertirObligatorios = true;
    }
  }

  modificarAdmin(): void{
    if (this.formulario.controls.nombre_usuario.valid)
    {
      this.cargarDatos();
      console.log(this.admin);
      this.adminService.updateAdmin(this.admin.id_administrador.toString(), this.admin)
      .subscribe(
        (res: any) => {
          console.log(res);
          Swal.fire(
            '¡Modificado!',
            'El elemento ha sido modificado con éxito',
            'success'
          );
          this.router.navigate(['admin']);
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
    this.admin.nombre_usuario = this.formulario.controls.nombre_usuario.value;
    this.admin.password = this.formulario.controls.password_nuevo.value;
  }
}
