import { Component, OnInit } from '@angular/core';
import { Autentificacion } from './core/interceptors/autentificacion.service';
import { AdministrarUserService } from './Services/administrar-user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Servicios';


  constructor(private auth:Autentificacion,private Usuario:AdministrarUserService) { }
  User = this.Usuario.getNombreUsuario();
  Imagen= this.Usuario.getImagenUsuario();
  ngOnInit(): void {
  }




}
