import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from '../_models/rol';
import { TreeviewItem } from 'ngx-treeview';
import { environment } from 'src/environments/environment';
import { RolUser } from '../_models/roluser';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
     'Content-Type' : 'application/json'
  }),

};


@Injectable({
  providedIn: 'root'
})
export class RolService {
  baseUrl = environment.baseUrl + '/api/roles/';
  constructor(private http: HttpClient, ) { }

  getAll(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.baseUrl, httpOptions);
 }

 getPaginas(RolId: any): Observable<TreeviewItem[]> {
  return this.http.get<TreeviewItem[]>(this.baseUrl + 'obtenermenu?idRol=' + RolId  , httpOptions);
 }

 savePaginas(model: any){
     const body = JSON.stringify(model);
     return this.http.post(this.baseUrl + 'addoption', body, httpOptions);
  }
  getRolesForUser(UserId: any): Observable<RolUser[]> {
    return this.http.get<RolUser[]>(this.baseUrl + 'getallroles?UserId=' + UserId,  httpOptions);
 }
 saveRoles(model: any, UserId: any){
  const body = JSON.stringify(model);
  return this.http.post(this.baseUrl + 'addroluser?UserId=' + UserId, body, httpOptions);
}
saveRol(model: any){
  const body = JSON.stringify(model);
  return this.http.post(this.baseUrl + 'register', body, httpOptions);
}
}





