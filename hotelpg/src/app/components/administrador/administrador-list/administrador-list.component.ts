// Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Servicios
import { AdminService } from '../../../services/admin.service';
// Modelos
import { Admin } from '../../../models/Admin';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador-list',
  templateUrl: './administrador-list.component.html',
  styleUrls: []
})
export class AdministradorListComponent implements OnInit {

  admins: Admin[];
  constructor(private adminService: AdminService,
              private router: Router,
              public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerAdmins();
  }

  obtenerAdmins(): void{
    this.adminService.getAdmins().subscribe(
      (res: any) => {
        this.admins = res;
      },
      (err: any) => console.error(err)
    );
  }

  resetPasswordAdmin(admin: Admin): void{
    console.log(admin);
    Swal.fire({
      title: '¿Está seguro de reestablecer el password de este administrador?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        admin.password = this.generarStringAleatorio(7);
        this.adminService.resetPasswordAdmin(admin)
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              'Password reestablecido!',
              'El nuevo password del usuario es: ' + admin.password,
              'success'
            );
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    });
  }

  generarStringAleatorio(length: any): string {
    let result             = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  editarAdmin(id: string): void{
    this.router.navigate(['admin/edit', id]);
  }

  eliminarAdmin(id: string): void{
    Swal.fire({
      title: '¿Está seguro de eliminar este administrador?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteAdmin(id)
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              '¡Eliminado!',
              'El administrador ha sido eliminado con éxito',
              'success'
            );
            this.obtenerAdmins();
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    });
  }
}
