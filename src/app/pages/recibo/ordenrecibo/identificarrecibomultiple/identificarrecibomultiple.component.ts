import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, Renderer2  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import {  OrdenReciboDetalle, OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';

import { NgForm } from '@angular/forms';
import { InventarioGeneral, InventarioDetalle } from 'src/app/_models/Inventario/inventariogeneral';
import { InventarioService } from 'src/app/_services/Inventario/inventario.service';
import { SelectItem, MenuItem } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { ModalscanComponent } from './modalscan.component';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-identificarrecibomultiple',
  templateUrl: './identificarrecibomultiple.component.html',
  styleUrls: ['./identificarrecibomultiple.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DialogService]
})
export class IdentificarrecibomultipleComponent implements OnInit {
  @ViewChild('productserie') searchElement: ElementRef;
  blockedPanel = false;
  id: any;
  model: any = {};
  es: any;
  items: MenuItem[];
  pasos: MenuItem[];
  public loading = false;
  modeldetail: any = {};
  EquipoTransporteId: any;
  ordenes: OrdenReciboDetalle[] = [] ;
  orden: OrdenRecibo;
  cols: any[];
  cols2: any[];
  cols3: any[];

  cols4: any[];

  selectedRow: OrdenReciboDetalle[] = [];
  total = 0;
  AddInventario: InventarioGeneral[] = [];

  Inventario: InventarioGeneral[] = [];

  InventarioDetalles: InventarioDetalle[] = [];
  InventarioDetalle: InventarioDetalle = {};


  huellaDetalle: SelectItem[] = [];
  huellas: SelectItem[] = [];
  estados: SelectItem[] = [];
  visibleSidebar4 = false;
  activeIndex = 0;

  ref: DynamicDialogRef;

