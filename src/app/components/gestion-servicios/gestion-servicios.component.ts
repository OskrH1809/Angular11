import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import * as moment from 'moment';
import {NgForm} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdministrarUserService } from 'src/app/Services/administrar-user.service';
//  editor
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { DomSanitizer } from '@angular/platform-browser';
import { NzNotificationService } from 'ng-zorro-antd/notification';

interface ItemData {
  id: string;
  titulo: string;
  descripcion: string;
  documento: string;
}

@Component({
  selector: 'app-gestion-servicios',
  templateUrl: './gestion-servicios.component.html',
  styleUrls: ['./gestion-servicios.component.css']
})

export class GestionServiciosComponent implements OnInit {

  ArchivoCap:any;

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


  constructor(private notification: NzNotificationService,private sanitizer: DomSanitizer,private administrar:AdministrarUserService, private route: ActivatedRoute,private _location: Location,private modalService: NgbModal, private formBuilder:FormBuilder) {
    this.administrarService = administrar.validarUser();
    this.role= administrar.retornarRol();
   }

  i = 1;

  editId: string | null = null;
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(nombre): void {
    this.editId = null;
    this.createNotification('info','Servicio: '+`${nombre}`,'Actualizado con éxito');


  }

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


    console.log(this.demoReactiveForm2)
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

    this.createNotification('success','Nueva Tarea:'+` ${this.demoReactiveForm.value.titulo}`,'Agregada con éxito');

    this.i++;

    console.log(this.demoReactiveForm.value.titulo);
    console.log(this.ArchivoCap);
  }

  deleteRow(id: string,nombre: string ): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
    this.createNotification('warning','Tarea:'+` ${nombre}`,'Eliminada con éxito');
  }

  ngOnInit(): void {

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


}
