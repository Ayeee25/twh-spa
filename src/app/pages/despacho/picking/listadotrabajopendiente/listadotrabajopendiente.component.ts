import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { OrdenSalida } from 'src/app/_models/Despacho/ordenrecibo';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { Carga } from 'src/app/_models/Despacho/Carga';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { Router } from '@angular/router';
import { DialogAsignarPuerta } from 'src/app/pages/modal/ModalAsignarPuerta/ModalAsignarPuerta.component';
import { DialogAsignarTrabajador } from 'src/app/pages/modal/ModalAsignarTrabajador/ModalAsignarTrabajador.component';
import { AuthService } from 'src/app/_services/auth.service';
import { SelectItem } from 'primeng/api/selectitem';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-listadotrabajopendiente',
  templateUrl: './listadotrabajopendiente.component.html',
  styleUrls: ['./listadotrabajopendiente.component.css']
})
export class ListadoTrabajoPendienteComponent implements OnInit {


  constructor(private ordensalidaService: OrdenSalidaService,
              private alertify: ToastrService ,
              private router: Router,
              public dialog: MatDialog,
              private clienteService: ClienteService,
              public authService: AuthService) {
   }


  el: any[] = [];

  public loading = false;
  cargas: Carga[] = [];

  ordenesaux: OrdenSalida[] = [];
  model: any  = {};

  cols: any[];
  clientes: SelectItem[] = [];
  EstadoId: number;


  estados: Dropdownlist[] = [
      {val: 21, viewValue: 'Planeado'},
      {val: 5, viewValue: 'Asignado'},
      {val: 6, viewValue: 'Recibiendo'},
    {val: 12, viewValue: 'Almacenado'},
  ];
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();

  selectedRow: Carga[] = [];

  selection = new SelectionModel<Carga>(true, []);

  ngOnInit() {

    this.cols =
    [

        {header: 'ACCIONES', field: 'workNum' , width: '110px' },
        {header: 'Almacén', field: 'almacen'  ,  width: '150px' },
        {header: 'Propietario', field: 'propietario'  , width: '160px'   },
        {header: 'N° Trabajo', field: 'workNum'  ,  width: '120px' },
        {header: 'Orden Salida', field: 'numOrden'  , width: '160px'   },
        {header: 'Guía Remisión', field: 'guiaRemision'  , width: '160px'   },
        {header: 'Ubicación', field: 'ubicacion'  , width: '160px'   },
        {header: '# Pallets', field: 'cantidadLPN'  , width: '100px'  },
        {header: '# Bultos', field: 'cantidadTotal'  , width: '100px'  },
        {header: 'Estado', field: 'estado', width: '120px' },
      ];



    this.clienteService.getAllPropietarios('').subscribe(resp => {
      resp.forEach(element => {
        this.clientes.push({ value: element.id ,  label : element.razonSocial});
      });
      this.loading = false;
    });



    this.loading = true;
    this.model.intervalo = 3;
    this.model.estadoIdfiltro = 30;
    this.model.PropietarioFiltroId = 1;
    this.EstadoId = this.model.estadoIdfiltro;
    this.model.PropietarioId = this.model.PropietarioFiltroId;
    this.model.PropietarioId = 1;
    this.model.EstadoId = 30;

    this.ordensalidaService.getAllWork(this.model).subscribe(list => {
      this.cargas = list;
      console.log(this.cargas);
      this.loading = false;
      });
  }
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }
      ver(id){
    //    this.router.navigate(['/picking/confirmarmovimiento', id]);

    let url = 'http://104.36.166.65/webreports/reportepicking.aspx?id=' + String(id) ;
   window.open(url);


    }
    eliminar(id){
      this.loading = true;
      this.ordensalidaService.deletePlanificacion(id).subscribe(list => {

        this.buscar();
        this.loading = false;
        });
    }

  asignarPuerta(): void {

    if (this.selectedRow.length > 1 || this.selectedRow.length ===  0){
      this.alertify.error('Debe seleccionar un Trabajo');
      return ;
    }

    const dialogRef = this.dialog.open(DialogAsignarPuerta, {
      width: '700px',
      height: '450px',
      data: {codigo: this.selectedRow, descripcion: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.model.EstadoId = 30;
      this.ordensalidaService.getAllWork(this.model).subscribe(list => {
        this.cargas = list;
        this.loading = false;
        this.selectedRow = [];
        });
    });
  }
  asignarTrabajador(): void {
    if (this.selectedRow.length > 1 || this.selectedRow.length ===  0){
      this.alertify.error('Debe seleccionar un Trabajo');
      return ;
    }
    if (this.selectedRow[0].ubicacion == null)
    {
      this.alertify.error('Debe asignar un Área de Despacho');
      return;
    }
    const dialogRef = this.dialog.open(DialogAsignarTrabajador, {
      width: '700px',
      height: '450px',
      data: {codigo: this.selectedRow, descripcion: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.model.EstadoId = 30;
      this.ordensalidaService.getAllWork(this.model).subscribe(list => {
        this.cargas = list;
        this.loading = false;

        });
    });
  }

  buscar(){
    this.ordensalidaService.getAllWork(this.model).subscribe(list => {
      this.cargas = list;
      this.loading = false;
      });
  }
}
