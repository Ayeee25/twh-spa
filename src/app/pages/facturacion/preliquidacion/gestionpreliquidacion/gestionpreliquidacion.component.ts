import { Component, OnInit } from '@angular/core';
import { FacturacionService } from 'src/app/_services/Facturacion/facturacion.service';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { PreLiquidacion } from 'src/app/_models/Facturacion/preliquidacion';
import { DialogNuevaFactura } from 'src/app/pages/modal/ModalNuevaFactura/ModalNuevaFactura.component';

import { SelectItem } from 'primeng/api/selectitem';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmationService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gestionpreliquidacion',
  templateUrl: './gestionpreliquidacion.component.html',
  styleUrls: ['./gestionpreliquidacion.component.css'],
  providers: [ConfirmationService]
})
export class GestionpreliquidacionComponent implements OnInit {

  cols: any[];
  public loading = false;
  preliquidaciones: PreLiquidacion[] = [];
  model: any  = {};
  selectedRow: any;

  clientes: SelectItem[] = [];
  estados: SelectItem[] = [];
  EstadoId: number;
  context;

  constructor(private facturacionService: FacturacionService,
              public dialog: MatDialog,
              private alertify: ToastrService,
              private generalService: GeneralService,
              private confirmationService: ConfirmationService,
              private clienteService: ClienteService) { }

  ngOnInit() {
    this.clienteService.getAllPropietarios('').subscribe(resp => {
      resp.forEach(x => {
        this.clientes.push({ label: x.razonSocial , value: x.id.toString() });
      });

    });
    this.generalService.getAll(18).subscribe(resp => {
      resp.forEach(x => {
        this.estados.push({ label: x.nombreEstado , value: x.id.toString() });
      });

    });
    this.cols =
    [
        {header: 'Acc', field: 'id' , width: '70px' },
        {header: 'LIQUIDACIÓN', field: 'numLiquidacion'  ,  width: '130px' },
        {header: 'PROPIETARIO', field: 'propietario'  , width: '130px'   },
        {header: 'ESTADO', field: 'estado'  ,  width: '120px'  },
        {header: 'FEC INI', field: 'fechaINicio' , width: '120px'  },
        {header: 'FEC FIN', field: 'fechaFin'  , width: '120px'  },
        {header: 'FEC REGISTRO', field: 'fechaLiquidacion'  , width: '130px'  },
        {header: 'SUBTOTAL', field: 'subTotal' , width: '120px'  },
        {header: 'IGV', field: 'igv', width: '180px'    },
        {header: 'TOTAL', field: 'total', width: '120px'   },
      ];

  }
  eliminar(id){
    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar?',
      header: 'Eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.facturacionService.delete_preliquidacion(id).subscribe(list => {
          this.loading = true;
          this.buscar();
          });
      },
        reject: () => {

        }
    });
  }

  buscar() {
      this.facturacionService.getPreLiquidaciones(this.model).subscribe(list => {
          this.preliquidaciones = list;
          this.loading = false;
      });
  }



  generar(): void {

    if ( this.selectedRow   === undefined) {
      this.alertify.error('Debe seleccionar una liquidación');
      return ;
    }


    const dialogRef = this.dialog.open(DialogNuevaFactura, {
      width: '700px',
      height: '500px',
      data: {codigo: this.selectedRow.id , descripcion: ''}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.model.descripcionLarga = result.descripcionLarga;
      this.model.codigo = result.codigo;
      this.model.productoid = result.id;
    });
  }


}
