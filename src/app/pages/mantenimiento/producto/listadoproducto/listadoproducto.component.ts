import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { Producto } from 'src/app/_models/Mantenimiento/producto';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { SelectItem } from 'primeng/api/selectitem';


@Component({
  selector: 'app-listadoproducto',
  templateUrl: './listadoproducto.component.html',
  styleUrls: ['./listadoproducto.component.css']
})
export class ListadoproductoComponent implements OnInit {

  clientes: SelectItem[] = [];



  public loading = false;
  productos: Producto[];
  model: any  ;
  cols: any[];



constructor(private productoService: ProductoService
   ,        private router: Router
   ,        private clienteService: ClienteService) {

   }

ngOnInit() {
  this.cols =
  [
     {header: 'ACCIONES', field: 'numOrden' , width: '40px' },
     {header: 'FAMILIA', field: 'familia' , width: '80px'  },
     {header: 'CODIGO', field: 'codigo' , width: '80px'  },
     {header: 'DESCRIPCION', field: 'descripcionLarga' , width: '160px'  },
     {header: 'SERIADO', field: 'seriado' , width: '50px'  },
     {header: 'ETIQUETADO', field: 'etiquetado' , width: '50px'  }
   ];
  this.model = {
    };
  this.clienteService.getAllPropietarios('').subscribe(resp => {

      resp.forEach(x => {
        this.clientes.push({ label: x.razonSocial.toUpperCase() , value: x.id.toString() });
     });

      if (localStorage.getItem('searchPro1') !== undefined){
            this.model.PropietarioId = localStorage.getItem('searchPro1');
      } else {
            this.model.PropietarioId = 1;
            console.log('entre');
      }
      // this.buscar();
  });

  }
verHuellas(id) {
    this.router.navigate(['mantenimiento/verproducto', id]);
  }
edit(id) {
    this.router.navigate(['mantenimiento/editarproducto', id]);
  }
buscar() {
      window.localStorage.setItem(
        'searchPro1',
        this.model.PropietarioId
     );

      this.loading = true;

      this.model.criterio = '';
      this.model.clienteId = this.model.PropietarioId;

      this.productoService.getAll(this.model.criterio, this.model.clienteId).subscribe(list => {
        console.log(list);
        this.productos = list ;
        this.loading = false;
    });
  }
}
