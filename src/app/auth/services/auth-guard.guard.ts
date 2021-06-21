import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GestionUsuariosService } from './gestion-usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanLoad, CanActivate {
  constructor( private router: Router, private gestionUsuario:GestionUsuariosService){}
  token = localStorage.getItem('token')
  usuario = localStorage.getItem('usuario')
  verificarAcceso = this.gestionUsuario.verificarAcceso();



  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (this.verificarAcceso==false) {
      alert('Debe registrarse {Auth guard CL}');
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['']);
      return false

    }else{

      return true;

    }


  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



    if (this.verificarAcceso==false) {
      alert('Debe registrarse {Auth guard CA}');
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['']);
      return false

    }else{

      return true;

    }

  }


}
