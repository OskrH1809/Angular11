import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { GestionServiciosContratadosService } from '../../services/gestion-servicios-contratados.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

const baseUrlF = environment.baseURLF;


@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  helper = new JwtHelperService();
  decodeToken = this.helper.decodeToken(localStorage.getItem('token'))
  role = this.decodeToken.roles[0];
  user = this.decodeToken.username;
  fechaActual = moment().format('DD/MM/YYYY HH:mm:ss');
  id = this.route.snapshot.paramMap.get("id");
  diaActual = moment().format('D')
  mesActual = moment().format('M').toString();
  diasRestantesPagoFinMes = (parseInt(moment().endOf('months').format('D'))) - ((parseInt(this.diaActual) + 10));
  diasRestantesPagoInicioMes = parseInt(this.diaActual) - (parseInt(moment().startOf('month').format('D')));
  bloqueador;
  ListaserviciosContratados=[];
  fileExist = false;
  Servicios: any;
  previsualizacion: any;
  idImagen: any;
  imagen: any;
  baseUrl = baseUrlF
  contador: any;



  constructor(
    private serviciosContratados: GestionServiciosContratadosService,
    private _location: Location,
    private notification: NzNotificationService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,


  ) { }

  ngOnInit(): void {
    this.getPayServiceByUser();
    console.log(this.fechaActual)
    console.log(this.mesActual);

    console.log(this.diasRestantesPagoFinMes);
    console.log(this.diasRestantesPagoInicioMes);

  }
  backClicked() {
    this._location.back();
  }
  panels = [
    {
      active: false,
      name: 'Desplegar Acciones',
      disabled: false
    },

  ];


  // modal para solicitar servicios
  isVisible = false;

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  // modal para solicitar servicioss end





  getPayServiceByUser() {
    this.serviciosContratados.getPayServiceByUser().subscribe(
      respuesta => {
        this.Servicios = respuesta;
        this.observadorPago(this.Servicios);
        this.observadorPagoMesesAnterior(this.Servicios);
        console.log(this.Servicios);
      }, err => {
        console.log(err);
        this.createNotification('error', 'Error al obtener los servicios contratados: ', '');
      })

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

  agregarServicio(array) {

    console.log(array)
    array.forEach(element => {

      console.log(element.name)
      this.contratarNuevosServicios(element.id, element.name);
    });
    // this.listOfData = this.listOfData.concat(array);
  }

  contratarNuevosServicios(idServicio, nombreServicio) {
    const data = {
      email: this.user,
      servicio: idServicio
    }
    this.serviciosContratados.registrarNuevosServiciosOpcional(data).subscribe(respuesta => {
      if (respuesta) {
        this.getPayServiceByUser();
        this.createNotification('success', `Registro de servicio: ${nombreServicio} `, 'Registrado con éxito');

      }
    }, err => {
      console.log(err);
      this.createNotification('error', `El servicio: ${nombreServicio}`, 'Ya se encuentra registrado ');
    });
  }
  // capturar imagen y convertirla a base64
  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }


  // funcion que captura la imagen cargada en el input para mostrarla
  capturarFile(event, idImage): any {
    this.idImagen = idImage;
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;

      this.imagen = imagen;
    })
    // this.archivos.push(archivoCapturado)
    // //
    console.log(event.target.files);
    // console.log(archivoCapturado);//array con informacion de la imagen
    this.fileExist = true;        //establece que el archivo ya ha sido cargado
    console.log(this.fileExist);

  }

  // funcion el cual transforma la imagen en base64
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })


  // funcion para subir archivo
  subirArchivo(idServicioContracted,): any {

    const data = { tipo: '1', dependent: String(idServicioContracted), base64Image: this.imagen['base'] } //el tipo 1 declara que es un la imagene es de un servicio contratado
    // el tipo 1 declara que es un la imagene es de un servicio contratado
    // el dependent establace a que servicio contratado pertenece
    // el base64image es la imagen en formato base64


    console.log(data);

    this.serviciosContratados.postDocumentServiceContracted(data).subscribe(      //peticion post que envia los datos para el registro
      respuesta => {
        console.log(respuesta);
        if (respuesta) {
          this.createNotification('success', 'Documento: ', 'Documento cargado con éxito');  // si el envio fue exitoso se  mostrara una notificacion
          this.getPayServiceByUser();                                              // llamara a la funcion de getPayServiceByUser el cual mostrara todos los servicios contratados por el cliente que se encuentre logueado
        }
      }, err => {
        console.log(err);
        this.createNotification('error', 'Error al cargar documento: ', err);                // si hay algun error mostrara una notificacion y el detalle del error
      })

  }

  cambiarPeriodoPago(idServicioContratado) {

    const data = { servicioContratado: idServicioContratado }
    this.serviciosContratados.cambiarPeriodoPagoServicioContratado(data).subscribe(respuesta => {
      if (respuesta) {
        this.getPayServiceByUser();
        this.createNotification('success', 'Periodo de pago actualizado ', 'Actualizado con éxito');  // si el envio fue exitoso se  mostrara una notificacion
      }
    }, err => {
      console.log(err);
      this.createNotification('error', 'Error al cargar documento: ', err);                // si hay algun error mostrara una notificacion y el detalle del error
    })
  }



  // observadorPagoFinMes(listado) {
  //   listado.forEach(element => {
  //     if (element.documento == null && this.diasRestantesPagoFinMes <= 0 && element.periodo_pago == "2") {
  //       this.serviciosContratados.bloqueador = true;
  //       this.bloqueador = this.serviciosContratados.bloqueador;
  //     }

  //   });

  //   console.log(this.bloqueador);

  // }

  // observadorPagoInicioMes(listado) {
  //   listado.forEach(element => {
  //     if (element.documento == null && this.diasRestantesPagoInicioMes >= 10 && element.periodo_pago == "1") {
  //       this.serviciosContratados.bloqueador = true;
  //       this.bloqueador = this.serviciosContratados.bloqueador;
  //     }
  //   });
  //   console.log(this.bloqueador);
  // }

  observadorPago(listado){
    listado.forEach(element => {
      if ((element.documento == null && this.diasRestantesPagoInicioMes >= 10 && element.periodo_pago == "1")||(element.documento == null && this.diasRestantesPagoFinMes <= 0 && element.periodo_pago == "2" )) {
        this.serviciosContratados.bloqueador = true;
        this.bloqueador = this.serviciosContratados.bloqueador;
      }else{
        this.serviciosContratados.bloqueador = false;
        this.bloqueador = this.serviciosContratados.bloqueador;
      }
    });
  }

  observadorPagoMesesAnterior(listado){
    listado.forEach(element => {
    if (element.subido) {
      this.contador+=1
     }



    });
    // if (element.) {
    //   this.serviciosContratados.bloqueador = true;
    //   this.bloqueador = this.serviciosContratados.bloqueador;
    // }else{
    //   this.serviciosContratados.bloqueador = false;
    //   this.bloqueador = this.serviciosContratados.bloqueador;
    // }
    console.log(this.contador)
  }


  Mes = {
    1: "Enero",
    2: "Febrero",
    3: "Marzo",
    4: "Abril",
    5: "Mayo",
    6: "Junio",
    7: "Julio",
    8: "Agosto",
    9: "Septiembre",
    10: "Octumbre",
    11: "Noviembre",
    12: "Diciembre",
  }
}
