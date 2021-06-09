import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuloServicioContratadoRoutingModule } from './modulo-servicio-contratado-routing.module';
import { ServicioComponent } from '../components/servicio/servicio.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzImageModule } from 'ng-zorro-antd/image';
import { CardsComponent } from '../components/cards/cards.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';


@NgModule({
  declarations: [
    ServicioComponent,
    CardsComponent,

  ],
  imports: [
    CommonModule,
    ModuloServicioContratadoRoutingModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    FontAwesomeModule,
    NzImageModule,
    NzNotificationModule




  ]
})
export class ModuloServicioContratadoModule { }
