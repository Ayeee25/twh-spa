import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { NgForm } from '@angular/forms';

import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';
import { ToastrService } from 'ngx-toastr';
import { DialogBuscarProducto } from 'src/app/pages/modal/ModalBuscarProducto/ModalBuscarProducto.component';
import { SelectItem } from 'primeng/api';




@Component({
  selector: 'app-nuevaordenrecibodetalle',
  templateUrl: './nuevaordenrecibodetalle.component.html',
  styleUrls: ['./nuevaordenrecibodetalle.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: APP_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class NuevaordenrecibodetalleComponent implements OnInit {
  model: any = {}  ;
  animal: string;
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'dd-MM-yyyy',
    defaultOpen: true
  };

  loading = false;

  estados: SelectItem[] = [];


  constructor(public dialog: MatDialog,
              private generalService: GeneralService,
              private alertify: ToastrService,
              private ordenReciboService: OrdenReciboService,
              private activatedRoute: ActivatedRoute,
              private router: Router  ) { }

  ngOnInit() {
      this.model.linea = 'Autogenerado';
      this.model.OrdenReciboId  = this.activatedRoute.snapshot.params.uid;
      this.ordenReciboService.obtenerOrden(this.model.OrdenReciboId).subscribe(resp =>
        {
          this.model.propietarioId =  resp.propietarioId;
        });

      this.generalService.getAll(3).subscribe(resp =>
        {

          resp.forEach(element => {
            this.estados.push({
              value: element.id ,
              label: element.nombreEstado
            });
          });
        });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBuscarProducto, {
      width: '650px',
      height: '500px',
      data: {codigo: this.model.propietarioId, descripcion: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.model.descripcionLarga = result.descripcionLarga;
      this.model.codigo = result.codigo;
      this.model.productoid = result.id;
    });
  }

  registrar(form: NgForm){
    this.loading = true;
    if (form.invalid) {
      return;
    }

    this.ordenReciboService.registrar_detalle(this.model).subscribe(x => {

    }, error => {
      this.alertify.error(error);
    }, () => {
      this.loading = false;
      this.alertify.success('Se actualizó correctamente.');
      this.router.navigate(['/recibo/verordenrecibo',  this.model.OrdenReciboId ]);
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
    this.router.navigate(['/recibo/verordenrecibo',  this.model.OrdenReciboId ]);
  }

}
