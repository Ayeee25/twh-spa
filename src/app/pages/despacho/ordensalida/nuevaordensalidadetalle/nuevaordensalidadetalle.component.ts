import { Component, OnInit } from '@angular/core';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DialogBuscarProducto } from 'src/app/pages/modal/ModalBuscarProducto/ModalBuscarProducto.component';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuevaordensalidadetalle',
  templateUrl: './nuevaordensalidadetalle.component.html',
  styleUrls: ['./nuevaordensalidadetalle.component.css']
})
export class NuevaordensalidadetalleComponent implements OnInit {
  loading = false;
  model: any = {} ;
  animal: string;
  date: Date = new Date();
  previewUrl: any = null;
  div_visible = false;
  uploadedFilePath: string = null;
  fileData: File = null;
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
  fileProgress(fileInput: any) {
    this.fileData =  fileInput.target.files[0] as File;
    this.preview();

}
preview() {
  // Show preview
  const mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(this.fileData);
  reader.onload = (_event) => {
    this.previewUrl = reader.result;
  };
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
  public uploadFile  = (files) => {
    this.div_visible = true;

    if (files.length === 0) {

       this.alertify.warning('Debe seleccionar un archivo'
      , 'Subir File', {
        closeButton: true
      });

      return ;
    }

    const fileToUpload =  files[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);



    // this.ordenService.uploadFile(formData, this.UserId ).subscribe(event => {
    //       this.div_visible = false;
    //       this.toastr.success('Se cargo correctamente'
    //        , 'Subir File', {
    //          closeButton: true
    //        });
    //       this.router.navigate(['seguimiento/listaorden']);
    // }, error => {
    //   this.div_visible = false;
    //   this.toastr.warning(error.error.text
    //   , 'Subir File', {
    //     closeButton: true
    //   });

    // }, () => {
    //   // this.router.navigate(['/dashboard']);
    // });
  }
  registrar(form: NgForm){




    this.loading = true;
    if (form.invalid) {
      return;
    }
    this.ordenSalidaService.registrar_detalle(this.model).subscribe(x => {

      if (x === 0){
        this.alertify.error('Ya se agregó este producto.');
      }
      else {
        this.alertify.success('Se actualizó correctamente.');
        this.router.navigate(['/picking/verordensalida',  this.model.OrdenSalidaId ]);
      }

    }, error => {
      this.alertify.error('La cantidad solicitada excede a la del inventario.');
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
    this.router.navigate(['/picking/verordensalida',  this.model.OrdenSalidaId ]);
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
