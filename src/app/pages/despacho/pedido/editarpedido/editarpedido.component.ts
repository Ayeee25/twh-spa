import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-editarpedido',
  templateUrl: './editarpedido.component.html',
  styleUrls: ['./editarpedido.component.css']
})
export class EditarpedidoComponent implements OnInit {

  es: any;
  date: Date = new Date();

  clientes: SelectItem[] = [];
  almacenes: SelectItem[] = [];
  propietarios: SelectItem[] = [];
  direcciones: SelectItem[] = [];

  id: any;
  model: any = {};


settings = {
  bigBanner: true,
  timePicker: false,
  format: 'dd-MM-yyyy',
  defaultOpen: true
};


  constructor(private clienteService: ClienteService,
              private ordenSalidaService: OrdenSalidaService,
              private alertify: ToastrService ,
              private generealService: GeneralService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params.uid;

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

    this.generealService.getAllAlmacenes().subscribe(resp => {

            resp.forEach(element => {
              this.almacenes.push({ value: element.id ,  label : element.descripcion});
            });

      }, error  => {}
      , () => {


        this.clienteService.getAllPropietarios('BCM').subscribe(resp => {

          resp.forEach(element => {
            this.propietarios.push({ value: element.id , label: element.razonSocial});
          });


      } , error => {}
      , () => {

                this.ordenSalidaService.obtenerOrden( this.id ).subscribe(resp => {
                  console.log(resp);

                  this.clienteService.getAllDirecciones(resp.clienteId).subscribe(resp2 => {
                            resp2.forEach(element => {
                              this.direcciones.push({
                                value: element.iddireccion,
                                label: element.direccion
                                + ' [ ' + element.departamento + ' - ' +  element.provincia + ' - ' + element.distrito + ' ] '
                               });
                            });


                    }, error => {
                    }, () => {
                  });

                  this.clienteService.getAllClientesxPropietarios(resp.propietarioId).subscribe(resp3 => {
                          resp3.forEach(element => {
                            this.clientes.push({ value: element.id , label: element.razonSocial});
                          });

                          }, error => {
                          }, () => {


                          this.model.id =    this.id ;
                          this.model.horaRequerida = resp.horaRequerida;
                          this.model.propietarioId = resp.propietarioId;
                          this.model.almacenId  = resp.almacenId;
                          this.model.clienteId = resp.clienteId;
                          this.model.direccionId = resp.direccionId;
                          this.model.guiaRemision = resp.guiaRemision;


                          this.model.fechaRequerida =  moment(new Date(resp.fechaRequerida).toLocaleString(), 'DD/MM/YYYY').toDate()  ;

                    });

              });

      });

      });


  }
  onChangeCliente(cliente){
    this.direcciones = [];

    this.clienteService.getAllDirecciones(cliente.value).subscribe(resp => {
      resp.forEach(element => {
        this.direcciones.push({
          value: element.iddireccion,
          label: element.direccion  + ' [ ' + element.departamento + ' - ' +  element.provincia + ' - ' + element.distrito + ' ] '  });
      });


      }, error => {
      }, () => {
    });
  }

  onChangePropietario(propietario) {
    this.clientes = [];

    this.clienteService.getAllClientesxPropietarios(propietario.value).subscribe(resp => {
      resp.forEach(element => {
        this.clientes.push({ value: element.id , label: element.razonSocial});
      });


      }, error => {
      }, () => {
    });
  }
  registrar(form: NgForm){
    this.model.Propietario = this.propietarios.filter(x => x.value === this.model.propietarioId)[0].label;
    moment.locale('en');




    if (form.invalid) {
         return;
    }
    this.ordenSalidaService.ActualizarOrdenSalida(this.model).subscribe(resp =>
      {
        this.model = resp;
        console.log(this.model);
      }, error => {
         this.alertify.error(error);
      }, () => {
        this.alertify.success('Se actualizó correctamente.');
        this.router.navigate(['/picking/listaordensalida',  this.model ]);
      });
    }


}
