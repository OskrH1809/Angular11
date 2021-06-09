import { Component, OnInit } from '@angular/core';
import { AdministrarUserService } from './Services/administrar-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Servicios';


  constructor(private Usuario:AdministrarUserService) { }
  User = this.Usuario.getNombreUsuario();
  Imagen= this.Usuario.getImagenUsuario();
  ngOnInit(): void {

  }




}
