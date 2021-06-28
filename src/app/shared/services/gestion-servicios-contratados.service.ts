import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
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
    headers = new HttpHeaders();




    getServiciosContratadosByUser(): Observable<any>{
      return this.http.get(`${baseUrlF}/api/services_by_user`);
      //
    }

    getServiciosContratadosUsuarioEspecifico(data:any):Observable<any>{

      return this.http.get(`${baseUrlF}/api/servicios_contratados_usuario_especifico`,);
    }

    updateEstadoServicioContratado(id,data):Observable<any>{
      return this.http.put(`${baseUrlF}/api/editestado/${id}`,data);
    }

    newTareas(data:any): Observable<any>{
      return this.http.post(`${baseUrlF}/api/tareas`,data);
    }

    postImageServiceContracted(data:any): Observable<any>{
      return this.http.post(`${baseUrlF}/api/documents`,data);
    }

}
