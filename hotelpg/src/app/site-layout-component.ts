import { Component } from '@angular/core';

@Component({
  selector: 'app-site-layout',
  template: `
  <!-- Top Navigation -->
  <app-navbar></app-navbar>
  <!-- Content -->
  <div class="main-panel">
    <router-outlet></router-outlet>
  </div>`,
  styles: []
})
export class SiteLayoutComponent {}
