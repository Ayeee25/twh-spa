import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { Ubicacion } from 'src/app/_models/Mantenimiento/ubicacion';

import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  templateUrl: './modal.confirmarsalida2.html',
  encapsulation: ViewEncapsulation.None,
})
export class NgbdModalConfirmRetiro {
  public loading = false;
  constructor(public modal: NgbActiveModal) {}
}


@Component({
  selector: 'app-confirmarmovimiento',
  templateUrl: './confirmarmovimiento.component.html',
  styleUrls: ['./confirmarmovimiento.component.css']
})
export class ConfirmarmovimientoComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'lodNum', 'descripcionLarga' , 'lotnum' , 'cantidadPallet', 'cantidadRetiro' , 'ubicacion', 'proximaubicacion', 'actionsColumn' ];
  listData: MatTableDataSource<InventarioGeneral>;

  model: any = {} ;
  id: any;
  closeResult: string;



  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  searchKey2: string;
  pageSizeOptions2: number[] = [5, 10, 25, 50, 100];
  displayedColumns2: string[] = [ 'ubicacion', 'almacen' , 'area', 'sugerido' , 'estado' , 'actionsColumn' ];
  listUbicaciones: MatTableDataSource<Ubicacion>;
  ubicaciones: Ubicacion[];

  public loading = false;

  constructor(private ordenSalidaService: OrdenSalidaService
    ,         private activatedRoute: ActivatedRoute
    ,         private alertify: ToastrService
    ,         public dialog: MatDialog,
              private router: Router
    ) { }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params.uid;

    this.ordenSalidaService.getAllWorkDetail(this.id).subscribe(resp => {

      console.log(resp);

      this.model = resp;
      this.listData = new MatTableDataSource(this.model);
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

  ConfirmarTodo() {
    this.loading  = true;

    this.ordenSalidaService.movimientoSalidaMasiva(this.id).subscribe(resp => {
    }, error => {
       this.alertify.error(error);
       this.loading  = false;
    }, () => {

      this.ordenSalidaService.getAllWorkDetail(this.id).subscribe(resp => {

        this.loading  = false;
        this.model = resp;
        this.listData = new MatTableDataSource(this.model);
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
        this.loading  = false;
       });
  });

  }

 Confirmar(id) {
      this.loading  = true;

      this.ordenSalidaService.movimientoSalida(id).subscribe(resp => {
      }, error => {
         this.alertify.error(error);
         this.loading  = false;
      }, () => {

        this.ordenSalidaService.getAllWorkDetail(this.id).subscribe(resp => {

          this.loading  = false;
          this.model = resp;
          this.listData = new MatTableDataSource(this.model);
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
          this.loading  = false;
         });
    });
}
regresar() {
    this.router.navigate(['picking/listado2trabajoasignado']);
  }
}

