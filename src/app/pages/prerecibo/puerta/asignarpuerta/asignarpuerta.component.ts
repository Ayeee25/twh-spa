import { Component, OnInit, ViewChild } from '@angular/core';

import { Ubicacion } from 'src/app/_models/Mantenimiento/ubicacion';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { Router, ActivatedRoute } from '@angular/router';

import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-asignarpuerta',
  templateUrl: './asignarpuerta.component.html',
  styleUrls: ['./asignarpuerta.component.css']
})
export class AsignarpuertaComponent implements OnInit {

  cols: any[];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'ubicacion', 'almacen' , 'area', 'estado' , 'actionsColumn' ];
  listData: MatTableDataSource<Ubicacion>;

  public loading = false;
  ubicaciones: Ubicacion[];
  model: any = {};



constructor(private ordenreciboService: OrdenReciboService,
            private generalService: GeneralService,
            private router: Router,
            private alertify: ToastrService,
            private activatedRoute: ActivatedRoute) { }

ngOnInit() {

  this.cols =
  [
      {header: 'ACCIONES', field: 'numOrden' , width: '50px' },
      {header: 'UBICACIÓN', field: 'ubicacion'  ,  width: '80px' },
      {header: 'ALMACÉN', field: 'almacen'  , width: '140px'   },
      {header: 'ÁREA', field: 'area'  , width: '140px'   },
      {header: 'ESTADO', field: 'estado'  ,  width: '100px'  },
    ];

  this.model.EquipoTransporteId =  this.activatedRoute.snapshot.params.uid;
  this.model.AlmacenId =  this.activatedRoute.snapshot.params.uid2;

  this.generalService.getPuertas(this.model.AlmacenId, 1).subscribe(list => {
        this.ubicaciones = list;

        console.log(this.ubicaciones);

        this.loading = false;
        this.listData = new MatTableDataSource(this.ubicaciones);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;


        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {

            if (ele !== 'EquipoTransporte' && ele !== 'Almacen' && ele !== 'Urgente' && ele !== 'fechaEsperada' && ele !== 'fechaRegistro')
              {
                  return ele !== 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) !== -1;

              }
            });
          };
    });
  }

asignarPuerta(id) {
    const EquipoTransporteId = this.activatedRoute.snapshot.params.uid;

    this.ordenreciboService.assignmentOfDoor(EquipoTransporteId, id).subscribe(resp => {
    }, error => {
       this.alertify.error(error);
    }, () => {
      this.alertify.success('Se registró correctamente.');
      this.router.navigate(['/recibo/equipotransporteentrante']);
    });
  }

}
