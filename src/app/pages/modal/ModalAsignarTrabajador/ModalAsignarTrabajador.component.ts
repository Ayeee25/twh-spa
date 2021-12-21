import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { User } from 'src/app/_models/user';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import { DialogData } from 'src/app/_models/Common/dialogdata';
import { ToastrService } from 'ngx-toastr';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-ModalAsignarTrabajador',
  templateUrl: './ModalAsignarTrabajador.component.html',
  styleUrls: ['./ModalAsignarTrabajador.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class DialogAsignarTrabajador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'userName', 'nombreCompleto', 'dni', 'actionsColumn' ];
  listData: MatTableDataSource<User>;
  public loading = false;
  users: User[];
  model: any;

  constructor(private userService: UserService,
              public dialogRef: MatDialogRef<DialogAsignarTrabajador>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private alertify: ToastrService,
              private ordensalidaService: OrdenSalidaService) { }

  ngOnInit() {

    this.userService.getUsers().subscribe(list => {
      console.log(list);
      this.users = list;
      this.loading = false;
      this.listData = new MatTableDataSource(this.users);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;


      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {

          if (ele !== 'EquipoTransporte' && ele !== 'Almacen' && ele !== 'Urgente' && ele !== 'fechaEsperada' && ele !== 'fechaRegistro') {
                return ele !== 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) !== -1;
            }
          });
        };
    });
  }
  asignar(id){
    let ids = '' ;
    this.data.codigo.forEach(elem => {
      ids =   ',' + elem.id;
    });

    ids = ids.substring(1, ids.length + 1);
    console.log(ids);

    this.ordensalidaService.assignmentOfUser(ids, id).subscribe(resp => {
    }, error => {
         this.alertify.error(error);
    }, () => {
        this.alertify.success('Se registró correctamente.');
        this.dialogRef.close();
    });
  }


}
