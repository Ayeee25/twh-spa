import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { environment } from 'src/environments/environment';
import { OrdenSalida } from 'src/app/_models/Despacho/ordenrecibo';
import { Carga } from 'src/app/_models/Despacho/Carga';
import { ShipmentLine, Shipment } from 'src/app/_models/Despacho/shipmentline';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  }),
};

const httpOptionsUpload = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
  })
  // , observe: 'body', reportProgress: true };
};


@Injectable({
  providedIn: 'root'
})
export class OrdenSalidaService {
  baseUrl = environment.baseUrl + '/api/ordensalida/';
constructor(private http: HttpClient) { }

registrar_salidacarga(model: any) {
  return this.http.post(this.baseUrl + 'RegisterSalidaShipment', model, httpOptions);
}
RegistarOrdenSalida(model: any){
  return this.http.post(this.baseUrl + 'RegisterOrdenSalida', model, httpOptions);
}
ActualizarOrdenSalida(model: any){
  return this.http.post(this.baseUrl + 'UpdateOrdenSalida', model, httpOptions);
}

PlanificarPicking(model: any){
  return this.http.post(this.baseUrl + 'PlanificarPicking', model, httpOptions);
}

uploadFile(formData: FormData, UserId: number) {
  return this.http.post(this.baseUrl + 'UploadFile?usrid=' + UserId.toString()
 , formData
 , httpOptionsUpload
);
}

getAllOrdenSalida(model: any): Observable<OrdenSalida[]> {
  const params = '?PropietarioID=' + model.PropietarioId +
  '&EstadoId=' + model.estadoIdfiltro +
  '&fec_ini=' + model.fec_ini.toLocaleDateString() +
  '&fec_fin=' + model.fec_fin.toLocaleDateString() +
  '&AlmacenId=' + model.AlmacenId ;
  return this.http.get<OrdenSalida[]>(this.baseUrl + 'GetAllOrder' + params, httpOptions);
}

getAllOrdenPedido(model: any): Observable<OrdenSalida[]> {
  const params = '?PropietarioID=' + model.PropietarioId +
  '&EstadoId=' + model.EstadoId +
  '&fec_ini=' + model.fec_ini.toLocaleDateString() +
  '&fec_fin=' + model.fec_fin.toLocaleDateString() +
  '&AlmacenId=' + 1 +
  '&UserId=' + 7 ;
  return this.http.get<OrdenSalida[]>(this.baseUrl + 'GetAllPedido' + params, httpOptions);
}


getAllPendienteCarga(model: any): Observable<ShipmentLine[]> {
  const params = '';
  return this.http.get<ShipmentLine[]>(this.baseUrl + 'GetAllPendienteCarga' + params, httpOptions);
}

getAllPickingPendiente(): Observable<Shipment[]> {
  const params = '';
  return this.http.get<Shipment[]>(this.baseUrl + 'ListarPickingPendiente' + params, httpOptions);
}

getAllPickingPendienteDetalle(Id): Observable<ShipmentLine[]> {
  const params = '?ShipmentId=' + Id;
  return this.http.get<ShipmentLine[]>(this.baseUrl + 'ListarPickingPendienteDetalle' + params, httpOptions);
}



getAllOrdenSalidaPendientes(model: any): Observable<OrdenSalida[]> {

 if(model.AlmacenId === undefined) {
  model.AlmacenId = '';
 }

 if(model.PropietarioId === undefined) {
  model.PropietarioId = '';
 }
  const params = '?PropietarioID=' + model.PropietarioId +
  //'&EstadoId=' + model.EstadoId +
  //'&DaysAgo=' + model.intervalo +
  '&AlmacenId=' + model.AlmacenId;

  return this.http.get<OrdenSalida[]>(this.baseUrl + 'GetAllOrderPendiente' + params, httpOptions);
}


getAllCargas(model: any): Observable<Carga[]> {
  const params = '?PropietarioID=' + model.PropietarioId +
  '&EstadoId=' + model.EstadoId ;
  return this.http.get<Carga[]>(this.baseUrl + 'GetAllCargas' + params, httpOptions);
}

getAllCargas_pendientes(model: any): Observable<Carga[]> {
  const params = '?PropietarioID=' + model.PropietarioId +
  '&EstadoId=' + model.EstadoId ;
  return this.http.get<Carga[]>(this.baseUrl + '' + params, httpOptions);
}
getAllWork(model: any): Observable<Carga[]> {
  const params = '?PropietarioID=' + model.PropietarioId +
  '&EstadoId=' + model.EstadoId ;
  return this.http.get<Carga[]>(this.baseUrl + 'GetAllWork' + params, httpOptions);
}

getAllWork_Asignado(model: any): Observable<Carga[]> {
  const params = '?PropietarioID=' + model.PropietarioId +
  '&EstadoId=' + model.EstadoId ;
  return this.http.get<Carga[]>(this.baseUrl + 'GetAllWorkAssigned' + params, httpOptions);
}

getAllWorkDetail(id: number): Observable<Carga[]> {
  const params = '?WrkId=' + id ;
  return this.http.get<Carga[]>(this.baseUrl + 'getAllWorkDetail' + params, httpOptions);
}

getAllByEquipoTransporte(model: any): Observable<OrdenRecibo[]> {
  const params = '?EquipoTransporteId=' + model.EquipoTransporteId ;
  return this.http.get<OrdenRecibo[]>(this.baseUrl + 'GetOrderbyEquipoTransporte' + params, httpOptions);
}

actualizar(model: any){
  return this.http.post(this.baseUrl + 'update', model, httpOptions);
}

obtenerOrden(id: any): Observable<OrdenSalida> {
  return this.http.get<OrdenSalida>(this.baseUrl + 'GetOrder?OrdenSalidaId=' + id, httpOptions);
}

registrar_detalle(model: any){

  console.log(model);


  return this.http.post(this.baseUrl + 'register_detail', model, httpOptions);
  // .pipe(
  //   map((response: any) => {

  //   }
  //  )
 }

vincularEquipoTransporte(model: any){
    return this.http.post(this.baseUrl + 'RegisterEquipoTransporte', model, httpOptions);
}

matchEquipoTransporte(model: any){
  return this.http.post(this.baseUrl + 'MatchTransporteCarga', model, httpOptions);
}

registrar_carga(model: any){
  return this.http.post(this.baseUrl + 'RegisterCarga', model, httpOptions)
  .pipe(
    map((response: any) => {
    }
   )
); }



deleteOrder(id: any): Observable<OrdenSalida[]> {
  const params = '?OrdenSalidaId=' + id ;
  return this.http.delete<OrdenSalida[]>(this.baseUrl + 'DeleteOrder' + params, httpOptions);
}


deletePlanificacion(id: any): Observable<OrdenSalida[]> {
  const params = '?Id=' + id ;
  return this.http.delete<OrdenSalida[]>(this.baseUrl + 'EliminarPlanificacion' + params, httpOptions);
}


deleteOrderDetail(id: any): Observable<OrdenSalida[]> {
  const params = '?id=' + id ;
  return this.http.delete<OrdenSalida[]>(this.baseUrl + 'DeleteOrderDetail' + params, httpOptions);
}



assignmentOfDoor(ids: string , ubicacionId: number) {
    const model: any = {};
    model.ids = ids;
    model.PuertaId = ubicacionId;

    return this.http.post(this.baseUrl + 'assignmentOfDoor', model, httpOptions)
    .pipe(
      map((response: any) => {
      }
    )
); }
assignmentOfUser(ids: string , UserId: number) {
  const model: any = {};
  model.ids = ids;
  model.UserId = UserId;

  return this.http.post(this.baseUrl + 'assignmentOfUser', model, httpOptions)
  .pipe(
    map((response: any) => {
    }
  )
); }
movimientoSalida(Id: number){
  // RegisterInventario
    const model: any = {};
    model.Id = Id;

    return this.http.post(this.baseUrl + 'MovimientoSalida', model, httpOptions)
    .pipe(
      map((response: any) => {
      }
    )
  );
}
movimientoSalidaMasiva(Id: number) {
  const model: any = {};
  model.Id = Id;

  return this.http.post(this.baseUrl + 'MovimientoSalidaMasivo?WrkId=' + Id , model, httpOptions)
  .pipe(
    map((response: any) => {
    }
  )
);
}


}
