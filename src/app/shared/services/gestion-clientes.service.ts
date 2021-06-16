import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const baseUrl = environment.baseURL;
const baseUrlF = environment.baseURLF;

@Injectable({
  providedIn: 'root'
})
export class GestionClientesService {

  constructor(private http: HttpClient) { }



  get_usersAll(): Observable<any>{
    return this.http.get(`${baseUrlF}/api/users`);
  }

  sendPos(data: any): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/servicio', data);
  }
}
