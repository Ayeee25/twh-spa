import { Component, ViewChild, Inject } from '@angular/core';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { Chofer } from 'src/app/_models/Mantenimiento/chofer';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './vincularequipotransporte.component';

@Component({
  selector: 'dialog-buscachofer',
  templateUrl: 'modal.buscarchofer.html',
  styleUrls: ['./vincularequipotransporte.component.css'],
})


export class DialogBuscarChofer {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = ['nombreCompleto', 'dni', 'brevete', 'telefono', 'actionsColumn'];

  choferes: Chofer[];

  listData: MatTableDataSource<Chofer>;
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogBuscarChofer>,
    @Inject(MAT_DIALOG_DATA) public dialogdata: DialogData,
    private equipotransporteService: GeneralService) {
    this.model.codigo = dialogdata.codigo;
    this.buscar();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  seleccionarChofer(row: any) {
    this.dialogRef.close(this.model = this.choferes.filter(x => x.id === row)[0]);
  }

  buscar() {
    this.equipotransporteService.getChoferes(this.model.codigo).subscribe(x => {
      this.choferes = x;
      this.listData = new MatTableDataSource(this.choferes);
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
