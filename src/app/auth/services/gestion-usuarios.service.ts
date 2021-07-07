import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseURLF;


@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {
  token = localStorage.getItem('token');
  helper = new JwtHelperService();
  decodeToken = this.helper.decodeToken(localStorage.getItem('token'));

  constructor(private router:Router,private http: HttpClient) { }
  // registro de usuarios
  sendPostRegistro(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/api/register`, data);
  }

  cambiarContraseña(data){
    return this.http.put<any>(`${baseUrl}/api/edit_password`, data);
  }


  username(){
    if (this.decodeToken==null) {
      return '';
    } else {
      return this.decodeToken.username;
    }
  }

  // Login
  login_check(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/api/login_check`, data);
  }


  verificarAcceso():boolean{
    if (this.token==null) {
      return false
    } else {
      return true
    }

  }

  role(){
    if (this.decodeToken==null) {
      return 'sin roles';
    } else {
      return this.decodeToken.roles[0];
    }
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate([''])
     .then(() => {
    window.location.reload();
     });

  }




}
