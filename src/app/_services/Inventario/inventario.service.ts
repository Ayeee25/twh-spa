import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { InventarioGeneral, InventarioDetalle } from 'src/app/_models/Inventario/inventariogeneral';
import { environment } from 'src/environments/environment';
import { GraficoStock, GraficoRecepcion } from 'src/app/_models/Inventario/GraficoStock';



const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  }),
};

@Injectable({
  providedIn: 'root'
})

export class InventarioService {
  baseUrl =  environment.baseUrl + '/api/inventario/';
  constructor(private http: HttpClient) {

     }

registrar_inventario(model: any) {
    return this.http.post(this.baseUrl + 'register_inventario', model, httpOptions)
    .pipe(
      map((response: any) => {
      }
    ));
}
registrar_inventariodetalle(model: any) {
  return this.http.post(this.baseUrl + 'RegistrarInventarioDetalle', model, httpOptions);
  // .pipe(
  //   map((response: any) => {
  //     console.log(response);
  //   }
  // ));
}



actualizar_inventario(model: any) {
  return this.http.post(this.baseUrl + 'actualizar_inventario', model, httpOptions)
  .pipe(
    map((response: any) => {
    }
  ));
}
merge_inventario(model: any) {
return this.http.post(this.baseUrl + 'merge_ajuste', model, httpOptions)
  .pipe(
    map((response: any) => {
    }
  ));
}
asignar_ubicacion(model: InventarioGeneral[]) {
  const body = JSON.stringify(model);

  return this.http.post(this.baseUrl + 'asignar_ubicacion', body, httpOptions)
  .pipe(
    map((response: any) => {
    }
   ));
}

terminar_acomodo(Id: number) {
  const model: any = {};
  model.OrdenReciboId = Id;

  return this.http.post(this.baseUrl + 'terminar_acomodo', model, httpOptions)
    .pipe(
      map((response: any) => {
        }
      ));
 }

almacenamiento(Id: number) {
  const model: any = {};
  model.Id = Id;

  return this.http.post(this.baseUrl + 'almacenamiento', model, httpOptions)
      .pipe(
        map((response: any) => {
        }
      ));
}
almacenamientoMasivo(Id: any) {
  const model: any = {};
  model.Id = Id;

  return this.http.post(this.baseUrl + 'almacenamientomasivo', model, httpOptions)
      .pipe(
        map((response: any) => {
        }
      ));
}

getAll(OrdenReciboID: number): Observable<InventarioGeneral[]> {
    const params = 'Id=' + OrdenReciboID ;
    return this.http.get<InventarioGeneral[]>(this.baseUrl + 'GetAll?' + params, httpOptions);
}
GetAllInventario(OrdenReciboId: any): Observable<InventarioGeneral[]> {
  const params = 'OrdenReciboId=' + OrdenReciboId ;
  return this.http.get<InventarioGeneral[]>(this.baseUrl + 'GetAllInventario?' + params, httpOptions);
}

GetInventarioByLotNum(productoid: any , lotnum: any): Observable<InventarioGeneral> {
  const params = 'productoid=' + productoid + '&lotnum=' + lotnum;
  return this.http.get<InventarioGeneral>(this.baseUrl + 'GetInventarioByLotNum?' + params, httpOptions);
}

GetAllInventarioDetalle(InventarioId: any): Observable<InventarioDetalle[]> {
  const params = 'InventarioId=' + InventarioId ;
  return this.http.get<InventarioDetalle[]>(this.baseUrl + 'GetAllInventarioDetalle?' + params, httpOptions);
}


getPallet(id: any): Observable<InventarioGeneral[]> {
     const params = 'OrdenReciboId=' + id ;
     return this.http.get<InventarioGeneral[]>(this.baseUrl + 'GetPallet?' + params, httpOptions);
}

  getGraficoStock(PropietarioId: number, AlmacenId: number): Observable<GraficoStock[]> {
    const params = 'PropietarioId=' + PropietarioId +
    '&AlmacenId=' + AlmacenId;
    return this.http.get<GraficoStock[]>(this.baseUrl + 'GetGraficoStock?' + params, httpOptions);
  }
  getGraficoRecepcion(PropietarioId: number, AlmacenId: number): Observable<GraficoRecepcion[]> {
    const params = 'PropietarioId=' + PropietarioId +
    '&AlmacenId=' + AlmacenId;
    return this.http.get<GraficoRecepcion[]>(this.baseUrl + 'GetGraficoRecepcion?' + params, httpOptions);
  }

  get(InventarioId: number): Observable<InventarioGeneral[]> {
    const params = 'Id=' + InventarioId ;
    return this.http.get<InventarioGeneral[]>(this.baseUrl + 'get?' + params, httpOptions);
  }
  delInventarioDetall(Id: number)  {
    const model: any = {};
    model.id = Id;

    return this.http.delete(this.baseUrl + 'DeleteInventarioDetalle?id=' + Id, httpOptions)
        .pipe(
          map((response: any) => {
          }
        ));
  }
  getAllInventarioAjusteDetalle(Id: number
   ): Observable<InventarioGeneral[]> {
    const params = 'Id=' + Id;
    return this.http.get<InventarioGeneral[]>(this.baseUrl + 'GetAllInvetarioAjusteDetalle?' + params, httpOptions);
  }
  getAllInventarioAjuste(ClienteId: number
    ,                    ProductoId: any
    ,                    EstadoId: number
   ): Observable<InventarioGeneral[]> {
    const params = 'ClienteId=' + ClienteId +
    '&ProductoId=' + ProductoId +
    '&EstadoId=' + EstadoId ;

    return this.http.get<InventarioGeneral[]>(this.baseUrl + 'GetAllInvetarioAjuste?' + params, httpOptions);
  }
  registrar_ajuste(model: any) {
    return this.http.post(this.baseUrl + 'register_ajuste', model, httpOptions)
    .pipe(
      map((response: any) => {
      }
    ));
  }
}
