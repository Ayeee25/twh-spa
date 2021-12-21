import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { InventarioService } from 'src/app/_services/Inventario/inventario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { Area, Master, Ubicacion } from 'src/app/_models/Mantenimiento/ubicacion';
import { ToastrService } from 'ngx-toastr';
import { MenuItem, SelectItem } from 'primeng/api';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { isNgTemplate } from '@angular/compiler';


declare var $: any;

@Component({
  selector: 'app-acomodopallets',
  templateUrl: './acomodopallets.component.html',
  styleUrls: ['./acomodopallets.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class AcomodopalletsComponent implements OnInit {

  condition: any = false;
  almacenId: number;

  public loading = false;
  EquipoTransporteId: any;
  ubicaciones: Ubicacion[];
  master: any ;
  
  model: any = {};
  modeldetail: any = {};
  inventarioTodos: any;
  inventarios: InventarioGeneral[] = [] ;
  inventario: InventarioGeneral;
  draggedInventario: InventarioGeneral;

  selectedInventarios: InventarioGeneral[] = [] ;
  visibleSidebar4 = false;
  activeIndex = 1;
  pasos: MenuItem[];
  orden: OrdenRecibo;
  areas_detail: Area[];
  id: any;
  cols: any[];
  Inventario: InventarioGeneral[] = [];
  areas: SelectItem[] = [];
  niveles: SelectItem[] = [];
  columnas: SelectItem[] = [];


  areaid: any;
  nivelid: any;




  constructor(private alertify: ToastrService, private inventarioServicio: InventarioService, private generalService: GeneralService
            , private activatedRoute: ActivatedRoute
            , private ordenServicio: OrdenReciboService
            , private router: Router) { }

  ngOnInit() {

    this.id  = this.activatedRoute.snapshot.params.uid;
    this.EquipoTransporteId = this.activatedRoute.snapshot.params.uid2;

    this.ordenServicio.obtenerOrden(this.id).subscribe(resp => {
      this.orden = resp;
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
        } else {
          this.activeIndex = 1;
          this.router.navigate(['recibo/acomodopallets',  this.id,  this.EquipoTransporteId ]);
        }
      }},
      { label: 'Almacenamiento', command: (event: any) => {
        if (this.orden.nombreEstado === 'Pendiente Acomodo') {
          this.activeIndex = 1;
          this.visibleSidebar4 = true;
      } else {
        this.activeIndex = 2;
        this.router.navigate(['recibo/almacenamiento', this.id,  this.EquipoTransporteId ]);
      }
      }
    }
  ];

    this.cols =
    [
        {header: 'LPN', field: 'lodNum'  ,  width: '50px' },
        {header: 'PRODUCTO', field: 'descripcionLarga'  , width: '100px'   },
        {header: 'Cantidad', field: 'untQty'  ,  width: '50px'  },
        {header: 'Ubicación', field: 'ubicacion' , width: '80px'  },
        {header: 'Próxima Ubicación', field: 'ubicacionProxima'  , width: '80px'  },

    ];



    this.generalService.getAreas().subscribe(resp =>
      {
        this.areas_detail = resp;
       
        resp.forEach(element => {
          this.areas.push({
            value: element.id ,
            label: element.nombre
          });
        });

      });

    

      this.generalService.getNiveles().subscribe(resp =>
        {
          this.niveles.push({ label: 'Todos'  , value: undefined });

          resp.forEach(element => {
            this.niveles.push({
              value: element.id ,
              label:   element.descripcion
            });
          });
        });
        this.columnas.push({ label: 'Todos'  , value: undefined });
        for (let index = 1; index < 59; index++) {
          
          this.columnas.push({ label: index.toString()  , value: index });
         
        }




    this.inventarioServicio.getAll(this.id).subscribe(resp => {
      let sum = 0;
      let huella;



      resp.forEach(element => {
        sum += element.untQty;
        huella = element.codigoHuella;
      });

      this.inventarios.push({
        lodNum : '[ Todas los Pallets ]',
        productoId : 1,
        descripcionLarga: '',
        codigo: '',
        lotNum : '',
        untQty : sum
      });
      resp.forEach(element => {
        if (element.cantidad_productos > 1){
          element.descripcionLarga = 'Varios Productos';
          element.lotNum = 'Varios Lotes';
        }

        this.inventarios.push(element);
      });
      this.almacenId =   this.inventarios[1].almacenId;

      }, error => {

      }, () => {
      });
  }
onChange(value){
        this.generalService.getAllUbicaciones(this.almacenId, value.value).subscribe(list => {

        console.log(list);

        this.areaid = value.value;
        this.master = list;
        //this.ubicaciones = list.reverse();
        
      });
}

onChangeNivel(value){

 

  this.generalService.getAllUbicacionesxNivel(this.almacenId, this.areaid, value.value, this.model.ColumnaId).subscribe(list => {
   
     this.master = list;
  });
}
onChangeColumna(value){

  this.generalService.getAllUbicacionesxColumna(this.almacenId, this.areaid, value.value, this.model.nivelId).subscribe(list => {
    
    this.master = list;
  });
}

identificar(id){
     this.inventarioServicio.get(id).subscribe(resp => {
       this.modeldetail =  resp;
       $('html,body').animate({ scrollTop: 2500 }, 'slow');
   });
}
asignarUbicacion(){

  this.loading = true;

  if (this.selectedInventarios.length > 1) {
         this.inventarioTodos = this.selectedInventarios.filter(x => x.productoId !== 1);
         this.selectedInventarios = [];
    }
    else {
        this.inventarioTodos = this.selectedInventarios.filter(x => x.productoId !== 1);
    }

  this.inventarioServicio.asignar_ubicacion(this.inventarioTodos).subscribe(resp => {
  }, error => {
      this.alertify.error(error);
  }, () => {

    this.terminar();
  });
 }

terminar() {
  this.inventarioServicio.terminar_acomodo(this.id).subscribe(resp => {
    this.alertify.success('Se ha realizado el acomodo de las pallets con éxito.');
    this.router.navigate(['/recibo/listaordenrecibida', this.EquipoTransporteId ]);

  }, error => {
     if (error === 'Err101') {
      this.alertify.error('Aún tiene pallets pendientes de acomodo.');
     }
     this.alertify.error(error);
  }, () => {
    this.loading = false;
  });
 }


  select_ubicacion(i){

    if (this.condition) {
      this.condition = false;
    }
    else {
      this.condition = true;
    }
  }
  drop(event){
    console.log(event);

    if (event.estado === 'Lleno'){
      this.alertify.warning('Esta ubicación esta ocupada');
      return;
    }


    if (this.draggedInventario) {
      this.draggedInventario.ubicacionId = event.id;

      if (this.draggedInventario.productoId === 1) {
        this.inventarios.forEach(element => {
            element.ubicacionId = event.id;
            this.selectedInventarios.push(element);
        });
        this.inventarios = null;
        this.alertify.success('Se agregaron las pallets a la ubicación seleccionada');
      }
      else {

        const draggedCarIndex = this.findIndex(this.draggedInventario);
        this.selectedInventarios = [...this.selectedInventarios, this.draggedInventario ];
        this.inventarios = this.inventarios.filter((val, i) => i !== draggedCarIndex);
        this.draggedInventario = null;

        if (this.inventarios.length === 1){
           if (this.inventarios[0].productoId === 1) {
            this.inventarios = null;
           }
        }
        if(event.estado === 'Parcial'){

        }
        else {
            event.estado = 'Lleno';
        }

        this.alertify.success('Se agregó la pallet a la ubicación seleccionada');
       }
     }
  }
  dragStart(event, inventario: InventarioGeneral) {
    this.draggedInventario = inventario;
  }
  dragEnd(event) {
    this.draggedInventario = null;
  }
  findIndex(car: InventarioGeneral) {
    let index = -1;
    for (let i = 0; i < this.inventarios.length; i++) {
        if (car.lodNum === this.inventarios[i].lodNum) {
            index = i;
            break;
        }
    }
    return index;
    }
    deshacer(){


      this.selectedInventarios = null;
      this.inventarios = [];
      this.selectedInventarios = [];

      this.inventarioServicio.getAll(this.id).subscribe(resp => {
      let sum = 0;
      let huella;
      resp.forEach(element => {
        sum += element.untQty;
        huella = element.codigoHuella;
      });

      this.inventarios.push({
        lodNum : '[ Todas los Pallets ]',
        productoId : 1,
        descripcionLarga: '',
        codigo: '',
        lotNum : '',
        untQty : sum
      });
      resp.forEach(element => {
        if (element.cantidad_productos > 1){
          element.descripcionLarga = 'Varios Productos';
          element.lotNum = 'Varios Lotes';
        }

        this.inventarios.push(element);
      });

      this.almacenId =   this.inventarios[1].almacenId;

      }, error => {

      }, () => {

        this.master = [];
        // this.generalService.getAllUbicaciones(this.almacenId, this.areaid, this.nivelid, this.model.ColumnaId ).subscribe(list => {
        //       this.master = list;
        // });

      });


    }
}