  @ViewChild('dis') input: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
              private ordenServicio: OrdenReciboService,
              private generalService: GeneralService,
              private inventarioService: InventarioService,
              private alertify: ToastrService,
              public dialogService: DialogService,
              private router: Router,
              private renderer: Renderer2,
              private productoService: ProductoService) { }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params.uid;
    this.EquipoTransporteId  = this.activatedRoute.snapshot.params.uid2;

    this.ordenServicio.obtenerOrden(this.id).subscribe(resp => {
      this.orden = resp;
      this.ordenes = resp.detalles;
      console.log(this.orden);

    });

    this.pasos = [
      {
        label: 'Identificar', command: (event: any) => {
        this.activeIndex = 0;
        this.router.navigate(['/recibo/identificarrecibomultiple',  this.id,  this.EquipoTransporteId ]);
      }}, {

        label: 'Acomodo', command: (event: any) => {
        if (this.orden.nombreEstado === 'Asignado') {
            this.activeIndex = 0;
            this.visibleSidebar4 = true;
        }
        else {
          // this.inventarioService.GetAllInventario(this.id).subscribe( resp => {
          //   this.Inventario = resp;
          // });

          this.activeIndex = 1;
          this.router.navigate(['recibo/acomodopallets',  this.id,  this.EquipoTransporteId ]);

        }
      }},
      { label: 'Almacenamiento', command: (event: any) => {
        if (this.orden.nombreEstado === 'Asignado' || this.orden.nombreEstado === 'Pendiente Acomodo') {
          this.activeIndex = 0;
          this.visibleSidebar4 = true;
      }
      else {
        this.activeIndex = 2;
        this.router.navigate(['recibo/almacenamiento', this.id,  this.EquipoTransporteId ]);
      }
      }
    }
  ];

    this.mostrarInventario();

    this.generalService.getAll(3).subscribe(resp => {
        resp.forEach(element => {
          this.estados.push({value: element.id, label: element.nombreEstado});
        });
      });


    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
      dayNamesShort: [ 'dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb' ],
      dayNamesMin: [ 'D', 'L', 'M', 'X', 'J', 'V', 'S' ],
      monthNames: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre',
                  'octubre', 'noviembre', 'diciembre'],
      monthNamesShort: [ 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic' ],
      today: 'Hoy',
      clear: 'Borrar'
  };
    this.cols =
    [
        {header: 'L.', field: 'linea'  ,  width: '50px' },
        {header: 'SKU', field: 'codigo'  , width: '100px'   },
        {header: 'PRODUCTO', field: 'producto'  ,  width: '190px'  },
        {header: 'CANT', field: 'cantidad' , width: '80px'  },
        {header: 'PEND', field: 'faltante'  , width: '80px'  },
        {header: 'ESTADO', field: 'estado', width: '80px'    },
    ];

    this.cols2 =
    [
        {header: 'ACC', field: 'numOrden' , width: '40px' },
        {header: 'SKU', field: 'codigo'  , width: '80px'   },
        {header: 'PRODUCTO', field: 'producto'  ,  width: '150px'  },
        {header: 'CANT', field: 'cantidad' , width: '60px'  },
        {header: 'ESTADO', field: 'completo', width: '80px'    },
    ];
    this.cols3 =
    [
        {header: 'ACC', field: 'numOrden' , width: '40px' },
        {header: 'LOTNUM', field: 'lodNum'  , width: '60px'   },
        {header: 'PRODUCTO', field: 'descripcionLarga'  ,  width: '130px'  },
        {header: 'UBICACIÓN', field: 'ubicacion' , width: '100px'  },
        {header: 'CANT', field: 'untQty'  , width: '60px'  },
        {header: 'SERIADO', field: 'seriado'  , width: '70px'  },
        {header: '#Scaneados', field: 'scanQty'  , width: '70px'  },

        // {header: 'ALMACEN', field: 'almacen', width: '80px'    },
    ];

    this.cols4 =
    [
        {header: 'ACC', field: 'numOrden' , width: '40px' },
        {header: 'PRODUCT ID', field: 'lodNum'  , width: '150px'   },
        {header: 'MAC', field: 'descripcionLarga'  ,  width: '150px'  },
        {header: 'SERIE', field: 'ubicacion' , width: '180px'  }

    ];

   // this.load();

  }
  load() {
    this.ordenServicio.obtenerOrden(this.id).subscribe(resp => {
      this.orden = resp;
      this.ordenes = resp.detalles;
    });
  }

  actualizar(form: NgForm) {
    this.total = 0;
    const productos = this.AddInventario.filter(element => element.productoId === this.modeldetail.productoId );

    productos.forEach(x => {
      this.total =  this.total  +    +x.untQty   ;
     });

    this.AddInventario.push({
           productoId : this.modeldetail.productoId,
           untQty : this.modeldetail.untQty,
           descripcionLarga: this.modeldetail.producto,
           lotNum : this.modeldetail.LotNum,
           huellaId : +this.modeldetail.huellaId,
           codigo: this.modeldetail.codigo,
           linea: this.modeldetail.linea,
           estadoId : this.modeldetail.estadoId,
           estado: this.estados.find(x => x.value === this.modeldetail.estadoId).label,
           OrdenReciboDetalleId :  this.modeldetail.id,
           ordenReciboId : this.id,
           id: this.AddInventario.length,
           fechaManufactura: this.modeldetail.fechaManufactura,
           fechaExpire: this.modeldetail.fechaExpire,
           referencia : this.modeldetail.referencia
         });
    this.ordenes.find(x => x.productoId === this.modeldetail.productoId)
                        .cantidadRecibida = this.total +  +this.modeldetail.cantidadRecibida ;

  }


  onChangeHuella(huella) {
    this.huellaDetalle = [];

    this.productoService.getHuellasDetalle(huella.value).subscribe(resp => {
      resp.forEach(element => {
        this.huellaDetalle.push({value: element.unidadMedidaId, label: element.unidadMedida + ' - ' + element.untQty + ' Unidades'
        });
      });
    });
  }

  generarPallet() {
          this.loading = true;
          this.ordenServicio.identificar_detallemultiple(this.AddInventario).subscribe(resp => {
            this.alertify.success('Se generó correctamente.', 'TWH');

          }, error => {

            this.alertify.error('Ocurrió un error en el proceso de registro. Revise la cantidad recibida.', 'TWH');
            this.loading = false;
          } , () => {
            this.loading = false;
            this.AddInventario = [];
            this.load();
            this.mostrarInventario();
          });
  }
  terminar() {

    if (this.orden.nombreEstado !== 'Asignado' && this.orden.nombreEstado !== 'Recibiendo' ) {
      this.alertify.error('La orden ya fue identificada', 'TWH');
      return;
    }

    this.loading = true;
    this.ordenServicio.cerrar_identificacion(this.id).subscribe(resp => {

    }, error => {

       if (error.statusText === 'Not Found') {
        this.alertify.error('Tiene líneas pendientes por identificar', 'TWH');
      } else {
        this.alertify.error(error.statusText);
      }

       this.loading = false;
    }, () => {
      this.loading = false;
      this.alertify.success('Se actualizó correctamente.');
      this.router.navigate(['/recibo/listaordenrecibida',  this.EquipoTransporteId ]);
    });
}
  delete(id) {
    const productos = this.AddInventario.filter(element => element.id === id)[0];
    const index =  this.AddInventario.indexOf(productos, 0);
    this.AddInventario.splice(index, 1);
  }
  onBlurMethod(lotnum){
    this.inventarioService.GetInventarioByLotNum(this.modeldetail.productoId, lotnum).subscribe(resp =>
     {
           console.log(resp);
           this.modeldetail.fechaManufactura =  moment(new Date(resp.fechaManufactura).toLocaleString(), 'DD/MM/YYYY').toDate()  ;
           this.modeldetail.fechaExpire =  moment(new Date(resp.fechaExpire).toLocaleString(), 'DD/MM/YYYY').toDate()  ;


     });
 }
