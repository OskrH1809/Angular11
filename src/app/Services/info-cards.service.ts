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






  constructor(private http: HttpClient,private httpClient: HttpClient) { }





}




// cargarMedicos() {
//   return this.http.get(`${baseUrl}/medicos`).pipe(
//     map( (resp: {ok: boolean, msg: string, medicos: MedicoModel[]}) => resp.medicos )
//   )
// }
