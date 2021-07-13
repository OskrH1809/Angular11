import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GestionServiciosService } from '../../services/gestion-servicios.service';

export interface Data {
  id: number;
  servicio: string;
  precio: string;
  disabled: boolean;

}
@Component({
  selector: 'app-contratar-servicios',
  templateUrl: './contratar-servicios.component.html',
  styleUrls: ['./contratar-servicios.component.css']
})
export class ContratarServiciosComponent implements OnInit {

  @Output() contratar = new EventEmitter();
  value;
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: any = [];
  listOfCurrentPageData: ReadonlyArray<Data> = [];
  setOfCheckedId = new Set<number>();


  constructor(
    private servicio: GestionServiciosService,
    private notification: NzNotificationService) {

  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: ReadonlyArray<Data>): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  //funcion para limpiar los datos que se han seleccionado
  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  //funcion que registra el servicio seleccionado
  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  //funcion que permite seleccionar todos los servicios
  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));

    this.contratar.emit(requestData);

    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  ngOnInit(): void {
    this.get_serviciosall();
  }


  // notificaciones
  createNotification(
    type1: string,        //Muestra el tipo de notificación(Success,Info,Waring, error)
    type2: string,        //Muestra un mensaje elegido por el usuario
    type3: string         //Muestra un mensaje elegido por el usuario
  ): void {
    this.notification.create(
      type1,
      type2,
      type3
    );

  }


  //funcion que realiza un llamado a la api para obtener y mostrar todos los servicios
  get_serviciosall() {

    this.servicio.get_servicios().subscribe(data => {
      // this.indice = data.pop()['id'] +1;
      this.listOfData = data;
      console.log(data);
    }, err => {
      console.log(err);
      this.createNotification('error', 'Error al obtener los servicios: ', err);
    });

  }




}
