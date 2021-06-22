import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseURLF;


@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {
  token = localStorage.getItem('token');
  usuario = localStorage.getItem('usuario');


  constructor(private router:Router,private http: HttpClient) { }
  // registro de usuarios
  sendPostRegistro(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/api/register`, data);
  }




  // Login
  login_check(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/api/login_check`, data);
  }


  verificarAcceso():boolean{
    if (this.token==null || this.usuario==null) {
      return false
    } else {
      return true
    }

  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('user');

    this.router.navigate([''])
     .then(() => {
    window.location.reload();
     });

  }




}
