import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuloServicioContratadoRoutingModule } from './modulo-servicio-contratado-routing.module';
import { ServicioComponent } from '../shared/components/servicio/servicio.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzImageModule } from 'ng-zorro-antd/image';
import { CardsComponent } from '../shared/components/cards/cards.component';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ContratarServiciosComponent } from '../shared/components/contratar-servicios/contratar-servicios.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ModuloServiciosModule } from '../modulo_servicios/modulo-servicios.module';


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
    NzNotificationModule,
    NzModalModule,
    NzButtonModule,
    NzTableModule,
    ModuloServiciosModule





  ],
  exports:[

  ]

})
export class ModuloServicioContratadoModule {

 }
