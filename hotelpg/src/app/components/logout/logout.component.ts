// Angular
import { Component, OnInit, Input  } from '@angular/core';
// Servicios
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(public loginService: LoginService) {
  }

  ngOnInit(): void {
    console.log('logout by logout component');
    this.loginService.logout();
  }
}

