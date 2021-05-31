import { InfoCardsService } from './../../Services/info-cards.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  administrarService: any;
  Meses:string[];





  constructor( private infocardsService:InfoCardsService,) {

   }

   cargarData(){
    this.infocardsService.getMeses()
    .subscribe(respuesta => {
      this.Meses=respuesta;
      console.log(this.Meses);
    })
  }
  //

  ngOnInit(): void {
  this.cargarData();
  }


  "listaMeses"=[
    {
        "id": 1,
        "Mes":"Enero",

    },
    {
        "id": 2,
        "Mes":"Febrero",
    },
    {
        "id": 3,
        "Mes":"Marzo",
    },
    {
      "id": 4,
      "Mes":"Abril",
    },
    {
      "id":5,
      "Mes":"Mayo"
    }

  ]

  }
