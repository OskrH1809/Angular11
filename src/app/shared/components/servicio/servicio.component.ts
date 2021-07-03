import { HttpClient, JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { faEdit,faCoffee,faEye,faTrash } from '@fortawesome/free-solid-svg-icons';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AdministrarUserService } from 'src/app/Services/administrar-user.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GestionServiciosContratadosService } from '../../services/gestion-servicios-contratados.service';
import { GestionUsuariosService } from 'src/app/auth/services/gestion-usuarios.service';
import { SlicePipe } from '@angular/common';


// upload

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  id: string;
  imagen;
  panelOpenState = false;
  administrarService: any;
  role:string;
  closeModal: string;
  fileExist= false; //declara si la imagen existe
  verificarAcceso = this.gestionUsuario.verificarAcceso();
  dataDocuments; //variable que se utilizara para enviar la imagen a documentos
  documentoEspecifico;

  constructor(private router:Router,
              private serviciosContratados:GestionServiciosContratadosService,
              private notification: NzNotificationService ,
              private administrar:AdministrarUserService,
              private route: ActivatedRoute,
              private modalService: NgbModal,
              private sanitizer: DomSanitizer,
              private gestionUsuario:GestionUsuariosService) {
    this.administrarService = administrar.validarUser();
    this.role = administrar.retornarRol();
  }

  ngOnInit(): void {
    this.getImageDocuments();
    this.getServiciosContratadosByUser();

    this.id = this.route.snapshot.paramMap.get("id");
    // console.log(this.administrarService );
    // console.log(this.role );

  }



    // CAPTURAR MES ACTUAL

    mesActual= moment().format('M');
    // CAPTURAR MES ACTUAL ^




  Mes = {
    1:"Enero",
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




// upload file
public previsualizacion: string;
public previsualizacion2: string;
public archivos: any = [];
public loading: boolean;
idImagen;

capturarFile(event,idImage): any {
  this.idImagen = idImage;
  const archivoCapturado = event.target.files[0]
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
    this.previsualizacion = imagen.base;

    this.imagen=imagen;
  })
  this.archivos.push(archivoCapturado)
  // //
  console.log(event.target.files);
  console.log(archivoCapturado);//array con informacion de la imagen
  this.fileExist=true;


}



// ///////////
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



  subirArchivo(idUsuario,idServicioContracted,): any {
    this.verficarLoginActivo();
    try {

      const formularioDeDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('files', archivo)
        console.log(this.imagen);

        this.dataDocuments = { tipo:'1', dependent:String(idServicioContracted),base64Image:this.imagen['base']}
        console.log(this.dataDocuments);

        this.serviciosContratados.postDocumentServiceContracted(this.dataDocuments).subscribe(
          respuesta =>{
            console.log(respuesta);
            if (respuesta) {
              this.createNotification('success','Documento: ','Documento cargado con éxito');
              this.getServiciosContratadosByUser();
              this.getImageDocuments();
            }
          },err=>{
            console.log(err);
            this.createNotification('error','Error al cargar documento: ',err);
          }
        )
      })
      // formularioDeDatos.append('_id', 'MY_ID_123')
      // this.rest.post(`http://localhost:3001/upload`, formularioDeDatos)
      //   .subscribe(res => {
      //     this.loading = false;
      //     console.log('Respuesta del servidor', res);

        // }
        //  () => {
        //   this.loading = false;
        //   alert('Error');
        // })
    } catch (e) {

      console.log('ERROR', e);

    }
  }





  // notificaciones
  createNotification(type1: string,type2:string,type3:string): void {
    this.notification.create(
      type1,
      type2,
      type3
    );

  }




  // conectado  ----------------------------------------------------------------------------------------------
  ListaserviciosContratados = [];
  getServiciosContratadosByUser(){
    this.serviciosContratados.getServiciosContratadosByUser().subscribe(
      resp =>{
        this.ListaserviciosContratados=resp;
        console.log(this.ListaserviciosContratados);

      },err=>{
        console.log(err);
        this.createNotification('error','Error al obtener los servicios contratados: ',err);
      })

  }



  nuevoEstado(servicio,nuevoEstado){
    this.verficarLoginActivo();
    const data={estado:nuevoEstado}

    this.serviciosContratados.updateEstadoServicioContratado(servicio,data).subscribe(
      respuesta=>{
        if (respuesta) {
        }
        this.getServiciosContratadosByUser()
      },err=>{
        console.log(err);
        this.createNotification('error','Error al actualizar estado: ',err);
      })



  }

  verficarLoginActivo(){
    if (this.verificarAcceso==false) {
      alert('Sesión expirada');
      this.gestionUsuario.logout();
    }
  }



  // prueba
  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //me.modelvalue = reader.result;
      console.log('Imagenasdasd: '+ reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }

 getImageDocuments(){
   this.serviciosContratados.getDocumentsServiceContracted().subscribe(
     respuesta =>{
     this.documentoEspecifico= respuesta;
     console.log(respuesta);
    },err=>{
      console.log(err);
      this.createNotification('error','Error al obtener la imagen: ',err);
    }
   )
 }





}
