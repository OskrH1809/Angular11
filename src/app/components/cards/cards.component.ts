import { InfoCardsService } from './../../Services/info-cards.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {





  constructor( private InfoCardsService:InfoCardsService,) {
    this.InfoCardsService = InfoCardsService;
   }


  ngOnInit(): void {

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
    }

  ]

  }
