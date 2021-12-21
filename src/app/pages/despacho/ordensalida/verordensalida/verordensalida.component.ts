import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { ActivatedRoute, Router } from '@angular/router';

import { SelectionModel } from '@angular/cdk/collections';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-verordensalida',
  templateUrl: './verordensalida.component.html',
  styleUrls: ['./verordensalida.component.css']
})
export class VerordensalidaComponent implements OnInit {
  constructor(private ordenServicio: OrdenSalidaService
    ,         private activatedRoute: ActivatedRoute
    ,         private router: Router
    ,         private alertify: ToastrService
    ) { }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'Linea', 'Codigo', 'Descripcion' , 'Cantidad', 'Lote' , 'actionsColumn' ];
  listData: MatTableDataSource<OrdenReciboDetalle>;
  model: any = {} ;
  public selected2: any;
  searchKey: string;
  id: any;
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
  selection = new SelectionModel<OrdenReciboDetalle>(true, []);

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params.uid;

    this.ordenServicio.obtenerOrden(this.id).subscribe(resp => {

      this.model = resp;
      console.log(this.model);

      this.listData = new MatTableDataSource(this.model.detalles);
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
  applyFilter() {

    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listData.data.length;
    return numSelected === numRows;
  }
  fileProgress(fileInput: any) {
    this.fileData =  fileInput.target.files[0] as File;
    this.preview();

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



  this.ordenServicio.uploadFile(formData,  this.id  ).subscribe(event => {
        this.div_visible = false;
        this.alertify.success('Se cargo correctamente'
         , 'Subir File', {
           closeButton: true
         });
      //  this.router.navigate(['seguimiento/listaorden']);
  }, error => {
    this.div_visible = false;
    this.alertify.warning(error.error.text
    , 'Subir File', {
      closeButton: true
    });

  }, () => {
    // this.router.navigate(['/dashboard']);
  });
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

  nuevodetalle(){
    this.router.navigate(['/picking/nuevaordensalidadetalle', this.id]);
  }
  delete(id){
    this.ordenServicio.deleteOrderDetail(id).subscribe(resp => {

    this.ordenServicio.obtenerOrden(this.id).subscribe(resp2 => {
      this.model = resp2;

      this.listData = new MatTableDataSource(this.model.detalles);
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
     }, error => {

      if (error === 'err020') {
      this.alertify.error('Esta Orden de Recibo tiene productos asociados.');
      }
      else {
      this.alertify.error('Ocurrió un error inesperado.');
      }

      }, () => {

        this.listData.filterPredicate = (data, filter) => {
          return this.displayedColumns.some(ele => {

            if (ele !== 'ubicacion' &&  ele !== 'select' && ele !== 'EquipoTransporte' && ele !== 'Almacen' && ele !== 'Urgente' && ele !== 'fechaEsperada' && ele !== 'fechaRegistro')
               {

                  return ele !== 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) !== -1;

               }
            });
           };



    });
  }
  regresar(){
    this.router.navigate(['/picking/listaordensalida']);
  }

}
