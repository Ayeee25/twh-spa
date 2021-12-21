import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { SelectItem } from 'primeng/api/selectitem';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/_common/datepicker.extend';


@Component({
  selector: 'app-editarordenrecibo',
  templateUrl: './editarordenrecibo.component.html',
  styleUrls: ['./editarordenrecibo.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class EditarordenreciboComponent implements OnInit {
  es: any;
  model: any = {};
  clientes: SelectItem[] = [];
  OrdenesDetalle: OrdenReciboDetalle[] = [];
  almacenes: SelectItem[] = [];

  IdNuevaOrden = 0;
  date: Date = new Date();
  settings = {
    bigBanner: true,
    timePicker: false,
    format: 'DD-MM-yyyy',
    defaultOpen: true
  };

  constructor(private ordenReciboService: OrdenReciboService,
              private clienteService: ClienteService,
              private router: Router,
              private generealService: GeneralService,
              private activatedRoute: ActivatedRoute
            , private alertify: ToastrService ) { }

  ngOnInit() {

    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      today: 'Hoy',
      clear: 'Borrar'
  };
    this.model.Id = this.activatedRoute.snapshot.params.uid;

    this.clienteService.getAllPropietarios('').subscribe(resp => {
            resp.forEach(element => {
              this.clientes.push({ value: element.id , label: element.razonSocial});
            });
          }, error => {
        }, () => {

          this.generealService.getAllAlmacenes().subscribe(resp => {
            resp.forEach(element => {
              this.almacenes.push({ value: element.id ,  label : element.descripcion});
            });

          }, error => {
          }, () =>  {

          this.ordenReciboService.obtenerOrden(  this.model.Id ).subscribe(resp =>
            {


                 this.model.FechaEsperada =  moment(new Date(resp.fechaEsperada).toLocaleString(), 'DD/MM/YYYY').toDate()  ;
                 this.model.HoraEsperada = resp.horaEsperada;
                 this.model.guiaremision = resp.guiaRemision;
                 this.model.PropietarioId = resp.propietarioId;
                 this.model.AlmacenId = resp.almacenId;


            });
          });
        });

   }


  registrar(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.model.Propietario =   this.clientes.filter(x => x.value === this.model.PropietarioId)[0].label;
    this.ordenReciboService.actualizar(this.model).subscribe(resp => {
      this.model = resp;
    }, error => {
       this.alertify.error(error);
    }, () => {
      this.alertify.success('Se actualizó correctamente.');
      this.router.navigate(['/recibo/listaordenrecibo']);
    });
  }
}
