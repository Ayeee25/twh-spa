import { Component, ViewChild, Inject } from '@angular/core';
import { Vehiculo } from 'src/app/_models/Mantenimiento/vehiculo';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './vincularequipotransporte.component';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.buscarplaca.html',
  styleUrls: ['./vincularequipotransporte.component.css'],
})


// tslint:disable-next-line: component-class-suffix
export class DialogBuscarPlaca {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = ['Placa', 'TipoVehiculo', 'Modelo', 'Marca', 'actionsColumn'];

  vehiculos: Vehiculo[];

  listData: MatTableDataSource<Vehiculo>;
  model: any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogBuscarPlaca>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private equipotransporteService: GeneralService) {
    this.model.codigo = data.codigo;
    this.buscar();

  }
  onNoClick(): void {
    this.dialogRef.close();

  }
  seleccionarPlaca(row: any) {
    this.dialogRef.close(this.model.placa = this.vehiculos.filter(x => x.id === row)[0]);
  }

  buscar() {
    this.equipotransporteService.getVehiculos(this.model.codigo).subscribe(x => {
      this.vehiculos = x;
      this.listData = new MatTableDataSource(this.vehiculos);
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
