// Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
// Servicios
import { DosificacionService } from '../../../services/dosificacion.service';
import { LoginService } from '../../../services/login.service';
// Modelos
import { Dosificacion } from '../../../models/Dosificacion';


@Component({
  selector: 'app-dosificacion-view',
  templateUrl: './dosificacion-view.component.html',
  styleUrls: []
})
export class DosificacionViewComponent implements OnInit {

  dosificaciones: Dosificacion[];
  ultimaDosificacion: Dosificacion;

  constructor(private dosificacionService: DosificacionService,
              private router: Router,
              public activatedRoute: ActivatedRoute,
              private loginService: LoginService) { }

  ngOnInit(): void {
    this.obtenerDosificaciones();
    this.obtenerUltimaDosificacion();
  }

  obtenerDosificaciones(): void{
    this.dosificacionService.getDosificaciones(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.dosificaciones = res;
      },
      (err: any) => console.error(err)
    );
  }
  obtenerUltimaDosificacion(): void{
    this.dosificacionService.getLastDosificacion(this.loginService.idHotel).subscribe(
      (res: any) => {
        this.ultimaDosificacion = res;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  agregarDosificacion(): void{
    this.router.navigate(['dosificacion/add']);
  }
}

