import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import * as moment from 'moment';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdministrarUserService } from 'src/app/auth/services/administrar-user.service';
//  editor
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { DomSanitizer } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GestionServiciosContratadosService } from '../../services/gestion-servicios-contratados.service';
import { stringify } from '@angular/compiler/src/util';

interface ItemData {
  id: string;
  titulo: string;
  descripcion: string;
  documento: string;
  idUsuario?: string;
  idServicio?: string;
  servicio?: string;
  usuario?: string;
}

@Component({
  selector: 'app-gestion-tareas',
  templateUrl: './gestion-tareas.component.html',
  styleUrls: ['./gestion-tareas.component.css']
})

export class GestionTareasComponent implements OnInit {
  ServicioId =  this.route.snapshot.paramMap.get("id");
  idTarea;
  ArchivoCap:any;
  documentoBase64;
  documentos;

  // editor
  dataDescripcion:any;
  descripcion:any;
  public Editor = ClassicEditor;

  public onChange( { editor } ) {
      const data = editor.getData();
      console.log(data);

  }

  public info(){
    this.descripcion = this.Editor;
  }


  //  editor
  mesActual= moment().format('M').toString();
  id:string;

  administrarService: boolean;
  role: any;


  constructor(
    private notification: NzNotificationService,
    private sanitizer: DomSanitizer,
    private administrar:AdministrarUserService,
    private route: ActivatedRoute,
    private _location: Location,
    private modalService: NgbModal,
    private gestionServicios:GestionServiciosContratadosService,
    private ServiciosContratados:GestionServiciosContratadosService) {
   }

  i = 1;

  editId: string | null = null;
  listOfData:any = [];


  idEdit='';
  tituloEdit='';
  descripcionEdit='';
  fileEdit='';
  arrayEdit;
  llenarDatos(id,titulo,descripcion){
    this.arrayEdit= {
    descripcion2: descripcion,
    file: "",
    fileSource: "",​​
    id: id,
    titulo: titulo
    }
    this.demoReactiveForm2.setValue(this.arrayEdit);



  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,

      {
        id: `${this.i}`,
        titulo: `${this.demoReactiveForm.value.titulo}`,
        descripcion: `${this.demoReactiveForm.value.descripcion}`,
        documento: ` ${this.demoReactiveForm.value.file}`


      }


    ];

    this.i++;

