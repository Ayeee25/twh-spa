import { Component, OnInit } from '@angular/core';
import { Dropdownlist } from 'src/app/_models/Constantes';

import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';

import { Router } from '@angular/router';
import { Carga } from 'src/app/_models/Despacho/carga';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { SelectItem } from 'primeng/api/selectitem';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listadocarga',
  templateUrl: './listadocarga.component.html',
  styleUrls: ['./listadocarga.component.css']
})
export class ListadocargaComponent implements OnInit {




  public loading = false;
  lines: Carga[] = [];

  ordenesaux: Carga[] = [];
  model: any  = {};

  selectedRow: Carga[] = [];
  clientes: SelectItem[] = [];
  EstadoId: number;

  intervalo: Dropdownlist[] = [
    {val: 0, viewValue: 'Desde Siempre'},
    {val: 1, viewValue: 'Hoy'},
    {val: 3, viewValue: 'Hace tres días'},
    {val: 7, viewValue: 'Hace una semana '},
    {val: 31, viewValue: 'Hace un mes '},
  ];
  estados: Dropdownlist[] = [
      {val: 25, viewValue: 'Pendiente'},
      {val: 26, viewValue: 'Confirmado'},
      {val: 27, viewValue: 'Despachado'},
  ];

  cols: any[];

  constructor(private ordensalidaService: OrdenSalidaService
    ,         private alertify: ToastrService ,
              private clienteService: ClienteService,
              private router: Router) { }

  ngOnInit() {



    this.selectedRow = [];
    this.cols =
    [
        {header: 'Acciones', field: 'acciones' , width: '60px'},
        {header: 'N° Trabajo', field: 'workNum'  ,  width: '180px' },
        {header: 'Propietario', field: 'propietario'  , width: '280px'   },
        {header: ' Placa', field: 'placa'  , width: '140px'  },
        {header: 'Equipo Transporte', field: 'equipoTransporte'  , width: '130px'  },
        {header: 'Estado', field: 'estado', width: '120px'    },
        {header: 'Destino', field: 'destino', width: '120px'   },

    ];


    this.clienteService.getAllPropietarios('').subscribe(resp => {
      this.clientes.push({ value: 0 , label: 'Todos los propietarios'});
      resp.forEach(element => {
        this.clientes.push({ value: element.id , label: element.razonSocial});
      });

      this.model.EstadoId = 25;
      this.model.PropietarioId = 0;
      this.ordensalidaService.getAllCargas_pendientes(this.model).subscribe(list => {

        this.lines = list;
        console.log(this.lines);
        });
    });
  }
ver (id,propietarioid) {
  let url = 'http://104.36.166.65/reptwh/impresioneulen_twh.aspx?idordendespacho=' + String(id) ;
 window.open(url);; 

}

  checkSelects() {
    return  this.selectedRow.length > 0 ?  false : true;
  }

  asignar() {
    let ids = '';
    this.selectedRow.forEach(el => {
          ids = ids + ',' + el.id;
    });
    this.model.ids = ids.substring(1, ids.length + 1);
    this.router.navigate(['/despacho/equipotransportesalida', this.model.ids]);

 }
 darsalida() {
  let ids = '';
  this.selectedRow.forEach(el => {
        ids = ids + ',' + el.id;

    });
  this.model.ids = ids.substring(1, ids.length + 1);


  this.ordensalidaService.registrar_salidacarga(this.model).subscribe(x =>
      {
           this.buscar();
           this.alertify.success('Se ha registrado la salida con éxito');
    });
 }
  buscar() {
    this.selectedRow = [];

    this.model.EstadoId = 25;
    this.ordensalidaService.getAllCargas_pendientes(this.model).subscribe(list => {
    this.lines = list;
      });
    }

}
