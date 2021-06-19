import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogueadoGuard implements CanActivate, CanLoad {
  token =  localStorage.getItem('token');

  usuario = localStorage.getItem('usuario');
  
  constructor( private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if (this.token==null && this.usuario==null) {
      return true
    } else {
      this.router.navigate(['cards']);
      return false  
    }

  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if (this.token==null && this.usuario==null) {
        return true
      } else {
        this.router.navigate(['cards']);
        return false  
      }
  
  
  }
}
