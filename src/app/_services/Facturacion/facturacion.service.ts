import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PreLiquidacion, Serie, Tarifa } from 'src/app/_models/Facturacion/preliquidacion';
import { ReporteServicio, VentaMensual } from 'src/app/_models/Facturacion/Comprobante';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  }),
};


@Injectable({
  providedIn: 'root'
})
export class FacturacionService {
  baseUrl = environment.baseUrl + '/api/facturacion/';
constructor(private http: HttpClient) { }

getTarifas(id: number, productoId: any): Observable<Tarifa[]> {
  const params = `?clienteid=${id}  &productoid=` + productoId;
  return this.http.get<Tarifa[]>(this.baseUrl + 'GetAllTarifasV2' + params, httpOptions);
}
deleteTarifa(id: number){
  return this.http.delete(this.baseUrl + 'DeleteTarifa?id=' + id, httpOptions)
  .pipe(
    map((response: any) => {
    }
   )
); }

getPendientesLiquidacion(id: number , model: any): Observable<PreLiquidacion[]> {
  const params = '?Id=' + id +
   '&fechainicio=' + model.InicioCorte +
   '&fechafin=' + model.FinCorte;

  return this.http.get<PreLiquidacion[]>(this.baseUrl + 'GetPendientesLiquidacion' + params, httpOptions);
}

getVentaMensual(): Observable<VentaMensual[]> {
  return this.http.get<VentaMensual[]>(this.baseUrl + 'GetVentaMensual' , httpOptions);
}


getReporteServicio(): Observable<ReporteServicio[]> {
  return this.http.get<ReporteServicio[]>(this.baseUrl + 'getReporteServicio' , httpOptions);
}


generar_preliquidacion(model: any){
  return this.http.post(this.baseUrl + 'GenerarPreliquidacion', model, httpOptions)
  .pipe(
    map((response: any) => {
    }
   )
); }
delete_preliquidacion(id: number){
  return this.http.delete(this.baseUrl + 'DeletePreliquidacion?id=' + id, httpOptions)
  .pipe(
    map((response: any) => {
    }
   )
); }

generar_comprobante(model: any){
  return this.http.post(this.baseUrl + 'GenerarComprobante', model, httpOptions)
  .pipe(
    map((response: any) => {
    }
   )
); }

getPreLiquidaciones(model: any): Observable<PreLiquidacion[]> {
    const params = '?Id=' + model.PropietarioId ;

    return this.http.get<PreLiquidacion[]>(this.baseUrl + 'GetPreLiquidaciones' + params, httpOptions);
  }
getPreLiquidacion(id: number): Observable<PreLiquidacion> {
    const params = '?Id=' + id ;
    return this.http.get<PreLiquidacion>(this.baseUrl + 'GetPreLiquidacion' + params, httpOptions);
  }
getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.baseUrl + 'GetAllSeries', httpOptions);
  }

insertTarifa(model: any){
   return this.http.post(this.baseUrl + 'InsertTarifa', model, httpOptions)
    .pipe(
      map((response: any) => {
      }
     )
  ); }

  getTarifa(id: any): Observable<Serie[]> {
    return this.http.get<Serie[]>(this.baseUrl + 'GetTarifa?id=' + id , httpOptions);
  }
  updateTarifa(model: any){
     return this.http.post(this.baseUrl + 'UpdateTarifa', model, httpOptions)
     .pipe(
       map((response: any) => {
       }
      )
   ); }

}
