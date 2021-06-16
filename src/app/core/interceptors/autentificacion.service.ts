import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseURLF;

@Injectable({
  providedIn: 'root'
})
export class Autentificacion implements HttpInterceptor  {
 
  constructor() { }
 
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem('token');if (!token) {
      return next.handle(req);  
    }const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    
    });return next.handle(headers);
    
  }
  
}


 

