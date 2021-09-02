import { Component } from '@angular/core';

@Component({
  selector: 'app-base-layout',
  template: `
  <!-- Content -->
  <router-outlet></router-outlet>`,
  styles: []
})
export class BaseLayoutComponent {}
