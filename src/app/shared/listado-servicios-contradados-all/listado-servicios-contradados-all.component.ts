import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestionServiciosContratadosService } from '../services/gestion-servicios-contratados.service';
interface ItemData {
  id: string;
  name: string;
  age: string;
  address: string;
}
@Component({
  selector: 'app-listado-servicios-contradados-all',
  templateUrl: './listado-servicios-contradados-all.component.html',
  styleUrls: ['./listado-servicios-contradados-all.component.css']
})
export class ListadoServiciosContradadosAllComponent implements OnInit {

  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];
  radioValue = 1;
  idEstado = this.route.snapshot.paramMap.get("idEstado");

  constructor(
    private gestionServiciosContratados: GestionServiciosContratadosService,
    private route: ActivatedRoute,
    ) {

  }
  ngOnInit(): void {

    this.getServiciosContratados();
    console.log(this.radioValue);
  }
  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;
  }



  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }


  getServiciosContratados(){
    this.gestionServiciosContratados.getServiciosContratadosAll().subscribe(respuesta=>{
      this.listOfData = respuesta.filter(respuesta=>respuesta.idEstado==this.idEstado)
      console.log(respuesta);
    })
  }


  filtro(filtro){
    this.gestionServiciosContratados.getServiciosContratadosAll().subscribe(respuesta=>{
      this.listOfData = respuesta.filter(respuesta=>respuesta.idEstado==filtro)

    })
  }
}
