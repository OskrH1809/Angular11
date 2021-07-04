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
  listOfData:any = [];
  listOfCurrentPageData: ReadonlyArray<Data> = [];
  setOfCheckedId = new Set<number>();


  constructor(
    private servicio : GestionServiciosService,
    private notification: NzNotificationService){

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

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({ disabled }) => !disabled);
    this.checked = listOfEnabledData.every(({ id }) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.filter(({ disabled }) => !disabled).forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));

    this.contratar.emit(requestData);
    this.createNotification('success','Servicios','Agregados con éxito');

    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  ngOnInit(): void {

    // this.listOfData = new Array(20).fill(0).map((_, index) => {
    //   return {
    //     id: (index+1),
    //     servicio: `Servicio ${(index+1)}`,
    //     precio: '2000',
    //     disabled: index== -1

    //   };
    // });
    this.get_serviciosall();
  }


  // notificaciones
  createNotification(type1: string,type2:string,type3:string,): void {
    this.notification.create(
      type1,
      type2,
      type3,
      { nzDuration:12000 }
    );

  }

  //peticiones

  get_serviciosall(){

    this.servicio.get_servicios().subscribe(data => {
      // this.indice = data.pop()['id'] +1;
      this.listOfData = data;
        console.log(data);
    },err=>{
      console.log(err);
      this.createNotification('error','Error al obtener los servicios: ',err);
    });

  }




}
