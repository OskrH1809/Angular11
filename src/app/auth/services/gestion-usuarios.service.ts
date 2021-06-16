import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseURLF;

@Injectable({
  providedIn: 'root'
})
export class GestionUsuariosService {

  constructor(private http: HttpClient) { }
  // registro de usuarios
  sendPostRegistro(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/api/register`, data);
  }



 
  // Login
  login_check(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/api/login_check`, data);
  }

}
