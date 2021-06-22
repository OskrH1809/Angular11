import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrlF = environment.baseURLF;

@Injectable({
  providedIn: 'root'
})
export class GestionServiciosContratadosService {
    constructor(private http: HttpClient) { }
    usuario = localStorage.getItem('usuario');




    getServiciosContratados(user): Observable<any>{
      return this.http.get(`${baseUrlF}/api/contratedxuser/${user}`);
    }

    updateEstadoServicioContratado(id,data):Observable<any>{
      return this.http.put(`${baseUrlF}/api/editestado/${id}`,data);
    }




}
