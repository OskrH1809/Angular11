import { Component, OnInit } from '@angular/core';
import { GestionUsuariosService } from 'src/app/auth/services/gestion-usuarios.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  administrarService: any;

  constructor(private ges: GestionUsuariosService) {}

  ngOnInit(): void {

  }

  listaMeses = [
    {
      "id": 1,
      "Mes": "Enero",

    },
    {
      "id": 2,
      "Mes": "Febrero",
    },
    {
      "id": 3,
      "Mes": "Marzo",
    },
    {
      "id": 4,
      "Mes": "Abril",
    },
    {
      "id": 5,
      "Mes": "Mayo"
    },
    {
      "id": 6,
      "Mes": "Junio"
    },
    {
      "id": 7,
      "Mes": "Julio"
    },
    {
      "id": 8,
      "Mes": "Agosto"
    },
    {
      "id": 9,
      "Mes": "Septiembre"
    },
    {
      "id": 10,
      "Mes": "Octubre"
    },
    {
      "id": 11,
      "Mes": "Noviembre"
    },
    {
      "id": 12,
      "Mes": "Diciembre"
    }

  ]

}
