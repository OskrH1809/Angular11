import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdministrarUserService {

  constructor() { }
  localstorage = JSON.parse(localStorage.getItem('usuario'))

  validarUser(): boolean{

    if (this.localstorage!=null && this.localstorage != '') {
      return true
    }else{
      return false
    }

  }


  retornarRol(){
   if (this.validarUser()) {
    return this.localstorage.role[0];
   }
  }

}
