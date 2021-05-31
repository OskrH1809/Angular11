import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseURL;

@Injectable({
  providedIn: 'root'
})
export class InfoCardsService {

  apiURL  = 'http://127.0.0.1:8000/infocards';




  constructor(private http: HttpClient,private httpClient: HttpClient) { }


  getMeses() {

    return this.http.get<any>(this.apiURL);
  }

  sendPos(data: any): Observable<any> {
    return this.httpClient.post<any>('http://127.0.0.1:8000/servicio', data);
}



}

// cargarMedicos() {
//   return this.http.get(`${baseUrl}/medicos`).pipe(
//     map( (resp: {ok: boolean, msg: string, medicos: MedicoModel[]}) => resp.medicos )
//   )
// }
