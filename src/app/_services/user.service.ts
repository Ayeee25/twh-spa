import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization : 'Bearer ' + localStorage.getItem('token'),
    'Content-Type' : 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.baseUrl + '/api/users/';
  constructor(private http: HttpClient) { }

  registrar(model: any){
    return this.http.post(this.baseUrl + 'register', model, httpOptions)
    .pipe(
      map((response: any) => {
         const user = response;
      }
    ));
  }

  actualizar(model: any){
    return this.http.post(this.baseUrl + 'update', model, httpOptions)
    .pipe(
      map((response: any) => {
        const user = response;
      })
    );
  }

  actualizarEstado(model: any){
    return this.http.post(this.baseUrl + 'updateestado', model, httpOptions)
    .pipe(
      map((response: any) => {
        const user = response;
      })
    );
  }
  actualizarpassword(model:any){
    return this.http.post(this.baseUrl + 'updatePassword', model,httpOptions)
    .pipe(
      map((response: any) => {
        const user = response;
         if(user)
         {
           
         }
      })
    )
  }

  getUsers(): Observable<User[]> {
     console.log(localStorage.getItem('token'));
     return this.http.get<User[]>(this.baseUrl, httpOptions);
  }
  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + id, httpOptions);
 }


}
