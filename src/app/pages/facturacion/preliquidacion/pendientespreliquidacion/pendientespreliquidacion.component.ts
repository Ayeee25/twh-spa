import { Component, OnInit } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { FormControl } from '@angular/forms';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { takeUntil } from 'rxjs/operators';
import { FacturacionService } from 'src/app/_services/Facturacion/facturacion.service';
import { PreLiquidacion } from 'src/app/_models/Facturacion/preliquidacion';
import * as moment from 'moment';
import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-pendientespreliquidacion',
  templateUrl: './pendientespreliquidacion.component.html',
  styleUrls: ['./pendientespreliquidacion.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class PendientespreliquidacionComponent implements OnInit {

  sum: number ;
  columnDefinitions: any;
  dataset: any[] = [];

  public loading = false;
  ordenes: PreLiquidacion[] = [];
  model: any  = {};
  ClienteId: number ;

  clientes: Dropdownlist[] = [];
  EstadoId: number;
  context;

  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();

  constructor( private clienteService: ClienteService,
               private alertify: ToastrService,
               private facturacionService: FacturacionService) { }

  ngOnInit() {
    this.columnDefinitions = [
      {header: 'PRODUCTO', field: 'numOrden'  ,  width: '280px' },
      {header: 'IN', field: 'propietario'  , width: '100px'   },
      {header: 'OUT', field: 'nombreEstado'  ,  width: '100px'  },
      {header: 'POS', field: 'guiaRemision' , width: '100px'  },
      {header: 'SEGURO', field: 'equipotransporte'  , width: '100px'  },
      {header: 'PICKING', field: 'fechaEsperada'  , width: '100px'  },
      {header: 'DESPACHO', field: 'fechaEsperada'  , width: '100px'  },
      {header: 'TOTAL', field: 'fechaRegistro', width: '120px'    },
    ];


    this.clienteService.getAllPropietarios('').subscribe(resp => {
      resp.forEach(element => {
        this.clientes.push({ val: element.id , viewValue: element.razonSocial});
      });
      this.filteredClientes.next(this.clientes.slice());
      this.ClientesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
            this.filterBanks();
          });
      this.loading = false;
    });

    this.loading = true;
    this.model.intervalo = 3;
    this.model.estadoIdfiltro = 21;
    this.model.PropietarioFiltroId = 1;

    this.EstadoId = this.model.estadoIdfiltro;
    this.model.PropietarioFiltroId = this.model.PropietarioId ;

  }

  protected filterBanks() {
    if (!this.clientes) {
      return;
    }
    let search = this.ClientesFilterCtrl.value;
    if (!search) {
      this.filteredClientes.next(this.clientes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredClientes.next(
      this.clientes.filter(bank => bank.viewValue.toLowerCase().indexOf(search) > -1)
    );

  }
  buscar(){

    this.loading = true;
    if (this.model.FechaInicio === undefined)
    {
        this.alertify.error('Seleccione una fecha de inicio');
        this.loading = false;
        return ;
    }
    if (this.model.FechaFin === undefined)
    {
        this.alertify.error('Seleccione una fecha de fin');
        this.loading = false;
        return ;
    }
    if (this.model.PropietarioId === undefined)
    {
        this.alertify.error('Seleccione un propietario');
        this.loading = false;
        return ;
    }

    this.model.InicioCorte = moment(this.model.FechaInicio).format('DD/MM/YYYY');
    this.model.FinCorte = moment(this.model.FechaFin).format('DD/MM/YYYY');
    this.model.PropietarioFiltroId = this.model.PropietarioId ;




    this.facturacionService.getPendientesLiquidacion(this.model.PropietarioFiltroId , this.model).subscribe(list => {

     this.sum = 0;

     list.forEach(x => {
        this.sum = this.sum + x.total;
      });

     this.ClienteId = this.model.PropietarioFiltroId;
     this.ordenes = list;

     this.loading = false;

      }, error => {
        this.loading = false;
      });
  }

  generar() {

    if (this.model.FechaInicio === undefined)
    {
        this.alertify.error('Seleccione una fecha de inicio');
        return ;
    }
    if (this.model.FechaFin === undefined)
    {
        this.alertify.error('Seleccione una fecha de fin');
        return ;
    }
    if (this.model.PropietarioId === undefined)
    {
        this.alertify.error('Seleccione un propietario');
        return ;
    }

    this.model.InicioCorte = moment(this.model.FechaInicio).format('DD/MM/YYYY');
    this.model.FinCorte = moment(this.model.FechaFin).format('DD/MM/YYYY');

    if (this.ClienteId === undefined){
      this.alertify.success('Debe cargar un cliente.');
      return;
    }
    this.model.ClienteId = this.ClienteId;
    this.facturacionService.generar_preliquidacion(this.model).subscribe(resp => {

     let url = 'http://104.36.166.65/reptwh/Rep_Liquidacion.aspx?clienteid=' + String(this.ClienteId) +
      '&fecinicio=' + this.model.InicioCorte +  '&fecfin=' + this.model.FinCorte;
     window.open(url);
    });
  }
  preliminar(){

    if (this.model.FechaInicio === undefined)
    {
        this.alertify.error('Seleccione una fecha de inicio');
        return ;
    }
    if (this.model.FechaFin === undefined)
    {
        this.alertify.error('Seleccione una fecha de fin');
        return ;
    }
    if (this.model.PropietarioId === undefined)
    {
        this.alertify.error('Seleccione un propietario');
        return ;
    }

    this.model.InicioCorte = moment(this.model.FechaInicio).format('DD/MM/YYYY');
    this.model.FinCorte = moment(this.model.FechaFin).format('DD/MM/YYYY');


    this.model.ClienteId = this.ClienteId;
    const url = 'http://104.36.166.65/reptwh/Rep_Liquidacion.aspx?clienteid=' + String(this.model.PropietarioId) +
      '&fecinicio=' + this.model.InicioCorte +  '&fecfin=' + this.model.FinCorte;
    window.open(url);

  }

}
