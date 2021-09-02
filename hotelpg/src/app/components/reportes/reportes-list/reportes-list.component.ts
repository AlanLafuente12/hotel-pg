// Angular
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reportes-list',
  templateUrl: './reportes-list.component.html',
  styleUrls: []
})
export class ReportesListComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
