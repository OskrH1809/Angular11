import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdministrarUserService {

  constructor(private router:Router) { }
  localstorage = JSON.parse(localStorage.getItem('usuario'))
  token = localStorage.getItem('token');
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
   }else{
     return ''
   }
  }



  getNombreUsuario(){
  if (this.localstorage ==null && this.token==null ) {
    return 'Usuario'
  } else {
    return this.localstorage['nombre']
  }
  }

  getImagenUsuario(){
   if (this.localstorage==null && this.token==null) {
     return 'default.png'
   } else {
    return this.localstorage['imagenes']
   }
  }

  ImagenXYZ= 'prueba.jpg'
  usuarioXYZ = 'Prueba'




}
