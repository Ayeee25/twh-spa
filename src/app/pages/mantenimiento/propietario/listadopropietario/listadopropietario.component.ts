import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Cliente } from 'src/app/_models/Mantenimiento/cliente';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { Router } from '@angular/router';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

export interface DialogData {
  nombre: string ;
  tipoDocumentoId: number;
  codigo: number;
  documento: number;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.agregarcliente.html',

})
export class DialogNuevoCliente {
  clientes: Dropdownlist[] = [];
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogNuevoCliente>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clienteService: ClienteService,
    private alertify: ToastrService ) {
    this.model.PropietarioId = data.codigo;

    this.clienteService.getAllClientes('').subscribe(resp => {
          resp.forEach(element => {
            this.clientes.push({ val: element.id , viewValue: element.razonSocial});
          });
        });

    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  close(): void {
    this.dialogRef.close();
  }
  registrar(form: NgForm){
    console.log('xD');
    if (form.invalid) {
      return;
    }
    this.clienteService.vincularPropitearioCliente(this.model).subscribe(x => {
    }, error => {
      this.alertify.error(error.error);
    }, () => {
      this.alertify.success('Se actualizó correctamente.');
      this.dialogRef.close();
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }



}








@Component({
  selector: 'app-listadopropietario',
  templateUrl: './listadopropietario.component.html',
  styleUrls: ['./listadopropietario.component.css']
})
export class ListadopropietarioComponent implements OnInit {
  cols: any[];
  clienteSeleccionado: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'razonSocial', 'nombreCorto' , 'tipoDocumento', 'documento' , 'actionsColumn' ];

  listData: MatTableDataSource<Cliente>;
  public loading = false;
  clientes: Cliente[];
  model: any  = {};


  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  searchKey1: string;

  displayedColumns1: string[] = [ 'razonSocial', 'tipoDocumento', 'documento' , 'actionsColumn' ];
  clientes2: Cliente[];
  listData1: MatTableDataSource<Cliente>;


  constructor(private clienteService: ClienteService
    ,         public dialog: MatDialog
    ,         public alertify: ToastrService
    ,         private router: Router) { }

  ngOnInit() {

    this.cols =
    [
        {header: 'ACCIONES', field: 'numOrden' , width: '60px' },
        {header: 'RAZÓN SOCIAL', field: 'razonsocial'  ,  width: '140px' },
        {header: 'NOMBRE CORTO', field: 'nombrecorto'  , width: '100px'   },
        {header: 'TIPO DOCUMENTO', field: 'tipodocumento'  ,  width: '100px'  },
        {header: 'DOCUMENTO', field: 'documento' , width: '100px'  },
      ];



    this.model.criterio = '';
    this.clienteService.getAllPropietarios(this.model.criterio).subscribe(resp => {

    this.clientes = resp;

    this.listData = new MatTableDataSource(this.clientes);
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;

    this.listData.filterPredicate = (data, filter) => {
      return this.displayedColumns.some(ele => {

        if (ele !== 'almacen' && ele !== 'cliente' && ele !== 'familia' )
           {

              return ele !== 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) !== -1;
           }
        });
       };
    });

  }
  verClientes(id){
    // this.loading  = true;
    $('html,body').animate({ scrollTop: 1200 }, 'slow');
    this.clienteSeleccionado = id;
    this.clienteService.getAllClientesxPropietarios(id).subscribe(resp => {

    this.clientes2 = resp;

    this.listData1 = new MatTableDataSource(this.clientes2);
    this.listData1.paginator = this.paginator;
    this.listData1.sort = this.sort;

    this.listData1.filterPredicate = (data, filter) => {
      return this.displayedColumns.some(ele => {

        if (ele !== 'almacen' && ele !== 'cliente' && ele !== 'familia' )
           {

              return ele !== 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) !== -1;
           }
        });
       };
    });
  }
  vincular(id): void {
    const dialogRef = this.dialog.open(DialogNuevoCliente, {
      width: '550px',
      height: '300px',
      data: { codigo: id }
    });
    dialogRef.afterClosed().subscribe(result => {
//      this.model.descripcionLarga = result.descripcionLarga;
  //    this.model.codigo = result.codigo;
  //    this.model.productoid = result.id;
    });

  }
  editar(id){

    this.router.navigate(['mantenimiento/editarpropietario', id]);
  }
  eliminar(id) {


    this.clienteService.deleteCliente(id).subscribe( resp => {
        this.alertify.show('Se eliminó correctamente.', 'TWH');

        this.clienteService.getAllClientesxPropietarios(this.clienteSeleccionado).subscribe(respa => {

          this.clientes2 = respa;

          this.listData1 = new MatTableDataSource(this.clientes2);
          this.listData1.paginator = this.paginator;
          this.listData1.sort = this.sort;

          this.listData1.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {

          if (ele !== 'almacen' && ele !== 'cliente' && ele !== 'familia' )
             {

                return ele !== 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) !== -1;
             }
          });
         };
      });
    }, error => {
        this.alertify.show('Este cliente tiene asociado despachos.', 'TWH');
    });
  }
}
