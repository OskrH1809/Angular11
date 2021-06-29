import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GestionServiciosContratadosService } from '../../services/gestion-servicios-contratados.service';


interface ItemData {
  id: string;
  servicio: string;
  price: string;
  estado: string
  disabled: boolean


}
@Component({
  selector: 'app-listados-se',
  templateUrl: './listados-se.component.html',
  styleUrls: ['./listados-se.component.css']
})
export class ListadosSeComponent implements OnInit {


  // tabla
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];
  Nombre;
  id: any;



  deleteRow(id: string,nombre:string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
    this.createNotification('warning','Cliente: '+`${nombre}`,'Eliminado con éxito');

  }
  //


  fatrash = faTrash;
  faedit=faEdit;
  constructor(private serviciosContratados:GestionServiciosContratadosService,private notification: NzNotificationService,private modalService: NgbModal,private _location: Location,private route: ActivatedRoute ) { }
  public form: FormGroup;
  ngOnInit(): void {
    this.getServiciosUsuarioEspecifico();
    this.id = this.route.snapshot.paramMap.get("id");
    // this.getServicios();
    console.log(this.id);
  }

  // getServicios(){
  //  this.service.get_serviciosxUsuario(this.id)
  //  .subscribe( values => {
  //    this.listOfData= values;
  //    this.Nombre = values[0].Nombre;
  //   console.log(values);
  // } );
  // }

  backClicked() {
    this._location.back();
  }

  // modal
    // Modal
    closeModal: string;
    triggerModal(content) {
      this.modalService.open(content,

       {size:'xl',ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
        this.closeModal = `Closed with: ${res}`;
      }, (res) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      });
    }


    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }


//
    agregarServicio(array){
    console.log(this.listOfData)
    console.log(array)
    this.listOfData= this.listOfData.concat(array);
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
  // modal ng zorro
  isVisibled = false;
  servicioContratadoId


  showModald(serviceContractId): void {
    this.isVisibled = true;
    this.servicioContratadoId= serviceContractId;
  }

  handleOkd(): void {
    console.log('Button ok clicked!');
    this.isVisibled = false;



  }

  handleCanceld(): void {
    console.log('Button cancel clicked!');
    this.isVisibled = false;
  }


  // select estado
  optionList = [
    { label: 'Sin Aprobar', value: '1'},
    { label: 'Pendiente de aprobación', value: '2' },
    { label: 'Aprobado', value: '3'}
  ];
  selectedValue  = 'Seleccionar estado'
  // tslint:disable-next-line:no-any

  log(value: {  value: string; }): void {
    console.log(value.value);
    const data ={ 'estado': value.value}
    this.cambiarEstado(this.servicioContratadoId,data);
    console.log(data)
    console.log(this.servicioContratadoId)
    this.getServiciosUsuarioEspecifico();


    this.selectedValue= undefined;
  }

  // modal formulario
  isVisibleFormulariof = false;



  showModalFormulariof(): void {
    this.isVisibleFormulariof = true;
    this.optionList = [
      { label: 'Sin Aprobar', value: '1'},
      { label: 'Pendiente de aprobación', value: '2' },
      { label: 'Aprobado', value: '3'}
    ];
  }

  handleOkFormulariof(): void {

    this.isVisibleFormulariof = false;

  }

  handleCancelFormulariof(): void {

    this.isVisibleFormulariof = false;
  }



  // ================================================
  ListaserviciosContratados = [];

  getServiciosUsuarioEspecifico(){
    const usuario = this.route.snapshot.paramMap.get("id");
    const data = { user:usuario}
    this.serviciosContratados.getServiciosContratadosUsuarioEspecifico(usuario).subscribe(respuesta=>
      {
        this.ListaserviciosContratados=respuesta;
        console.log(this.ListaserviciosContratados);
        this.listOfData = this.ListaserviciosContratados;
      })
    }

  cambiarEstado(id,data){
    this.serviciosContratados.updateEstadoServicioContratado(id,data).subscribe(respuesta=>{
      console.log();
    });
  }



  // dialogo



}
