import { Component, OnInit } from '@angular/core';

import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { NgForm } from '@angular/forms';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { Router } from '@angular/router';
import { Data } from 'src/app/_providers/data';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogBuscarEmpTransporte } from './DialogBuscarEmpTransporte';

import { DialogBuscarPlaca } from './DialogBuscarPlaca';
import { DialogBuscarChofer } from './DialogBuscarChofer';
import { SelectItem } from 'primeng/api';






export interface DialogData {
  codigo: any;
  descripcion: string;
}

declare let alertify: any;
@Component({
  selector: 'app-vincularequipotransporte',
  templateUrl: './vincularequipotransporte.component.html',
  styleUrls: ['./vincularequipotransporte.component.css']
})
export class VincularequipotransporteComponent implements OnInit {
 model: any = {};
 transporte: any = {};
 id: any;

 tipoVehiculo: SelectItem[] = [];

marcaVehiculo: SelectItem[] = [];

  constructor(public dialog: MatDialog,
              private equipoTransporteService: OrdenReciboService,
              private router: Router,
              // tslint:disable-next-line: no-shadowed-variable
              private alertify: ToastrService,
              private general: GeneralService,
              private equipotransporteService: GeneralService,
              private data: Data ) { }

  ngOnInit() {
    this.model.PropietarioId =  (this.data.storage[0].propietarioID);

    this.general.getValorTabla(4).subscribe(resp =>
      {
        resp.forEach(element => {
          this.tipoVehiculo.push({ value: element.id , label: element.valorPrincipal});
        });
      });
    this.general.getValorTabla(5).subscribe(resp =>
        {
          resp.forEach(element => {
            this.marcaVehiculo.push({ value: element.id , label: element.valorPrincipal});
          });
        });
  }

  openDialog(placa): void {
    const dialogRef = this.dialog.open(DialogBuscarPlaca, {
      width: '650px',
      height: '500px',
      data: {codigo: placa, descripcion: '' }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.model.placa = result.placa;
      this.model.tipoVehiculo = result.tipoVehiculo;
      this.model.marca = result.marca;
      this.model.modelo = result.modelo;
      this.model.cargaUtil = result.cargaUtil;
      this.model.pesoBruto = result.pesoBruto;
    });
  }
  openDialog_EmpTrans(): void {
    const dialogRef = this.dialog.open(DialogBuscarEmpTransporte, {
      width: '650px',
      height: '500px',
      data: {codigo: 'this.model.OrdenReciboId', descripcion: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.model.razonSocial = result.ruc + ' - ' + result.razonSocial  ;
      this.model.ruc = result.ruc ;
    });
  }
  openDialog_Dni(dni): void {
    const dialogRef = this.dialog.open(DialogBuscarChofer, {
      width: '650px',
      height: '500px',
      data: {codigo: dni, descripcion: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.model.dni = result.dni;
      this.model.nombreCompleto = result.nombreCompleto;
      this.model.brevete = result.brevete;
    });
  }
  registrar(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.equipoTransporteService.vincularEquipoTransporte(this.model).subscribe(resp => {
      this.transporte = resp;
    }, error => {
       this.alertify.error(error);
    }, () => {
      this.data.storage.forEach(element => {
        this.model.OrdenReciboId = element.ordenReciboId;
        this.model.Id = this.transporte.id;
        this.equipoTransporteService.matchEquipoTransporte(this.model).subscribe(resp1 => {
       }, error => {
          this.alertify.error(error);
       }, () => {
         this.alertify.success('Se vinculó al equipo correctamente.');
       });
      });
      // tslint:disable-next-line: no-unused-expression
      new Promise( resolve =>
        setTimeout(resolve, 300));
      this.alertify.success('Se creo el equipo de transporte correctamente.');
      this.router.navigate(['/recibo/listaordenrecibo']);
    });




  }
  onBlurMethod(placa){
     this.equipoTransporteService.getEquipoTransporte(placa).subscribe(x =>
      {
            if (x != null)
            {
               this.model.tipoVehiculo  = x.tipoVehiculoId;
               this.model.marcaVehiculo = x.marcaId;
               this.model.razonSocial = x.razonSocial;
               this.model.ruc = x.ruc;
               this.model.id = x.id;
               this.model.dni = x.dni;
               this.model.nombreCompleto = x.nombreCompleto;
               this.model.brevete = x.brevete;
            } else {
          }
      });
  }
  PlacaEncontrada(){
     if (this.model.id === undefined) { return true; } else { return false; }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

}
