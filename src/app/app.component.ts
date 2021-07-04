import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Autentificacion } from './core/interceptors/autentificacion.service';
import { AdministrarUserService } from './auth/services/administrar-user.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Servicios';
  token= localStorage.getItem('token')


  constructor(private auth:Autentificacion,private Usuario:AdministrarUserService) { }
  ngOnInit(): void {
  if (this.token == null) {
      console.log('no hay token');
  } else {
    console.log('si hay token')
  }
  }






}
