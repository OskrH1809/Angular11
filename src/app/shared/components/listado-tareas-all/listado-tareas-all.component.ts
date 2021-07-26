import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GestionServiciosContratadosService } from '../../services/gestion-servicios-contratados.service';

@Component({
  selector: 'app-listado-tareas-all',
  templateUrl: './listado-tareas-all.component.html',
  styleUrls: ['./listado-tareas-all.component.css']
})
export class ListadoTareasAllComponent implements OnInit {
  listOfData:any ;
  idEstado = this.route.snapshot.paramMap.get("idEstado");
  radioValue = this.idEstado;
  isVisible = false;
  servicioContratadoId: any;
  tarea: any;
  dataSelect: { id: any; estado: string; };

  constructor( private gestionServiciosContratados: GestionServiciosContratadosService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,) { }

  ngOnInit(): void {
    this.getTareas()
  }



  getTareas(){
    this.gestionServiciosContratados.getTareasAll().subscribe(respuesta=>{
      this.listOfData = respuesta.filter(respuesta=>respuesta.idEstado==this.idEstado)

    })

  }


  filtro(filtro){
    this.gestionServiciosContratados.getTareasAll().subscribe(respuesta=>{
      console.log(filtro)
      console.log(respuesta)
      console.log(this.radioValue)
      this.listOfData = respuesta.filter(respuesta=>respuesta.idEstado==filtro)

    })
  }

   // modal



   showModal(idTarea): void {
    this.isVisible = true;
    this.tarea = idTarea;

  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.actualizarEstadoTarea(this.dataSelect);

    this.optionList = [
      { label: 'Creado', value: '4' },
      { label: 'En revisión', value: '5' },
      { label: 'Finalizado', value: '6' }
    ];
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  // select
   // select estado
   optionList = [
    { label: 'Creado', value: '4' },
    { label: 'En revisión', value: '5' },
    { label: 'Finalizado', value: '6' }
  ];
  selectedValue = 'Seleccionar estado'
  // tslint:disable-next-line:no-any

  log(value: { value: string; }): void {


    this.dataSelect = { id: this.tarea, estado: value.value }
    console.log( this.dataSelect);

  }

  actualizarEstadoTarea(data) {
    this.gestionServiciosContratados.actualizarEstadoTarea(data).subscribe(respuesta => {
      if (respuesta) {
        this.filtro(this.radioValue);
        this.createNotification('info', 'Tarea', 'Estado actualizado con éxito');
      }

    }, err => {
      console.log(err);
      this.createNotification('error', 'Error al actualizar estado: ', 'Actualizar estado sin éxito');
    })
  }

   // notificaciones
   createNotification(type1: string, type2: string, type3: string,): void {
    this.notification.create(
      type1,
      type2,
      type3,
      { nzDuration: 12000 }
    );

  }
}
