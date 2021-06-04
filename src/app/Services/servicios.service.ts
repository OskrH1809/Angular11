import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseURL;

@Injectable({
  providedIn: 'root'
})

export class ServiciosService {


  constructor(private http: HttpClient,private httpClient: HttpClient) { }

  createServicio(user:any ): Observable<any>{
    return this.http.post('http://127.0.0.1:8000/servicio', user);
  }



}