identificar(event) {

  this.renderer.removeClass(this.input.nativeElement, 'disabled');

  this.loading = true;
  $('html,body').animate({ scrollTop: 400 }, 'slow');

  this.ordenServicio.obtenerOrdenDetalle(event.data.id).subscribe(resp => {
     this.modeldetail =  resp;
     this.huellas = [];
     this.productoService.getHuellas(this.modeldetail.productoId).subscribe( huellas => {
      huellas.forEach(element => {
         this.huellas.push({value: element.id, label: element.codigoHuella + ' -Cama de  ' + element.caslvl
         });
       });
     });

     this.loading = false;
   });
}
numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
 }
 generarPallets() {

  this.loading = true;
  this.ordenServicio.identificar_detalle(this.modeldetail).subscribe(resp => {

  }, error => {
     console.log(error);
     this.loading = false;
    //  if (error.statusText === 'err010') {

     this.alertify.error('La cantidad que intenta recibir supera el límite de la cantidada esperada');
    //  } else {
    //    this.alertify.error(error.statusText);
    //  }
    }, () => {
      this.loading = false;
      this.id  = this.activatedRoute.snapshot.params.uid;
      this.ordenServicio.obtenerOrden(this.id).subscribe(resp => {
      this.ordenes = resp.detalles;
      });

      this.modeldetail = {};
      this.alertify.success('Se actualizó correctamente.');

      this.AddInventario = [];
      this.load();
      this.mostrarInventario();
  });
 }
 mostrarInventario() {
    this.inventarioService.GetAllInventario(this.id).subscribe( resp => {
      this.Inventario = resp;
    });
 }
 registrarDetalle(id) {

  this.InventarioDetalle = {};
  this.InventarioDetalle.inventarioId = id;
  $('html,body').animate({ scrollTop: 1200 }, 'slow');
  this.searchElement.nativeElement.focus();

  this.inventarioService.GetAllInventarioDetalle(id).subscribe(resp => {
    this.InventarioDetalles = resp;

  });

 }
 RegisterProduct(){
  this.InventarioDetalle.codigoProducto = this.model.productserie;
}
RegisterMac(){
  this.InventarioDetalle.codigoMac = this.model.macserie;

}
RegisterSerie(){
  this.InventarioDetalle.codigoSerie = this.model.serie;

  if (this.InventarioDetalle.codigoMac === undefined){
    this.alertify.error('No se scaneo correctamente.', 'TWH' );
    return ;
  }
  if (this.InventarioDetalle.codigoProducto === undefined){
    this.alertify.error('No se scaneo correctamente.', 'TWH' );
    return ;
  }
  if (this.InventarioDetalle.codigoSerie === undefined){
    this.alertify.error('No se scaneo correctamente.', 'TWH' );
    return ;
  }


  const inven = this.Inventario.find(x => x.id === this.InventarioDetalle.inventarioId);


  this.model = {};
  this.searchElement.nativeElement.focus();
  this.InventarioDetalle.productoId = inven.productoId;

  this.inventarioService.registrar_inventariodetalle(this.InventarioDetalle).subscribe(resp => {
    if (resp === false) {
     this.alertify.error('El código de producto ya existe.', 'TWH' );
    } else {
      this.alertify.success('Se scaneo con éxito.', 'TWH' );
    }

    this.inventarioService.GetAllInventarioDetalle( this.InventarioDetalle.inventarioId ).subscribe(resp1 => {
      this.InventarioDetalles = resp1;
      this.mostrarInventario();
      $('html,body').animate({ scrollTop: 1500 }, 'slow');

    });
  });

  }
  eliminarDetalle(id){

    this.inventarioService.delInventarioDetall(id).subscribe(x => {
      this.inventarioService.GetAllInventarioDetalle( this.InventarioDetalle.inventarioId ).subscribe(resp => {
        this.InventarioDetalles = resp;
        this.alertify.success('Se eliminó con éxito.', 'TWH' );
        this.searchElement.nativeElement.focus();
        this.mostrarInventario();
      });
    });
  }
}
