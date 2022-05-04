import { Component, OnInit } from '@angular/core';
import { faGlobe, faMapMarkerAlt, faMobileAlt, faAt } from '@fortawesome/free-solid-svg-icons';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { CVService } from '../../../services/cv.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CV } from 'src/app/models/cv';
//import { Observable } from 'rxjs';
@Component({
  selector: 'app-cv-create',
  templateUrl: './cv-create.component.html',
  styleUrls: ['../../../shared/styles/cvcreate.scss']
})
export class CvCreateComponent implements OnInit {
  cvForm!: FormGroup;
  public personPhoto = '';
  fileToUpload! : File;
  cvWithPhoto! : FormGroup;

  faGlobe = faGlobe;
  faMapMarkerAlt = faMapMarkerAlt;
  faMobileAlt = faMobileAlt;
  faAt = faAt;

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],

    uploadUrl: 'v1/image',
    upload: (file: File) : any => {},
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
};

  constructor(public cVService: CVService, private router: Router) { }

  ngOnInit(): void {
    this.cvForm = new FormGroup({

        cvName: new FormControl(''),
        isDraft: new FormControl(true),
        picture: new FormControl(null),
        userName: new FormControl(''),
        lastName: new FormControl(''),
        aboutMe: new FormControl(''),
        requiredPosition: new FormControl(''),
        birthdate: new FormControl(''),
        about: new FormControl(''),
        country: new FormControl(''),
        city: new FormControl(''),
        street: new FormControl(''),
        code: new FormControl(''),
        phone: new FormControl(''),
        email: new FormControl(''),
        site: new FormControl(''),
      skills: new FormArray([]),

      educations: new FormArray([]),
      experiences: new FormArray([]),
      userLanguages: new FormArray([])
    });
    this.cvWithPhoto = new FormGroup({
      CvId: new FormControl(true),
      File: new FormControl('')
    })
  }

  onInput(event: any) {
  }

  onSubmit() {
    // this.cvForm.get('picture')?.setValue(this.fileToUploade)
    const formData = {...this.cvForm.value}
    console.log("formData ", formData);
    this.cVService.createCV(formData).subscribe(
      (resault) => {

        this.createFileToCv(resault)
        this.router.navigateByUrl('home/cv')

      });
  }

  createFileToCv(id:any){
      let formData = new FormData()
      formData.append('CvId',id);
      formData.append('File',this.fileToUpload,'namefile')
      this.cVService.loadingFileToCv(formData).subscribe(r => {
      });
  }

  getFormsControls(title: string) : FormArray{
    return this.cvForm.controls[title] as FormArray;
  }

  addSkill() {
    (<FormArray>this.cvForm.controls["skills"])
    .push( new FormGroup({
                name: new FormControl,
                level: new FormControl('1')
              }));
  }

  removeSkill(index: number){
    (<FormArray>this.cvForm.controls["skills"]).removeAt(index);
  }

  addEducation() {
    (<FormArray>this.cvForm.controls["educations"])
      .push( new FormGroup({
                  startDate: new FormControl,
                  endDate: new FormControl,
                  institutionName: new FormControl,
                  specialization: new FormControl,
                  degree: new FormControl,
                  description: new FormControl
                })
      );
  }

  removeEducation(index: number){
    (<FormArray>this.cvForm.controls["educations"]).removeAt(index);
  }

  addExperience() {
    (<FormArray>this.cvForm.controls["experiences"])
      .push( new FormGroup({
                  startDate: new FormControl,
                  endDate: new FormControl,
                  company: new FormControl,
                  position: new FormControl,
                  description: new FormControl
                })
      );
  }

  removeExperience(index: number){
    (<FormArray>this.cvForm.controls["experiences"]).removeAt(index);
  }

  addLanguage() {
    (<FormArray>this.cvForm.controls["userLanguages"])
    .push( new FormGroup({
                name: new FormControl,
                level: new FormControl('1')
              }));
  }

  removeLanguage(index: number){
    (<FormArray>this.cvForm.controls["userLanguages"]).removeAt(index);
  }

  onSelectPhoto(event: any) {
    this.fileToUpload= event.target.files[0];
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        this.personPhoto = <string>reader.result || "";
    };
  }
}

