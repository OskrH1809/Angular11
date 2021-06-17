import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseURLF;

@Injectable({
  providedIn: 'root'
})
export class Autentificacion implements HttpInterceptor  {
 
  constructor(private router:Router) { }
 
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = localStorage.getItem('token');if (!token) {
      return next.handle(req);  
    }const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    
    });return next.handle(headers).pipe(
      catchError(this.manejarError)
    )
    
  }
  



  manejarError(error:HttpErrorResponse){
    if (error.error.message=='JWT Token not found' )  
    {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      alert('No registrado')
      
    }
    console.log(error.error.message)

    if (error.error.message=='Expired JWT Token') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      alert('registro expirado')
    }

    if (error.error.message=='Invalid credentials.')  
    {
      
      alert('credenciales invalidas')
     
    }

    console.log(error.error.message)


    return throwError(error.error.message)

  }


  


}


 

