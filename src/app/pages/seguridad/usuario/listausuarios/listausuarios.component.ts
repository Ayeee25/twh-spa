import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';

import { User } from 'src/app/_models/user';

import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {  DualListComponent } from 'angular-dual-listbox';
import { RolService } from 'src/app/_services/rol.service';
import { RolUserForRegisterResult } from 'src/app/_models/paginarol';

import { Toast, ToastrService } from 'ngx-toastr';

import { LazyLoadEvent } from 'primeng/api';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/_models/Common/dialogdata';





@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.asociarrol.html',

})
export class DialogOverviewExampleDialog {
  source = [];
  target = [];
  format = { add: 'Agregar', remove: 'Quitar', all: 'Todo', none: 'Ninguno',
  direction: DualListComponent.LTR, draggable: true, locale: 'es'  };
  aux_source = [] ;
  aux_target = [];
  _all = false;
  roles: RolUserForRegisterResult[] = [];
  id: number;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private rolService: RolService,
    private alertify: ToastrService,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.source = [];
      this.target = [];

      rolService.getAll().subscribe(list => {
        list.forEach(element => {
          this.aux_source.push(element.alias);
        });
        this.source = this.aux_source;
      });

      rolService.getRolesForUser(data['id']).subscribe(list => {
        list.forEach(element => {
          this.aux_target.push(element.descripcion);
        });
        this.target =  this.aux_target;
      });

    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  Save(id) {

    this.roles = [];
    this.target.forEach(element => {
      this.roles.push({
        UserId: id,
        Alias: element
         });
     });

    this.rolService.saveRoles(this.roles, id ).subscribe(resp => {
    }, error => {
       this.alertify.error(error);
    }, () => {
      this.alertify.success('Se registró correctamente.');
      this.dialogRef.close();
    });

  }
}


@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  templateUrl: './modal.eliminar.html',
  encapsulation: ViewEncapsulation.None,
})
export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) {}
}


declare var $: any;



@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {



  searchKey: string;
  animal: string;
  name: string;
  public loading = false;


  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;



  users: User[];
  user: User;
  cols: any[];
  closeResult: string;
  selectedRow: any;

  constructor(private userService: UserService, private alertify: ToastrService, private router: Router
    ,         private _modalService: NgbModal,
              private toastr: ToastrService ,
              public dialog: MatDialog) {
   //   PNotifyButtons; // Initiate the module. Important!
      // PNotify.notice({
      //   title: 'Custom Styling',
      //   text: 'I have an additional class that\'s used to give me special styling. I always wanted to be pretty. I also use NonBlock.js.',
      //   styling: {},
      //   addClass: 'custom nonblock',
      //   icon: 'fa fa-file-image fa-3x'
      // });
     // overlayContainer.getContainerElement().classList.add('app-dark-theme');
    }

  ngOnInit() {
    this.cols =
    [
        {header: 'Acc', field: 'id' , width: '120px' },
        {header: 'ID', field: 'if' , width: '45px'  },
        {header: 'USUARIO', field: 'username' , width: '120px'  },
        {header: 'NOMBRE COMPLETO', field: 'nombreCompleto'  ,  width: '220px' },
        {header: 'EMAIL', field: 'email'  , width: '220px'   },
        {header: 'DNI', field: 'dni'  ,  width: '140px'  },
        {header: 'ULT. INGRESO', field: 'lastActive'  ,  width: '140px'  },
        {header: 'ESTADO', field: 'nombreEstado' , width: '120px'  },
        {header: 'EN LINEA', field: 'enLinea'  , width: '130px'  },



      ];

    this.loading = true;

    this.userService.getUsers().subscribe(list => {

      this.users = list;
      this.loading = false;






    });
    // $("html,body").animate({ scrollTop: 100 }, "slow");
  }

  openDialog(id: any): void {

    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '650px',
      height: '300px',
      data: {id }
    });



    dialogRef.afterClosed().subscribe(result => {

      this.animal = result;
    });
  }
  open(user: any) {


    const modal =  this._modalService.open(NgbdModalConfirmAutofocus, { windowClass: 'danger-modal' });
    modal.componentInstance.model = user;

    modal.result.then((result) => {
      this.closeResult = `${result}`;

      if (this.closeResult == 'Ok') {
          user.EstadoId = 3;
          this.userService.actualizarEstado(user).subscribe(resp => {
            }, error => {

              this.alertify.error(error);
            }, () => {
              this.userService.getUsers().subscribe(list => {
               this.users = list;



          });
        });
       }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

      });


  }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }

  edit(id) {
     this.router.navigate(['seguridad/editarusuario', id]);

  }
  eliminar(id) {
    alert(id);
  }
  cambiarpassword(id) {
    this.router.navigate(['seguridad/cambiarpassword', id]);
  }
  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.users) {
          this.users = this.users.slice(event.first, (event.first + event.rows));
          this.loading = false;
      }
  }, 10000);
  }
}





