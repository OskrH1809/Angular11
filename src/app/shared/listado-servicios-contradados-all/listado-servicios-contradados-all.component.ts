import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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
  idEstado = this.route.snapshot.paramMap.get("idEstado");
  radioValue = this.idEstado;
  isVisible = false;
  servicioContratadoId: any;
  dataSelect: { estado: string; };

  constructor(
    private gestionServiciosContratados: GestionServiciosContratadosService,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
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
      console.log(filtro);
      this.listOfData = respuesta.filter(respuesta=>respuesta.idEstado==filtro)

    })
  }


  // modal



  showModal(serviceContractId): void {
    this.isVisible = true;
    this.servicioContratadoId = serviceContractId;

  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
    this.cambiarEstado(this.servicioContratadoId, this.dataSelect);
    console.log(this.servicioContratadoId)

    this.optionList = [
      { label: 'Sin Aprobar', value: '1' },
      { label: 'Pendiente de aprobación', value: '2' },
      { label: 'Aprobado', value: '3' }
    ];
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  // select
   // select estado
   optionList = [
    { label: 'Sin Aprobar', value: '1' },
    { label: 'Pendiente de aprobación', value: '2' },
    { label: 'Aprobado', value: '3' }
  ];
  selectedValue = 'Seleccionar estado'
  // tslint:disable-next-line:no-any

  log(value: { value: string; }): void {
    console.log(value.value);
    this.dataSelect = { 'estado': value.value }
    console.log(this.dataSelect)




  }



  cambiarEstado(id, data) {
    this.gestionServiciosContratados.updateEstadoServicioContratado(id, data).subscribe(respuesta => {
      console.log();
      if (respuesta) {
        this.filtro(this.radioValue);
        this.createNotification('info', 'Estado: ', 'Estado actualizado con éxito');

      }
    }, err => {
      console.log(err);
      this.createNotification('error', 'Servicio: ', 'Error al cambiar el estado');
      this.createNotification('error', 'error: ', err);
    });
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
