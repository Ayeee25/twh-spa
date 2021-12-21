import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listarubicacion',
  templateUrl: './listarubicacion.component.html',
  styleUrls: ['./listarubicacion.component.css']
})
export class ListarubicacionComponent implements OnInit {
 loading = true;
 tarifas: any = [];
 columnDefinitions: any = [];
 model: any;
 almacenes: any[];
  constructor() { }

  ngOnInit() {
  }
 buscar() {

 }
 open(){

 }
}
