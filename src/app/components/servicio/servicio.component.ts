import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { faEdit,faCoffee,faEye,faTrash } from '@fortawesome/free-solid-svg-icons';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

// upload

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  id: string;

  panelOpenState = false;

  closeModal: string;
  constructor(private route: ActivatedRoute, private modalService: NgbModal,private sanitizer: DomSanitizer,private http: HttpClient) { }

  ngOnInit(): void {
    this.retornar();
    this.id = this.route.snapshot.paramMap.get("id");

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
  public isClicked4: boolean = false;
  public isClicked5: boolean = false;
  public isClicked6: boolean = false;






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

public desbloquear3(): void {
  this.isClicked3 = true;
}
public bloquear3(): void {
this.isClicked3 = false;
}

public desbloquear4(): void {
  this.isClicked4 = true;
}
public bloquear4(): void {
this.isClicked4 = false;
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
  })
  this.archivos.push(archivoCapturado)
  // //
  // console.log(event.target.files);


}

// ////////
capturarFile2(event): any {
  const archivoCapturado = event.target.files[0]
  this.extraerBase64(archivoCapturado).then((imagen:any)=>{
    this.previsualizacion2 = imagen.base;
    console.log(imagen);
  })
  this.archivos.push(archivoCapturado)
  // //
  // console.log(event.target.files);


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
        console.log(archivo);
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
  subirArchivo2(): any {
    try {

      const formularioDeDatos = new FormData();
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('files', archivo)
        console.log(archivo);
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

  clearImage(): any {
    this.previsualizacion = '';
    this.archivos = [];
  }



}
