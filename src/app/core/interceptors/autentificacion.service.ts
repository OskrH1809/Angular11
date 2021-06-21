import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GestionUsuariosService } from 'src/app/auth/services/gestion-usuarios.service';
import { environment } from 'src/environments/environment';
const baseUrl = environment.baseURLF;

@Injectable({
  providedIn: 'root'
})
export class Autentificacion implements HttpInterceptor  {

  constructor(private router:Router, private gestion:GestionUsuariosService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');if (!token) {
      return next.handle(req);
    }const headers = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)

    });return next.handle(headers).pipe(

      catchError((error: HttpErrorResponse) => {
        // process the obtained error
        // for logging or monitoring


        // -----------------------------------
            // validaciones
            if (error.error.message=='JWT Token not found' )
            {

              alert('No registrado')
              this.gestion.logout();



            }

            if (error.error.message=='Expired JWT Token') {

              alert('Sesion expirada')
              this.gestion.logout();

            }

            if (error.error.message=='Invalid credentials.')
            {

              alert('credenciales invalidas')

            }

        // -------------------------------------

        // create new Observable stream
        // which the clients
        // can subscribe and
        // catch the Erroneous response

        return throwError(error.error.message);
    }));
  }




  manejarError(error:HttpErrorResponse){


    console.log(error.error.message)


    return throwError(error.error.message)

  }





}




