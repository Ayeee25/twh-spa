import { Component, OnInit } from '@angular/core';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { Router } from '@angular/router';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { Data } from 'src/app/_providers/data';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { SelectItem } from 'primeng/api/selectitem';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';


@Component({
  selector: 'app-listaordenrecibo',
  templateUrl: './listaordenrecibo.component.html',
  styleUrls: ['./listaordenrecibo.component.css']
})
export class ListaordenreciboComponent implements OnInit  {
  cols: any[];

  dateInicio: Date = new Date(Date.now()) ;
  dateFin: Date = new Date(Date.now()) ;
  es: any;
  public loading = false;
  ordenes: OrdenRecibo[] = [];
  model: any;
  EstadoId: number;
  selectedRow: OrdenRecibo[] = [];

  clientes: SelectItem[] = [];
  selectedCar2 = 'NESTLE S.A.';
  titularAlerta  = '';



  intervalo: Dropdownlist[] = [
    {val: 0, viewValue: 'Desde Siempre'},
    {val: 1, viewValue: 'Hoy'},
    {val: 3, viewValue: 'Hace tres días'},
    {val: 7, viewValue: 'Hace una semana '},
    {val: 31, viewValue: 'Hace un mes '},
  ];
  estados: SelectItem[] = [
      {value: 4, label: 'Planificado'},
      {value: 5, label: 'Asignado'},
      {value: 6, label: 'Recibiendo'},
      {value: 19, label: 'Pendiente Acomodo'},
      {value: 20, label: 'Pendiente Almacenamiento'},
      {value: 12, label: 'Almacenado'},

  ];
  almacenes: SelectItem[] = [];

  constructor(private ordenreciboService: OrdenReciboService,
              private router: Router,
              private clienteService: ClienteService,
              private generealService: GeneralService,
              private data: Data,
              private alertify: ToastrService

   ) { }



   compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

   compareByValue(f1: any, f2: any) {
     return f1 && f2 && f1.value === f2.value;
   }


  ngOnInit() {

    this.model = {};


    if (localStorage.getItem('dateInicio') === undefined || localStorage.getItem('dateInicio') === null) {
      this.dateInicio.setDate((new Date()).getDate() - 5);
   }
   else {
    this.dateInicio =  new Date(localStorage.getItem('dateInicio'));
   }

    if (localStorage.getItem('dateFin') === undefined || localStorage.getItem('dateFin') === null  ) {
    this.dateFin.setDate((new Date()).getDate() );
  }
 else {
  this.dateFin =  new Date(localStorage.getItem('dateFin'));
 }


    this.model.fec_ini =  this.dateInicio;
    this.model.fec_fin =  this.dateFin ;



    // localStorage.getItem('dateFin', this.dateFin.toDateString());

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      today: 'Hoy',
      clear: 'Borrar'
  };


    this.cols =
    [
        {header: 'ACCIONES', field: 'numOrden' , width: '100px' },
        {header: 'ORDEN', field: 'numOrden'  ,  width: '80px' },
        {header: 'PROPIETARIO', field: 'propietario'  , width: '140px'   },
        {header: 'ESTADO', field: 'nombreEstado'  ,  width: '100px'  },
        {header: 'GR', field: 'guiaRemision' , width: '100px'  },
        {header: 'EQ TRANSP', field: 'equipotransporte'  , width: '140px'  },
        {header: 'F. ESPERADA', field: 'fechaEsperada'  , width: '130px'  },
        {header: 'F. REGISTRO', field: 'fechaRegistro', width: '120px'    },

      ];


    this.model.EstadoId = 4;
    this.generealService.getAllAlmacenes().subscribe(resp => {
            resp.forEach(element => {
              this.almacenes.push({ value: element.id ,  label : element.descripcion});
            });

            this.clienteService.getAllPropietarios('').subscribe(resp1 => {
            resp1.forEach(element => {
              this.clientes.push({ label: element.razonSocial.toUpperCase() , value: element.id });
            });

            if (localStorage.getItem('PropietarioId') === 'undefined' || localStorage.getItem('PropietarioId') == null ) {
              this.model.PropietarioId = 1;
          }
          else {
            this.model.PropietarioId =  parseInt(localStorage.getItem('PropietarioId'), 10);
          }
            if (localStorage.getItem('Estado') == null || localStorage.getItem('Estado') === 'undefined') {
              this.model.EstadoId = 4;
          }
          else {
              this.model.EstadoId = parseInt(localStorage.getItem('Estado') , 10);
          }
            if (localStorage.getItem('AlmacenId') == null || localStorage.getItem('AlmacenId') === 'undefined') {
            this.model.AlmacenId = 1;
          }
          else {
              this.model.AlmacenId = parseInt(localStorage.getItem('AlmacenId'), 10);
          }
            this.ordenreciboService.getAll(this.model).subscribe(list => {
                  this.ordenes = list;

          });
      });

    });
  }


   ver(id){
    this.router.navigate(['/recibo/verordenrecibo', id]);
   }
   edit(id){

     this.router.navigate(['/recibo/editarordenrecibo', id]);
   }
   delete(id){
     this.ordenreciboService.deleteOrder(id).subscribe(resp => {
     this.ordenreciboService.getAll(this.model).subscribe(list => {
          this.ordenes = list;
          this.loading = false;
    });
     }, error => {
      if (error === 'err020') {
        this.alertify.error('Esta Orden de Recibo tiene productos asociados.');
      }
      else {
        this.alertify.error('Ocurrió un error inesperado.');
      }
      }, () => {
      });
   }

   equipotransporte(){
    this.data.storage = this.selectedRow;

    if (this.data.storage.length > 0) {
      this.router.navigate(['/recibo/vincularequipotransporte', ''] );
    }

   }
   openDoor(id) {
    this.router.navigate(['/recibo/asignarpuerta', id]);
   }
   buscar(){
    this.loading = true;

    this.selectedRow = [];

    localStorage.setItem('AlmacenId', this.model.AlmacenId);
    localStorage.setItem('PropietarioId', this.model.PropietarioId);

    localStorage.setItem('dateInicio', this.dateInicio.toDateString());
    localStorage.setItem('dateFin', this.dateFin.toDateString());

    localStorage.setItem('Estado', this.model.EstadoId);

    this.model.fec_ini =  this.dateInicio;
    this.model.fec_fin =  this.dateFin ;

    this.ordenreciboService.getAll(this.model).subscribe(list => {
    this.ordenes = list;
    this.loading = false;
    }, error => {
       this.loading = false;
    } );
   }

}
