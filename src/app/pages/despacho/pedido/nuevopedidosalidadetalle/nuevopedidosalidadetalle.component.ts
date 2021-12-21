import { Component, OnInit } from '@angular/core';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { MatDialog } from '@angular/material/dialog';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { ToastrService } from 'ngx-toastr';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { DialogBuscarProducto } from 'src/app/pages/modal/ModalBuscarProducto/ModalBuscarProducto.component';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-nuevopedidosalidadetalle',
  templateUrl: './nuevopedidosalidadetalle.component.html',
  styleUrls: ['./nuevopedidosalidadetalle.component.css']
})
export class NuevopedidosalidadetalleComponent implements OnInit {

loading = false;
model: any = {} ;
animal: string;
date: Date = new Date();

settings = {
  bigBanner: true,
  timePicker: false,
  format: 'dd-MM-yyyy',
  defaultOpen: true
};

  clientes: Dropdownlist[] = [
  ];
  huellas: Dropdownlist[] = [
  ];
  huellaDetalle: Dropdownlist[] = [
  ];

  constructor(public dialog: MatDialog,
              private generalService: GeneralService,
              private alertify: ToastrService,
              private ordenSalidaService: OrdenSalidaService,
              private activatedRoute: ActivatedRoute,
              private productoService: ProductoService,
              private router: Router  ) { }

  ngOnInit() {


      this.model.linea = 'Autogenerado';
      this.model.OrdenSalidaId  = this.activatedRoute.snapshot.params.uid;

      this.generalService.getAll(3).subscribe(resp =>
        {

          resp.forEach(element => {
            this.clientes.push({
              val: element.id ,
              viewValue: element.nombreEstado
            });
          });
          this.clientes.push({
            val: 10,
            viewValue : 'Disponible y Merma'
          });
        });
  }
  openDialog(): void {

    this.ordenSalidaService.obtenerOrden(this.model.OrdenSalidaId).subscribe( resp =>
      {



        const dialogRef = this.dialog.open(DialogBuscarProducto, {
              width: '650px',
              height: '500px',
              data: {codigo: resp.propietarioId, descripcion: ''}
            });
        dialogRef.afterClosed().subscribe(result => {
              this.model.descripcionLarga = result.descripcionLarga;
              this.model.codigo = result.codigo;
              this.model.productoid = result.id;


              this.huellas = [];
              this.productoService.getHuellas(this.model.productoid).subscribe(resp2 =>
              {

                resp2.forEach(element => {
                  this.huellas.push({
                    val: element.id ,
                    viewValue: element.codigoHuella + ' -Cama de  ' + element.caslvl
                  });
                });
              });




            });
      });



  }

  registrar(form: NgForm){
    this.loading = true;
    this.model.estadoId = 7;
    if (form.invalid) {
      return;
    }

    this.ordenSalidaService.registrar_detalle(this.model).subscribe(x => {

      if (x === 0){
        this.alertify.error('Ya se agregó este producto.');
      }
      else {
        this.alertify.success('Se actualizó correctamente.');
        this.router.navigate(['/pedido/verordenpedido',  this.model.OrdenSalidaId ]);
      }

    }, error => {

      this.alertify.error('No existen productos suficientes para atender el pedido');
      this.loading = false;
    }, () => {
      this.loading = false;
    });
  }



  onBlurMethod(codigo: string){

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  cancel(){
    this.router.navigate(['/pedido/verordenpedido',  this.model.OrdenSalidaId ]);
  }
  CambioHuella(id){
    this.huellaDetalle = [];
    this.productoService.getHuellasDetalle(id).subscribe(resp =>
        {

          resp.forEach(element => {
            this.huellaDetalle.push({
              val: element.unidadMedidaId ,
              viewValue: element.unidadMedida + ' - ' + element.untQty + ' Unidades'
            });
          });
        });

  }
}
