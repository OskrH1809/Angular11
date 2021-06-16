import { Component, OnInit,Input } from '@angular/core';
import { AdministrarUserService } from 'src/app/Services/administrar-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
  @Input() nombre_usuario;
  @Input() Imagen;

constructor(){}

  ngOnInit(){

  }
}

