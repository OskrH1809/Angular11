import { Component, OnInit } from '@angular/core';
import { GestionServiciosContratadosService } from '../../services/gestion-servicios-contratados.service';

@Component({
  selector: 'app-panel-administracion',
  templateUrl: './panel-administracion.component.html',
  styleUrls: ['./panel-administracion.component.css']
})
export class PanelAdministracionComponent implements OnInit {
  pendientes: any;
  aprobado: any;

  constructor(private gestionServiciosContratados: GestionServiciosContratadosService) { }

  ngOnInit(): void {
    this.getServiciosContratadosPendientes();
    this.getServiciosContratadosAprobados();
  }

  getServiciosContratadosPendientes() {
    this.gestionServiciosContratados.getServiciosContratadosAll().subscribe(respuesta => {
      this.pendientes = respuesta.filter(respuesta => respuesta.idEstado == 2).length

      console.log(this.pendientes);
    })
  }

  getServiciosContratadosAprobados() {
    this.gestionServiciosContratados.getServiciosContratadosAll().subscribe(respuesta => {
      this.aprobado = respuesta.filter(respuesta => respuesta.idEstado == 3).length

      console.log(this.aprobado);
    })
  }

}
