import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { faEdit,faCoffee,faEye,faTrash } from '@fortawesome/free-solid-svg-icons';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { AdministrarUserService } from 'src/app/Services/administrar-user.service';
import { InfoCardsService } from 'src/app/Services/info-cards.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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

  constructor(private notification: NzNotificationService,private infocardsService:InfoCardsService,private Usuario:AdministrarUserService ,administrar:AdministrarUserService, private route: ActivatedRoute, private modalService: NgbModal,private sanitizer: DomSanitizer,private http: HttpClient) {
    this.administrarService = administrar.validarUser();
    this.role= administrar.retornarRol();
  }

  ngOnInit(): void {
    this.retornar();
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(this.administrarService );
    console.log(this.role );


    console.log(this.mesActual);


  }


    // CAPTURAR MES ACTUAL

    mesActual= moment().format('M');
    // CAPTURAR MES ACTUAL ^

  user =  {
    "nombre": 'Oscar Canales',
    "role": ['ADMIN'],
    "correo":'hoscar161@gmail.com',
    "imagenes" :'oscar_canales.jpg'
     }


    // perticion get a la api

    // perticion get a la api ^





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


"Lista"=[
  {
      "id": 1,
      "servicio":"Correccion de frenos",
      "imagen": "assets/img/1.jpg",
  },
  {
      "id": 2,
      "servicio":"Lavado de auto",
      "imagen": "assets/img/2.jpg",
  },
  {
      "id": 3,
      "servicio":"Cambio de llanta",
      "imagen": "assets/img/muestra-ticket-realista_23-2147938550.jpg",
  }


]


  retornar(){
    console.log(this.Lista[1].imagen);
    console.log(this.id);
    console.log(this.Mes['1']);
  }



  faCoffee = faCoffee;
  fatrash = faTrash;

  faedit=faEdit;
  faeye= faEye;


  pago: boolean = false;
  pago2: boolean = false;

  public isClicked1: boolean = false;
  public isClicked2: boolean = false;
  public isClicked3: boolean = false;

  public desbloquear1(): void {
    this.isClicked1 = true;
 }
 public bloquear1(): void {
  this.isClicked1 = false;
}

public desbloquear2(): void {
  this.isClicked2 = true;
}
public bloquear2(): void {
this.isClicked2 = false;
}


triggerModal(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });
}

// image
triggerModal2(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });
}
triggerModal3(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
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



// upload file
public previsualizacion: string;
public previsualizacion2: string;
public archivos: any = []
public loading: boolean

capturarFile(event): any {
  const archivoCapturado = event.target.files[0]
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
    this.previsualizacion = imagen.base;
    console.log(imagen);
    this.imagen=imagen;
  })
  this.archivos.push(archivoCapturado)
  // //
  console.log(event.target.files);
  console.log(archivoCapturado);
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


  subirArchivo(): any {
    try {

      const formularioDeDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('files', archivo)
        console.log('hola');
        console.log(this.imagen);


      })
      this.createNotification('success','Imagen','Imagen agregada exitosamente');
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
      this.createNotification('danger','Imagen','Fallo al agregar imagen');

    }
  }


  ///localstorege agregar

  agregarUsuario(){
    localStorage.setItem('usuario', JSON.stringify(this.user));
  }
  removerUsuario(){
    localStorage.clear();
  }


  // notificaciones
  createNotification(type1: string,type2:string,type3:string): void {
    this.notification.create(
      type1,
      type2,
      type3
    );

  }

}
