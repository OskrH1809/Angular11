import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GestionServiciosContratadosService } from '../../services/gestion-servicios-contratados.service';
import { NzImageService } from 'ng-zorro-antd/image';
import * as moment from 'moment';


interface ItemData {
  id: string;
  servicio: string;
  price: string;
  estado: string
  disabled: boolean


}
@Component({
  selector: 'app-listados-servicios-contratados-usuario',
  templateUrl: './listados-servicios-contratados-usuario.component.html',
  styleUrls: ['./listados-servicios-contratados-usuario.component.css']
})
export class ListadosSeComponent implements OnInit {


  // tabla
  i = 0;
  editId: string | null = null;
  listOfData: ItemData[] = [];
  mesActual = moment().format('M').toString();
  Nombre;
  id: any;
  idUser = this.route.snapshot.paramMap.get("id");
  cliente;
  documento;


  deleteRow(id: string, nombre: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
    this.createNotification('warning', 'Cliente: ' + `${nombre}`, 'Eliminado con éxito');

  }
  //


  fatrash = faTrash;
  faedit = faEdit;
  constructor(
    private serviciosContratados: GestionServiciosContratadosService,
    private notification: NzNotificationService,
    private modalService: NgbModal,
    private _location: Location,
    private route: ActivatedRoute,
    private nzImageService: NzImageService
  ) {



  }
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

      { size: 'xl', ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
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
      return `with: ${reason}`;
    }
  }


  //
  agregarServicio(array) {
    console.log(this.listOfData)
    console.log(array)
    array.forEach(element => {

      console.log(element.name)
      this.contratarNuevosServicios(element.id, element.name);
    });
    // this.listOfData = this.listOfData.concat(array);
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
  // modal ng zorro
  isVisibled = false;
  servicioContratadoId


  showModald(serviceContractId): void {
    this.isVisibled = true;
    this.servicioContratadoId = serviceContractId;
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
    { label: 'Sin Aprobar', value: '1' },
    { label: 'Pendiente de aprobación', value: '2' },
    { label: 'Aprobado', value: '3' }
  ];
  selectedValue = 'Seleccionar estado'
  // tslint:disable-next-line:no-any

  log(value: { value: string; }): void {
    console.log(value.value);
    const data = { 'estado': value.value }
    this.cambiarEstado(this.servicioContratadoId, data);
    console.log(data)
    console.log(this.servicioContratadoId)
    this.getServiciosUsuarioEspecifico();

    this.optionList = [
      { label: 'Sin Aprobar', value: '1' },
      { label: 'Pendiente de aprobación', value: '2' },
      { label: 'Aprobado', value: '3' }
    ];

  }


  // modal formulario
  isVisibleFormulariof = false;



  showModalFormulariof(): void {
    this.isVisibleFormulariof = true;
    this.optionList = [
      { label: 'Sin Aprobar', value: '1' },
      { label: 'Pendiente de aprobación', value: '2' },
      { label: 'Aprobado', value: '3' }
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

  getServiciosUsuarioEspecifico() {
    const usuario = this.route.snapshot.paramMap.get("id");
    const data = { user: usuario }
    this.serviciosContratados.getServiciosContratadosUsuarioEspecifico(usuario).subscribe(respuesta => {
      this.ListaserviciosContratados = respuesta;

      console.log(respuesta);
      this.cliente = respuesta[0].usuario;
      console.log(this.cliente)
      this.listOfData = this.ListaserviciosContratados;
    }, err => {
      console.log(err);
      this.createNotification('error', 'Listado: ', 'Error al obtener los servicio');
      this.createNotification('error', 'error: ', err);
    })
  }

  cambiarEstado(id, data) {
    this.serviciosContratados.updateEstadoServicioContratado(id, data).subscribe(respuesta => {
      console.log();
      if (respuesta) {
        this.getServiciosUsuarioEspecifico();
        this.createNotification('info', 'Estado: ', 'Estado actualizado con éxito');

      }
    }, err => {
      console.log(err);
      this.createNotification('error', 'Servicio: ', 'Error al cambiar el estado');
      this.createNotification('error', 'error: ', err);
    });
  }



  // documento(imagen)
  getDocumentsEspecific(dependet) {
    const tipo = '1'
    this.serviciosContratados.getOneDocumentSpecific(this.idUser, tipo, dependet).subscribe(respuesta => {
      this.documento = respuesta[0]['archivo'];
      this.onClick(respuesta[0]['archivo']);
    })
  }

  onClick(imagen): void {
    const images = [
      {
        src: `${imagen}`,
        width: '30%',
        height: '60%',
        alt: 'Imagen'
      },

    ];
    this.nzImageService.preview(images, { nzZoom: 1.5, nzRotate: 0 });
  }

  contratarNuevosServicios(idServicio, nombreServicio) {
    const data = {
      usuario: this.idUser,
      servicio: idServicio
    }
    this.serviciosContratados.registrarNuevosServicios(data).subscribe(respuesta => {
      if (respuesta) {
        this.getServiciosUsuarioEspecifico();
        this.createNotification('success', `Registro de servicio: ${nombreServicio} `, 'Registrado con éxito');

      }
    }, err => {
      console.log(err);
      this.createNotification('error', `El servicio: ${nombreServicio}`, 'Ya se encuentra registrado ');
    });
  }

  activarServicioContratado(idServicioContratado, nombreServicio) {
    const data = { servicioContratado: idServicioContratado }
    this.serviciosContratados.activarServicioContratado(data).subscribe(respuesta => {
      if (respuesta) {
        this.getServiciosUsuarioEspecifico();
        this.createNotification('success', ` servicio contratado: ${nombreServicio} `, 'Activado con éxito');

      }
    }, err => {
      console.log(err);
      this.createNotification('error', `El servicio contratado: ${nombreServicio}`, 'No pudo activarse');
    });
  }

  desactivarServicioContratado(idServicioContratado, nombreServicio) {
    const data = { servicioContratado: idServicioContratado }
    this.serviciosContratados.desactivarServicioContratado(data).subscribe(respuesta => {
      if (respuesta) {
        this.getServiciosUsuarioEspecifico();
        this.createNotification('success', ` Servicio contratado: ${nombreServicio} `, 'Desactivado con éxito');

      }
    }, err => {
      console.log(err);
      this.createNotification('error', `El servicio contratado: ${nombreServicio}`, 'No pudo desactivarse');
    });
  }

}
