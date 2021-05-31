import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Location} from '@angular/common';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { AdministrarUserService } from 'src/app/Services/administrar-user.service';

//  editor
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { DomSanitizer } from '@angular/platform-browser';

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
  form: any;
  administrarService: boolean;
  role: any;


  constructor(private sanitizer: DomSanitizer,private administrar:AdministrarUserService, private route: ActivatedRoute,private _location: Location,private modalService: NgbModal, private formBuilder:FormBuilder) {
    this.administrarService = administrar.validarUser();
    this.role= administrar.retornarRol();
   }

  i = 1;
  editId: string | null = null;
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editId = id;
  }

  stopEdit(): void {
    this.editId = null;

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
    console.log(this.descripcion);
    console.log(this.ArchivoCap);
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.id !== id);
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
      titulo: new FormControl( ),
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
    }

    public onSubmit(): void {
      console.log( 'Form submit, model', this.demoReactiveForm.value );
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


}
