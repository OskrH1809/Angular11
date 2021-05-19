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


}
