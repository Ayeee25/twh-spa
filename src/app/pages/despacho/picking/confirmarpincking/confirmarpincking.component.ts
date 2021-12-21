import { Component, OnInit, ViewChild } from '@angular/core';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { Shipment, ShipmentLine } from 'src/app/_models/Despacho/shipmentline';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-confirmarpincking',
  templateUrl: './confirmarpincking.component.html',
  styleUrls: ['./confirmarpincking.component.css']
})
export class ConfirmarpinckingComponent implements OnInit {

  constructor(private ordensalidaService: OrdenSalidaService,
              private router: Router,
              private clienteService: ClienteService,
              private alertify: ToastrService
    ) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'shipmentNumber' , 'propietario', 'nombreEstado', 'cliente' , 'direccion', 'fechaRegistro' , 'actionsColumn' ];

  listData: MatTableDataSource<Shipment>;
  public loading = false;
  Shipments: Shipment[] = [];

  ShipmentLines: ShipmentLine[] = [];
  model: any  = {};
  ids = '';
  idsCarga: string[] = [];
  // tslint:disable-next-line: variable-name
  model_pendientes: any = {};



  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  searchKey1: string;

  displayedColumns1: string[] = [  'codigo' , 'descripcionLarga', 'metodo', 'cantidad' , 'actionsColumn' ];
  ordeneseleccionadas: ShipmentLine[] = [];
  listData1: MatTableDataSource<ShipmentLine>;





  clientes: Dropdownlist[] = [];
  EstadoId: number;

  intervalo: Dropdownlist[] = [
    {val: 1, viewValue: 'Mañana'},
    {val: 3, viewValue: 'Próximos 3 días'},
    {val: 7, viewValue: 'Próximos 7 días'},
    {val: 30, viewValue: 'Próximos 30 días'},
    {val: 0, viewValue: 'Todas'},
  ];

  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  selection = new SelectionModel<Shipment>(true, []);

  ngOnInit() {
    this.loading = true;
    this.model.intervalo = 0;
    this.model.estadoIdfiltro = 21;
    this.model.PropietarioId = 1;
    this.EstadoId = this.model.estadoIdfiltro;

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
    this.model.PropietarioFiltroId = 1;


  }
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }
  checkboxLabel(row?: Shipment): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =  this.Shipments.length;
    return numSelected === numRows;
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
  ver(id){
    this.loading  = true;

    this.ordensalidaService.getAllPickingPendienteDetalle(id).subscribe(list => {

    this.ShipmentLines = list;
    this.loading  = false;
    this.listData1 = new MatTableDataSource(this.ShipmentLines);
    this.listData1.paginator = this.paginator;
    this.listData1.sort = this.sort;

    this.listData1.filterPredicate = (data, filter) => {
      return this.displayedColumns.some(ele => {

        if (ele !== 'almacen' && ele !== 'cliente' && ele !== 'familia' )
           {

              return ele !== 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) !== -1;
           }
        });
     };

    });

   }
   highlight(row){
    this.selection.isSelected(row) ? this.selection.deselect(row) : this.selection.select(row);
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.listData.data.forEach(row => this.selection.select(row));
  }

  planificar(){
    this.loading  = true;
    this.ordeneseleccionadas.forEach( element => {
      this.ids  = this.ids + ',' + String(element.id);
    });
    this.model_pendientes.ids = this.ids;
    this.ordensalidaService.PlanificarPicking(this.model_pendientes).subscribe(resp => {
        this.model = resp;
        this.loading = false;
      }, error => {
         this.alertify.error(error);
      }, () => {
        this.alertify.success('Se planificó correctamente.');
        this.router.navigate(['/picking/listadotrabajopendiente' ]);
      });


  }
  buscar() {

    this.ordensalidaService.getAllPickingPendiente().subscribe(list => {

    this.Shipments = list;
    this.loading = false;
    this.listData = new MatTableDataSource(this.Shipments);
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;

    this.listData.filterPredicate = (data, filter) => {
      return this.displayedColumns.some(ele => {

        if (ele !== 'ubicacion' &&  ele !== 'select' && ele !== 'EquipoTransporte' && ele !== 'Almacen' && ele !== 'Urgente' && ele !== 'fechaEsperada' && ele !== 'fechaRegistro')
           {
              return ele !== 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) !== -1;
           }
        });
       };
    });
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
}
