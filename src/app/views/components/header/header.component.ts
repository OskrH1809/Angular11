import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { GestionUsuariosService } from 'src/app/auth/services/gestion-usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

constructor(private router:Router, private gestion:GestionUsuariosService){}

 token = localStorage.getItem('token');
 usuario = localStorage.getItem('usuario')
 verificarAcceso = this.gestion.verificarAcceso()
  ngOnInit(){

  }

  logout(){
   this.gestion.logout();

  }

}

