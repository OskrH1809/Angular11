import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GestionUsuariosService } from './gestion-usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class LogueadoGuard implements CanActivate, CanLoad {
  token =  localStorage.getItem('token');

  usuario = localStorage.getItem('usuario');
  verificarAcceso = this.gestionUsuario.verificarAcceso();

  constructor( private router: Router, private gestionUsuario:GestionUsuariosService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.verificarAcceso==false) {
      return true

    } else {
      this.router.navigate(['cards']);
      return false
    }

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if (this.verificarAcceso==false) {
        return true
      } else {
        this.router.navigate(['cards']);
        return false
      }


  }
}
