import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InfoCardsService {

  apiURL  = 'https://127.0.0.1:8000/infocards';



  constructor(private http: HttpClient) { }


  getInfoCard() {

    return this.http.get<any>(this.apiURL, this.httpOptions);
  }

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS,POST, PUT",
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
    })
  }
}
