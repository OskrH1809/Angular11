import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseURLF;
@Injectable({
  providedIn: 'root'
})
export class GestionServiciosService {

  constructor(private http: HttpClient) { }

  get_servicios(): Observable<any>{
    return this.http.get(`${baseUrl}/api/services`);
  }


  sendPost(data: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/api/services`, data);
  }

  updateServicio(id,data){
    return this.http.put(`${baseUrl}/api/services/${id}`, data);
  }

  deleteServicio(id): Observable<any>{
      return this.http.delete(`${baseUrl}/api/services/${id}`);
  }
}