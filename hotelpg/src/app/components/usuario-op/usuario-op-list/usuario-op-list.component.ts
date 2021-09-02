// Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Servicios
import { UsuarioOpService } from '../../../services/usuario-op.service';
import { LoginService } from '../../../services/login.service';
// Modelos
import { UsuarioOp } from '../../../models/UsuarioOp';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-op-list',
  templateUrl: './usuario-op-list.component.html',
  styleUrls: []
})
export class UsuarioOpListComponent implements OnInit {

  usuarios: UsuarioOp[];
  tipoUsuarios: string;

  constructor(private usuarioOpService: UsuarioOpService,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              public loginService: LoginService) { }

  ngOnInit(): void {
    this.tipoUsuarios = this.activatedRoute.snapshot.data.navbarTitle;
    this.obtenerUsuarios();
  }

  agregarNuevo(): void{
    if (this.tipoUsuarios === 'Empleados'){
      this.router.navigate(['empleado/add']);
    }
    if (this.tipoUsuarios === 'Gerentes'){
      this.router.navigate(['gerente/add']);
    }
  }

  obtenerUsuarios(): void{
    if (this.loginService.rolUsuario === 'admin'){
      this.obtenerGerentes();
    }
    if (this.loginService.rolUsuario === 'gerente'){
      this.obtenerUsuariosDeHotel();
    }
  }

  obtenerGerentes(): void{
    this.usuarioOpService.getUsuariosGerentes().subscribe(
      (res: any) => {
        this.usuarios = res;
      },
      (err: any) => console.error(err)
    );
  }

  obtenerUsuariosDeHotel(): void{
    this.usuarioOpService.getUsuariosDeHotel(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.usuarios = this.extraerPorRol(res);
      },
      (err: any) => console.error(err)
    );
  }

  extraerPorRol(listaUsuarios: UsuarioOp[]): any{
    const listaResultante: UsuarioOp[] = [];
    if (listaUsuarios.length > 0){
      for (const usuario of listaUsuarios){
          if (this.tipoUsuarios === 'Empleados'){
            if (usuario.rol === 'empleado'){
              listaResultante.push(usuario);
            }
          }
          if (this.tipoUsuarios === 'Gerentes'){
            if (usuario.rol === 'gerente'){
              listaResultante.push(usuario);
            }
          }
      }
    }
    return listaResultante;
  }

  editarUsuario(id: string): void{
    if (this.tipoUsuarios === 'Empleados'){
      this.router.navigate(['empleado/edit', id]);
    }
    if (this.tipoUsuarios === 'Gerentes'){
      this.router.navigate(['gerente/edit', id]);
    }
  }

  eliminarUsuario(id: string): void{
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
        this.usuarioOpService.deleteUsuario(id)
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              '¡Eliminado!',
              'El elemento ha sido eliminado con éxito',
              'success'
            );
            this.obtenerUsuarios();
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    });
  }
}
