import { Component, ViewChild, Inject } from '@angular/core';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { Proveedor } from 'src/app/_models/Mantenimiento/proveedor';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './vincularequipotransporte.component';

@Component({
  selector: 'dialog-emptransporte',
  templateUrl: 'modal.buscaremptransporte.html',
  styleUrls: ['./vincularequipotransporte.component.css'],
})


export class DialogBuscarEmpTransporte {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = ['ruc', 'razonSocial', 'actionsColumn'];
  proveedores: Proveedor[];

  listData: MatTableDataSource<Proveedor>;
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogBuscarEmpTransporte>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private equipotransporteService: GeneralService) {
  }
  onNoClick(): void {
    this.dialogRef.close();

  }
  seleccionarEmpTransporte(row: any) {
    this.dialogRef.close(this.model.ruc = this.proveedores.filter(x => x.id === row)[0]);
  }

  buscar() {
    this.equipotransporteService.getProveedores(this.model.codigo).subscribe(x => {
      this.proveedores = x;
      this.listData = new MatTableDataSource(this.proveedores);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;

      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {

          if (ele !== 'Id' && ele !== 'enLinea' && ele !== 'Dni') {
            return ele !== 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) !== -1;

          }
        });
      };
    });
  }
}
