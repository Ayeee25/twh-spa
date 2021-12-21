import { Component, OnInit, ViewChild } from '@angular/core';


import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectionModel } from '@angular/cdk/collections';
import { OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';

import { MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Toast, ToastrService } from 'ngx-toastr';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';


@Component({
  selector: 'app-verordenrecibo',
  templateUrl: './verordenrecibo.component.html',
  styleUrls: ['./verordenrecibo.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class VerordenreciboComponent implements OnInit {
  constructor(private ordenServicio: OrdenReciboService
    ,         private activatedRoute: ActivatedRoute
    ,         private router: Router
    ,         private alertify: ToastrService
    ) { }
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'Linea', 'Codigo', 'Descripcion' , 'Cantidad', 'Lote' , 'actionsColumn' ];
  listData: MatTableDataSource<OrdenReciboDetalle>;
  model: any = {} ;
  public selected2: any;
  searchKey: string;
  id: any;
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  };
  selection = new SelectionModel<OrdenReciboDetalle>(true, []);

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params.uid;
    this.ordenServicio.obtenerOrden(this.id).subscribe(resp => {
      this.model = resp;


      this.listData = new MatTableDataSource(this.model.detalles);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;

      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {

          if (ele !== 'Id' && ele !== 'activo' && ele !== 'publico')
             {
                return ele !== 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) !== -1;

             }
          });
         };

    }, error => {

    }, () => {

    });


  }
  applyFilter() {

    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listData.data.length;
    return numSelected === numRows;
  }

  nuevodetalle(){
    this.router.navigate(['/recibo/nuevaordenrecibodetalle', this.id]);
  }
  delete(id){
    this.ordenServicio.deleteOrderDetail(id).subscribe(resp => {

    this.ordenServicio.obtenerOrden(this.id).subscribe(resp2 => {
      this.model = resp2;


      this.listData = new MatTableDataSource(this.model.detalles);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;

      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {

          if (ele !== 'Id' && ele !== 'activo' && ele !== 'publico')
             {
                return ele !== 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) !== -1;

             }
          });
         };

    }, error => {

    }, () => {

    });
     }, error => {

      if (error === 'err020') {
      this.alertify.error('Esta Orden de Recibo tiene productos asociados.');
      }
      else {
      this.alertify.error('Ocurrió un error inesperado.');
      }

      }, () => {

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
  regresar(){
    this.router.navigate(['/recibo/listaordenrecibo']);
  }
}
