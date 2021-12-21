import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Cliente } from 'src/app/_models/Mantenimiento/cliente';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { Router } from '@angular/router';
import { Dropdownlist } from 'src/app/_models/Constantes';

import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { NgForm } from '@angular/forms';
import { Ubigeo } from 'src/app/_models/Mantenimiento/Ubigeo';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { SelectItem } from 'primeng/api';


export interface DialogData {
  nombre: string ;
  tipoDocumentoId: number;
  documento: number;
  codigo: number;

}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.agregardireccion.html',
})
// tslint:disable-next-line: component-class-suffix
export class DialogAgregarDireccion {
  departamentos: Dropdownlist[] = [];
  provincias: Dropdownlist[] = [];
  distritos: Dropdownlist[] = [];
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogAgregarDireccion>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private clienteService: ClienteService,
    private alertify: ToastrService ,
    private generalService: GeneralService,
    private router: Router ) {

      this.model.ClienteId = data.codigo;

      this.clienteService.GetAllDepartamentos().subscribe(resp =>
        {
          resp.forEach(element => {
            this.departamentos.push({ val: element.iddepartamento , viewValue: element.departamento});
          });
        });

    }
    onNoClick(): void {
    this.dialogRef.close();
  }
  registrar(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.clienteService.registrarDireccion(this.model).subscribe(x => {
    } , error => {
      this.alertify.error(error);
    }, () => {
      this.alertify.success('Se actualizó correctamente.');
      this.dialogRef.close();
    });
  }
  onChangeDepartamento(departamentoid){
    this.clienteService.GetAllProvincias(departamentoid.value).subscribe(resp =>
      {
        resp.forEach(element => {
          this.provincias.push({ val: element.idprovincia , viewValue: element.provincia});
        });
      });
  }
  onChangeProvincias(provinciaid){
    this.clienteService.GetAllDistritos(provinciaid.value).subscribe(resp =>
      {

        resp.forEach(element => {
          this.distritos.push({ val: element.iddistrito , viewValue: element.distrito});
        });
      });
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  close(){

  }


}





@Component({
  selector: 'app-listadocliente',
  templateUrl: './listadocliente.component.html',
  styleUrls: ['./listadocliente.component.css']
})
export class ListadoclienteComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'razonSocial', 'tipoDocumento' , 'documento' , 'actionsColumn' ];
  cols: any[];
  listData: MatTableDataSource<Cliente>;
  public loading = false;
  propietarios: SelectItem[] = [];
  model: any  = {};

  clientes: Cliente[];

  @ViewChild(MatSort) sort1: MatSort;
  @ViewChild(MatPaginator) paginator1: MatPaginator;
  searchKey1: string;

  displayedColumns1: string[] = [ 'codigo', 'direccion', 'distrito' ,  'provincia'  , 'departamento', 'actionsColumn' ];
  clientes2: Ubigeo[];
  listData1: MatTableDataSource<Ubigeo>;


  constructor(private clienteService: ClienteService
    ,         public dialog: MatDialog
    ,         private router: Router, ) { }

  ngOnInit() {

    this.cols =
    [
        {header: 'ACCIONES', field: 'numOrden' , width: '60px' },
        {header: 'RAZÓN SOCIAL', field: 'razonsocial'  ,  width: '80px' },
        {header: 'TIPO DOCUMENTO', field: 'tipodocumento'  ,  width: '100px'  },
        {header: 'DOCUMENTO', field: 'documento' , width: '100px'  },
        {header: 'ETIQUETADO', field: 'Etiquetado' , width: '100px'  }
      ];

    this.clienteService.getAllPropietarios('').subscribe(resp => {

        resp.forEach(x => {
          this.propietarios.push({ label: x.razonSocial.toUpperCase() , value: x.id.toString() });
       });

        if (localStorage.getItem('searchPro1') !== undefined){
              this.model.PropietarioId = localStorage.getItem('searchPro1');
        } else {
              this.model.PropietarioId = 1;
              console.log('entre');
        }
        // this.buscar();
    }, error => {

    }, () => {

      this.clienteService.getAllClientesxPropietarios(this.model.PropietarioId).subscribe(resp => {
         this.clientes = resp;
      });
    });


  }
  buscar() {
    window.localStorage.setItem(
      'searchPro1',
      this.model.PropietarioId
   );

    this.loading = true;

    this.model.criterio = '';
    this.model.clienteId = this.model.PropietarioId;

    this.clienteService.getAllClientesxPropietarios(this.model.PropietarioId).subscribe(list => {
      console.log(list);
      this.clientes = list ;
      this.loading = false;
  });
}
agregarDireccion(id): void{

        const dialogRef = this.dialog.open(DialogAgregarDireccion, {
          width: '650px',
          height: '500px',
          data: { codigo: id }
        });
        dialogRef.afterClosed().subscribe(result => {
          this.model.descripcionLarga = result.descripcionLarga;
          this.model.codigo = result.codigo;
          this.model.productoid = result.id;
        });
  }

  verDirecciones(id){
    this.loading  = true;

    this.clienteService.getAllDirecciones(id).subscribe(resp => {
    this.clientes2 = resp;
    this.loading  = false;
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
  close(){

  }

}
