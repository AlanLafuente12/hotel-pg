// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// Servicios
import { LoginService } from '../../../services/login.service';
import { ImageService } from '../../../services/image.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: []
})
export class NavbarComponent implements OnInit {

  constructor(public loginService: LoginService,
              public imageService: ImageService,
              private router: Router){
    if (this.loginService.rolUsuario === 'admin'){
      this.loginService.cambiarPorColor('admin');
    }else{
      this.loginService.cambiarColor();
    }
  }

  getImageSrc(): string{
    // return this.imageService.getImagePath() + this.loginService.logo;
    return this.imageService.getImagePath() + 'hotel-' + this.loginService.idHotel + '.png';
  }

  ngOnInit(): void {
  }

  editarHotel(): void{
    this.router.navigate(['hotel/edit/' + this.loginService.idHotel]);
  }
}
