import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdenSalida } from 'src/app/_models/Despacho/ordenrecibo';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { SelectItem } from 'primeng/api/selectitem';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-planificarpicking',
  templateUrl: './planificarpicking.component.html',
  styleUrls: ['./planificarpicking.component.css']
})
export class PlanificarpickingComponent implements OnInit {

  constructor(private ordensalidaService: OrdenSalidaService,
              private router: Router,
              private generealService: GeneralService,
              private alertify: ToastrService
    ) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'select', 'numOrden' , 'propietario',  'guiaRemision' , 'fechaRequerida', 'horaRequerida', 'fechaRegistro' ];

  listData: MatTableDataSource<OrdenSalida>;
  public loading = false;
  ordenes: OrdenSalida[] = [];

  ordenesaux: OrdenSalida[] = [];
  almacenes: SelectItem[] = [];
  model: any  = {};
  ids = '';
  idsCarga: string[] = [];
  // tslint:disable-next-line: variable-name
  model_pendientes: any = {};



  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  searchKey1: string;

  displayedColumns1: string[] = [  'numOrden2' , 'propietario2', 'guiaRemision' ,   'fechaRequerida', 'horaRequerida', 'fechaRegistro', 'actionsColumn' ];
  ordeneseleccionadas: OrdenSalida[] = [];
  listData1: MatTableDataSource<OrdenSalida>;

  EstadoId: number;

  intervalo: SelectItem[] = [
    {value: 1, label: 'Mañana'},
    {value: 3, label: 'Próximos 3 días'},
    {value: 7, label: 'Próximos 7 días'},
    {value: 30, label: 'Próximos 30 días'},
    {value: 0, label: 'Todas'},
  ];
  selection = new SelectionModel<OrdenSalida>(true, []);

  ngOnInit() {


    this.generealService.getAllAlmacenes().subscribe(resp => {
      resp.forEach(element => {
        this.almacenes.push({ value: element.id ,  label : element.descripcion});
      });

    });

    this.buscar();


  }
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }
  checkboxLabel(row?: OrdenSalida): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ordenSalidaId + 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =  this.ordenes.length;
    return numSelected === numRows;
  }

  ver(id){
    this.router.navigate(['/picking/verordensalida', id]);
   }
   highlight(row){
    this.selection.isSelected(row) ? this.selection.deselect(row) : this.selection.select(row);
  }
  agregarorden() {
    const Id = this.selection.selected ;


    Id.forEach(element => {
      this.ordeneseleccionadas.push(element);
      const index = this.ordenes.indexOf(element);
      this.ordenes.splice(index, 1);

    });


    this.loading  = false;
    this.listData1 = new MatTableDataSource(this.ordeneseleccionadas);
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





    this.loading = false;
    this.listData = new MatTableDataSource(this.ordenes);
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
    this.selection.clear() ;

  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.listData.data.forEach(row => this.selection.select(row));
  }
  eliminar(Id){

      const index = this.ordeneseleccionadas.indexOf(Id);
      this.ordeneseleccionadas.splice(index, 1);
      this.ordenes.push(Id);

      this.loading  = false;
      this.listData1 = new MatTableDataSource(this.ordeneseleccionadas);
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





      this.loading = false;
      this.listData = new MatTableDataSource(this.ordenes);
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
      this.selection.clear() ;
  }
  planificar(){

    this.loading = true;

    if (this.ordeneseleccionadas.length < 1) {
      this.alertify.warning('Debe seleccionar al menos una orden de salida.');
      this.loading = false;
      return;
    }

    this.model_pendientes = {};
    this.ids = '';

    this.ordeneseleccionadas.forEach( element => {
      this.ids  = this.ids + ',' + String(element.ordenSalidaId);
    });
    this.model_pendientes.ids = this.ids;

    this.ordensalidaService.PlanificarPicking(this.model_pendientes).subscribe(resp => {

       if(resp == -1){
        this.alertify.error('La orden no tiene detalles de productos.');
        this.router.navigate(['/picking/listadotrabajopendiente' ]);
        this.loading = false;
        return ;
       }

        this.model = resp;
        this.loading = false;
        this.alertify.success('Se planificó correctamente.');
        this.router.navigate(['/picking/listadotrabajopendiente' ]);
      }, error => {
         this.alertify.error(error);
      }, () => {

      });


  }
  buscar(){
    this.loading = true;


    // this.model.EstadoId = 21;
    // this.model.PropietarioId = 1;

    this.ordensalidaService.getAllOrdenSalidaPendientes(this.model).subscribe(list => {


    this.ordenes = list;
    this.loading = false;
    this.listData = new MatTableDataSource(this.ordenes);
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
