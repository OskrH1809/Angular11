import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const baseUrl = environment.baseURL;


@Injectable({
  providedIn: 'root'
})
export class CreacionServiciosService {

  constructor(private http: HttpClient){



  }


  get_servicios(): Observable<any>{
    return this.http.get(`${baseUrl}/serviciosall`);
  }


  sendPos(data: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/servicio', data);
}

deleteServicio(id): Observable<any>{
  return this.http.delete(`${baseUrl}/serviciodelete/${id}`);
}

updateServicio(id,data){
return this.http.put(`${baseUrl}/update_servicio/${id}`, data);
}
}
