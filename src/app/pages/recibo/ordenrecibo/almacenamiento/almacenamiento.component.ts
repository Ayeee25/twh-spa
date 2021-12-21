import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';

import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { InventarioService } from 'src/app/_services/Inventario/inventario.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Ubicacion } from 'src/app/_models/Mantenimiento/ubicacion';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { DialogData } from 'src/app/_models/Common/dialogdata';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import {  ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MenuItem } from 'primeng/api';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { ToastrService } from 'ngx-toastr';






@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.excepciones.html',

})
export class DialogExcepciones {
  areas: Dropdownlist[] = [];
  model: any =  {};
  ubicaciones: Ubicacion[];

  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  searchKey2: string;
  pageSizeOptions2: number[] = [5, 10, 25, 50, 100];
  displayedColumns2: string[] = [ 'ubicacion', 'almacen' , 'area', 'sugerido' , 'estado' , 'actionsColumn' ];
  listUbicaciones: MatTableDataSource<Ubicacion>;
  id: number;

  constructor(
    public dialogRef: MatDialogRef<DialogExcepciones>,
    private generalService: GeneralService,
    private inventarioServicio: InventarioService,

    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.id =  data.id;
      this.generalService.getAreas().subscribe(resp =>
        {
          resp.forEach(element => {
            this.areas.push({
              val: element.id ,
              viewValue: element.nombre
            });
          });
        });


    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  Save(id){



  }
  onChange(value){
    this.generalService.getAllUbicaciones(1, value.value).subscribe(list => {
    this.ubicaciones = list;


    this.listUbicaciones = new MatTableDataSource(this.ubicaciones);
    this.listUbicaciones.paginator = this.paginator2;
    this.listUbicaciones.sort = this.sort2;


    this.listUbicaciones.filterPredicate = (data, filter) => {
      return this.displayedColumns2.some(ele => {

        if (ele !== 'EquipoTransporte' && ele !== 'Almacen' && ele !== 'Urgente' && ele !== 'fechaEsperada' && ele !== 'fechaRegistro')
           {
              return ele !== 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) !== -1;

           }
        });
       };
    });
  }
}







@Component({
  selector: 'app-almacenamiento',
  templateUrl: './almacenamiento.component.html',
  styleUrls: ['./almacenamiento.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AlmacenamientoComponent implements OnInit {
  loading = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'lodNum', 'descripcionLarga', 'untQty' , 'ubicacion', 'proximaubicacion', 'actionsColumn' ];
  listData: MatTableDataSource<InventarioGeneral>;
  EquipoTransporteId: any;
  model: any = {} ;
  id: any;
  closeResult: string;

  visibleSidebar4 = false;
  activeIndex = 2;
  pasos: MenuItem[];
  orden: OrdenRecibo;


  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  searchKey2: string;
  pageSizeOptions2: number[] = [5, 10, 25, 50, 100];
  displayedColumns2: string[] = [ 'ubicacion', 'almacen' , 'area', 'sugerido' , 'estado' , 'actionsColumn' ];
  listUbicaciones: MatTableDataSource<Ubicacion>;
  ubicaciones: Ubicacion[];



  constructor(private inventarioServicio: InventarioService
    ,         private activatedRoute: ActivatedRoute
    ,         private ordenServicio: OrdenReciboService
    ,         public dialog: MatDialog
    ,         public alertify: ToastrService
    ,         private router: Router
    ) { }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params.uid;
    this.EquipoTransporteId  = this.activatedRoute.snapshot.params.uid2;
    this.ordenServicio.obtenerOrden(this.id).subscribe(resp => {
      this.orden = resp;
    });

    this.pasos = [
      {
        label: 'Identificar', command: (event: any) => {
        this.activeIndex = 0;
        this.router.navigate(['/recibo/identificarrecibomultiple',  this.id,  this.EquipoTransporteId ]);
      }}, {

        label: 'Acomodo', command: (event: any) => {
          this.activeIndex = 1;
          this.router.navigate(['recibo/acomodopallets',  this.id,  this.EquipoTransporteId ]);
      }},
      { label: 'Almacenamiento', command: (event: any) => {
        this.activeIndex = 2;
    }
  }
];
    this.inventarioServicio.getAll(this.id).subscribe(resp => {
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

 Confirmar(id) {
      this.loading = true;
      this.inventarioServicio.almacenamiento(id).subscribe(resp => {

        this.loading = false;

      }, error => {
         this.alertify.error(error);
      }, () => {
        this.inventarioServicio.getAll(this.id).subscribe(resp => {

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
    });
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
excepcion(id): void {

      const dialogRef = this.dialog.open(DialogExcepciones, {
        width: '650px',
        height: '500px',
        data: {id }
      });


      dialogRef.afterClosed().subscribe(result => {

        // this.animal = result;
      });

  }
  regresar(){

    this.router.navigate(['/recibo/listaordenrecibida',  this.activatedRoute.snapshot.params.uid2 ]);
  }
  masivo() {
    this.loading = true;
    this.inventarioServicio.almacenamientoMasivo(   this.id ).subscribe(resp => {

      this.loading = false;

    }, error => {
       this.alertify.error(error);
    }, () => {
      this.inventarioServicio.getAll(this.id).subscribe(resp => {

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
  });
  }
}
