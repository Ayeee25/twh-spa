import { Component, ViewChild, Inject } from '@angular/core';

import { DialogBuscarProducto } from '../ModalBuscarProducto/ModalBuscarProducto.component';
import { DialogData } from 'src/app/_models/Common/dialogdata';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { FacturacionService } from 'src/app/_services/Facturacion/facturacion.service';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ComprobanteDetalle } from 'src/app/_models/Facturacion/Comprobante';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'ModalNuevaFactura.component.html',
  styleUrls: ['ModalNuevaFactura.component.css'],
})
export class DialogNuevaFactura {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'Codigo', 'Descripcion', 'subtotal' , 'igv', 'total' ];
  detalles: ComprobanteDetalle[] ;
  series: Dropdownlist[] = [];
  listData: MatTableDataSource<ComprobanteDetalle>;
  model: any = {};
  model_register: any = {};
  documentoDetalle: ComprobanteDetalle;
  documentosDetalle: any[] ;



  constructor(
    public dialogRef: MatDialogRef<DialogBuscarProducto>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clienteService: ClienteService,
    private facturacionService: FacturacionService,
     ) {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1; // January is 0!

      const yyyy = today.getFullYear();

      const final = dd + '/' + mm + '/' + yyyy;
      this.model_register.PreliquidacionId = data.codigo;
      this.facturacionService.getSeries().subscribe(resp => {
          this.facturacionService.getPreLiquidacion(data.codigo).subscribe(list => {

            this.model.subtotal = list[0].subTotal;
            this.model.igv = list[0].igv;
            this.model.total = list[0].total;

            this.documentosDetalle = [{
          id: '1',
          cantidad : 1,
          descripcion: 'Por almacenamiento ',
          comprobanteId : '1',
          subtotal: this.model.subtotal ,
          total:   this.model.total,
          igv:  this.model.igv  ,
          recargo: 10
      }];

            this.detalles = this.documentosDetalle;
            this.listData = new MatTableDataSource(this.detalles);
            this.listData.paginator = this.paginator;
            this.listData.sort = this.sort;




            this.listData.filterPredicate =
            (data, filter) => this.displayedColumns.some(ele => {

              if (ele !== 'Id' && ele !== 'enLinea' && ele !== 'Dni') {
                return ele !== 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) !== -1;

              }
            });

            resp.forEach(element => {
          this.series.push({ val: element.id , viewValue: element.serie});
        });

      });


        }, error => {
        }, () => {
      });

      this.clienteService.getPropietario(1).subscribe(list => {

          this.model = list;
          this.model.fechaEmision = final;
      });


    }
    onNoClick(): void {
    this.dialogRef.close();

  }
  seleccionarProducto(row: any){

     this.dialogRef.close( this.model.descripcionLarga = this.detalles.filter(x => x.id == row)[0]);
  }
  generar(){
      this.facturacionService.generar_comprobante(this.model_register).subscribe( resp =>
         {
              
        });
  }
  cerrar(){

  }

}