    console.log(this.demoReactiveForm.value.titulo);
    console.log(this.ArchivoCap);
  }

  deleteRow(id: string,nombre: string ): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
  }

  ngOnInit(): void {
    this.getTareas();


    this.id = this.route.snapshot.paramMap.get("id");


  }



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

  backClicked() {
    this._location.back();
  }




    // form modal 2
    public demoReactiveForm = new FormGroup( {
      id: new FormControl(),
      titulo: new FormControl(),
      descripcion: new FormControl( ),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    } );

    public formDataPreview?: string;

    public ngAfterViewInit() {
      this.demoReactiveForm!.valueChanges
        .subscribe( values => {
          this.formDataPreview = JSON.stringify( values );
        } );

        // modal 3
        this.demoReactiveForm2!.valueChanges
        .subscribe( values => {
          this.formDataPreview2 = JSON.stringify( values );

        } );
    }

    public onSubmit(): void {
      console.log(this.demoReactiveForm.value);
      const dataTareas  = { titulo:this.demoReactiveForm.value.titulo, descripcion:this.demoReactiveForm.value.descripcion, servicio:this.ServicioId,}
      this.postTareas(dataTareas);
      console.log(this.demoReactiveForm.value.id);
      console.log(parseInt(this.idTarea));
      this.reset();
    }

    public reset(): void {
      this.demoReactiveForm!.reset();
    }

    public get description(): AbstractControl {
      return this.demoReactiveForm!.controls.descripcion;
    }

    get f(){

      return this.demoReactiveForm.controls;

    }

    onFileChange(event) {



      if (event.target.files.length > 0) {

        const file = event.target.files[0];

        this.demoReactiveForm.patchValue({

          fileSource: file

        });

      }

    }

    submit(){

      const formData = new FormData();

      formData.append('file', this.demoReactiveForm.get('fileSource').value);

      console.log(formData);

      // this.http.post('http://localhost:8001/upload.php', formData)

      //   .subscribe(res => {

      //     console.log(res);

      //     alert('Uploaded Successfully.');

      //   })

    }



    // modal3



    public demoReactiveForm2 = new FormGroup( {

      id: new FormControl(),
      titulo: new FormControl(),
      descripcion2: new FormControl(),
      file: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    } );

    public formDataPreview2?: string;


    public onSubmit2(): void {
      console.log(this.demoReactiveForm2.value);
      this.editTarea(this.demoReactiveForm2.value.id,this.demoReactiveForm2.value.titulo,this.demoReactiveForm2.value.descripcion2);


      this.reset2();
    }


    public reset2(): void {
      this.demoReactiveForm2!.reset();
    }

    public get descripcion2(): AbstractControl {
      return this.demoReactiveForm2!.controls.descripcion2;
    }

    get f2(){

      return this.demoReactiveForm2.controls;

    }

    onFileChange2(event) {



      if (event.target.files.length > 0) {

        const file = event.target.files[0];

        this.demoReactiveForm2.patchValue({

          fileSource: file

        });

      }

    }

    submit2(){

      const formData = new FormData();

      formData.append('file', this.demoReactiveForm2.get('fileSource').value);

      console.log(formData);


      // this.http.post('http://localhost:8001/upload.php', formData)

      //   .subscribe(res => {

      //     console.log(res);

      //     alert('Uploaded Successfully.');

      //   })

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

  // modal formulario
  isVisibleFormulario = false;



  showModalFormulario(): void {
    this.isVisibleFormulario = true;
  }

  handleOkFormulario(): void {

    this.isVisibleFormulario = false;
  }

  handleCancelFormulario(): void {



    this.isVisibleFormulario = false;
  }



  getTareas(){
    this.ServiciosContratados.getTareasEspeficas(this.ServicioId).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.listOfData = respuesta;
      },err=>{
        console.log(err);
        this.createNotification('error','Error al obtener las tareas: ',err);
      })
  }

  postTareas(data){
    this.gestionServicios.newTareas(data).subscribe(
      respuesta => {
        console.log(respuesta);
       if (this.documentoBase64) {
        this.posDocument(parseInt(respuesta.id), this.documentoBase64);
       }
        this.getTareas();
        this.createNotification('info','Tarea','Agregada con éxito');

      },err=>{
        console.log(err);
        this.createNotification('error','Error al enviar la nueva tarea: ',err);
      }
    )
  }


  posDocument(tarea,documento){
    const data = {tipo:'2', dependent:tarea,base64Image:documento}
    this.gestionServicios.postDocumentServiceContracted(data).subscribe(
      respuesta=>{
        console.log(respuesta);
        if (respuesta) {
          this.createNotification('info','Tareas: ','Documento cargado con éxito');

        }
      },err=>{
        console.log(err);
        this.createNotification('error','Error al enviar el documento de tareas: ',err);
      })
  }

  // conversor base64

  getBase64(event) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    let dataDocument;

    reader.readAsDataURL(file);
    reader.onload = function () {
      // me.modelvalue = reader.result;
      console.log('Documento base 64: '+ reader.result);
      me.documentoBase64 = reader.result
    };

    // console.log(this.documentoBase64)
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
 }


 editTarea(id,titulo,descripcion){

  const data = {id:id, titulo:titulo, descripcion:descripcion}
  this.gestionServicios.editarTarea(data).subscribe(respuesta=>{
    console.log(respuesta);
       if (this.documentoBase64) {
        this.posDocument(parseInt(id), this.documentoBase64);
       }
        this.getTareas();
        this.createNotification('info','Tarea','Actualizada con éxito');

  },err=>{
    console.log(err);
    this.createNotification('error','Error al actualizar tarea: ',err);
  })
 }

  eliminarTarea(id){

    console.log(id);
    this.gestionServicios.eliminarTarea(id).subscribe(respuesta=>{
    console.log(respuesta);
    if (respuesta) {
      this.getTareas();
      this.createNotification('warning','Tarea','Eliminada con éxito');
    }

  },err=>{
    console.log(err);
    this.createNotification('error','Error al eliminar tarea: ',err);
  })


 }

}
