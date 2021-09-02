// Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Servicios
import { HuespedService } from '../../../services/huesped.service';
import { LoginService } from '../../../services/login.service';
// Modelos
import { Huesped } from '../../../models/Huesped';
// Modulos
import Swal from 'sweetalert2';

@Component({
  selector: 'app-huesped-list',
  templateUrl: './huesped-list.component.html',
  styleUrls: []
})
export class HuespedListComponent implements OnInit {

  huespedes: Huesped[];
  constructor(private huespedService: HuespedService,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.obtenerHuespedes();
  }

  obtenerHuespedes(): void{
    this.huespedService.getHuespedes(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.huespedes = res;
      },
      (err: any) => console.error(err)
    );
  }

  editarHuesped(id: string): void{
    this.router.navigate(['huesped/edit', id]);
  }

  eliminarHuesped(id: string): void{
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
        this.huespedService.deleteHuesped(id)
        .subscribe(
          (res: any) => {
            console.log(res);
            Swal.fire(
              '¡Eliminado!',
              'El elemento ha sido eliminado con éxito',
              'success'
            );
            this.obtenerHuespedes();
          },
          (err: any) => {
            console.log(err);
          }
        );
      }
    });
  }
}
