// Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reserva-list',
  templateUrl: './reserva-list.component.html',
  styleUrls: []
})
export class ReservaListComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
