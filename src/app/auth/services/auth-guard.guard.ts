import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanLoad, CanActivate {
  constructor(  private notification: NzNotificationService,private router: Router){}
  token = localStorage.getItem('token')
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    if (this.token) {
      return true
    }
    this.createNotification('error','No se encuentra registrado','Debe registrarse para ingresar')
    this.router.navigate(['']);
  
  return false;
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      if (this.token) {
        return true
      }
      this.router.navigate(['']);
    return false;
  }

     // notificaciones
     createNotification(type1: string,type2:string,type3:string,): void {
      this.notification.create(
        type1,
        type2,
        type3,
        { nzDuration:12000 }
      );
  
    }
  
}
