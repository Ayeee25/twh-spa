import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from 'src/app/_models/Mantenimiento/Estado';
import { Vehiculo } from 'src/app/_models/Mantenimiento/vehiculo';
import { Proveedor } from 'src/app/_models/Mantenimiento/proveedor';
import { Chofer } from 'src/app/_models/Mantenimiento/chofer';
import { Area, Ubicacion, Almacen, Nivel, Master } from 'src/app/_models/Mantenimiento/ubicacion';
import { ValorTabla } from 'src/app/_models/Mantenimiento/valortabla';
import { environment } from 'src/environments/environment';

const httpOptions = {
    headers: new HttpHeaders({
      Authorization : 'Bearer ' + localStorage.getItem('token'),
      'Content-Type' : 'application/json'
    }),
};
@Injectable({
    providedIn: 'root'
  })
export class GeneralService {
    baseUrl = environment.baseUrl + '/api/general/';
    constructor(private http: HttpClient) { }

      getAll(TablaId: number): Observable<Estado[]> {
        return this.http.get<Estado[]>(this.baseUrl + '?TablaId=' + TablaId, httpOptions);
      }
      getValorTabla(TablaId: number): Observable<ValorTabla[]> {
        return this.http.get<ValorTabla[]>(this.baseUrl + 'GetAllValorTabla?TablaId=' + TablaId, httpOptions);
      }
      getVehiculos(placa: string): Observable<Vehiculo[]> {
        return this.http.get<Vehiculo[]>(this.baseUrl + 'GetVehiculos?placa=' + placa , httpOptions);
      }
      getProveedores(criterio: string): Observable<Proveedor[]> {
        return this.http.get<Proveedor[]>(this.baseUrl + 'GetProveedor?criterio=' + criterio , httpOptions);
      }
      getChoferes(criterio: string): Observable<Chofer[]> {
        return this.http.get<Chofer[]>(this.baseUrl + 'GetChofer?criterio=' + criterio , httpOptions);
      }


      getAreas(): Observable<Area[]> {
        return this.http.get<Area[]>(this.baseUrl + 'GetAreas', httpOptions);
      }

      getNiveles(): Observable<Nivel[]> {
        return this.http.get<Nivel[]>(this.baseUrl + 'GetNiveles', httpOptions);
      }

      getAllUbicaciones(AlmacenId: number, AreaId: number): Observable<Ubicacion[]> {
        const params = 'AlmacenId=' + AlmacenId + '&AreaId=' + AreaId;
        return this.http.get<Ubicacion[]>(this.baseUrl + 'GetUbicaciones?' + params, httpOptions);
      }

      getPuertas(AlmacenId: number, AreaId: number): Observable<Ubicacion[]> {
        const params = 'AlmacenId=' + AlmacenId + '&AreaId=' + AreaId;
        return this.http.get<Ubicacion[]>(this.baseUrl + 'getPuertas?' + params, httpOptions);
      }

      getAllUbicacionesxNivel(AlmacenId: number, AreaId: number, NivelId: string, ColumnaId: string): Observable<Master[]> {
       if(NivelId === undefined) NivelId = '';
       if(ColumnaId === undefined) ColumnaId = '';

        const params = 'AlmacenId=' + AlmacenId + '&AreaId=' + AreaId + '&NivelId=' + NivelId + '&ColumnaId=' + ColumnaId ;
        return this.http.get<Master[]>(this.baseUrl + 'GetUbicacionesxNivel?' + params, httpOptions);
      }
      getAllUbicacionesxColumna(AlmacenId: number, AreaId: number, ColumnaId: string, NivelId: string): Observable<Master[]> {
        if(NivelId === undefined) NivelId = '';
        if(ColumnaId === undefined) ColumnaId = '';
        const params = 'AlmacenId=' + AlmacenId + '&AreaId=' + AreaId + '&ColumnaId=' + ColumnaId + '&NivelId=' + NivelId; 
        return this.http.get<Master[]>(this.baseUrl + 'GetUbicacionesxNivel?' + params, httpOptions);
      }

      getAllAlmacenes(): Observable<Almacen[]> {
        return this.http.get<Almacen[]>(this.baseUrl + 'GetAlmacenes' , httpOptions);
      }


}
