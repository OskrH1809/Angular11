import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
const baseUrl = environment.baseURL;

@Injectable({
  providedIn: 'root'
})
export class GestionClientesService {

  constructor(private http: HttpClient) { }



  get_usersAll(): Observable<any>{
    return this.http.get(`${baseUrl}/userall`);
  }

}
