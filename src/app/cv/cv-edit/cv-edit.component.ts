import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { CVService } from '../cv.service';
import { faGlobe, faMapMarkerAlt, faMobileAlt, faAt } from '@fortawesome/free-solid-svg-icons';
import { CV } from 'src/app/shared/models/cv';
import { map, retry } from 'rxjs/operators';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserAuthData } from 'src/app/shared/models/userAuthData';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { Language } from 'src/app/shared/models/language';
import { Experience } from '../../shared/models/experience';
import { Skill } from '../../shared/models/skill';
import { Education } from '../../shared/models/education';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-cv-edit',
  templateUrl: './cv-edit.component.html',
  styleUrls: ['./cv-edit.component.scss']
})
export class CvEditComponent implements OnInit {
  public id: string = "0";
  cvForm!: FormGroup;
  public personPhoto = '';
  fileToUploade! : File; 
  cvVithPhoto! : FormGroup;
  tempArray! : FormArray;
  faGlobe = faGlobe;
  faMapMarkerAlt = faMapMarkerAlt;
  faMobileAlt = faMobileAlt;
  faAt = faAt;
  profileForm!: FormGroup;
  removeProfileForm!:FormGroup;
  

  cv!:CV;
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


  constructor(public cVService: CVService,private route: ActivatedRoute,
    private router: Router, private _fb: FormBuilder, public datepipe: DatePipe) { }

    ngOnInit(): void {    
    this.route.params.subscribe(p => {
      this.id = p.id
    })
    
    this.cVService.getCVbyIdV2(+this.id).subscribe((response)=>{
    this.cv=response
    this.initProfileForm();
    console.log(this.cv,"цей оюэкт вернувся в запросі")
    });
    }

  
    initProfileForm(){
      this.initBaseValue(this.cv);
      this.cv.experiences.forEach(p=>this.addExperienceFromAPI(p))
      this.cv.skills.forEach(p=>this.addSkilsFromIPI(p))
      this.cv.educations.forEach(p=>this.addEducationsFromIPI(p))
      this.cv.userLanguages.forEach(p=>this.addUserLanguagesFromAPI(p))
    }
    onSubmit() {
      this.cVService.editCv(this.profileForm.value).subscribe(r=>{
      })
      // this.router.navigateByUrl("/cv/list")
    }

    get skills(){
      return this.profileForm.get('skills') as FormArray
    }
    get experiences(){
      return this.profileForm.get('experiences') as FormArray;
    }
    get userLanguages(){
      return this.profileForm.get('userLanguages') as FormArray;
    }
    get educations(){
      return this.profileForm.get('educations') as FormArray
    }

    get rskills(){
      return this.profileForm.get('rskills') as FormArray
    }
    get rexperiences(){
      return this.profileForm.get('rexperiences') as FormArray;
    }
    get ruserLanguages(){
      return this.profileForm.get('ruserLanguages') as FormArray;
    }
    get reducations(){
      return this.profileForm.get('reducations') as FormArray
    }
   
    initialRemoveValue(){
      this.removeProfileForm = this._fb.group({
        skills: this._fb.array([]),
        educations: this._fb.array([]),
        experiences: this._fb.array([]),
        userLanguages:this._fb.array([])
      })
    }

    initBaseValue(item:CV){
      this.profileForm = this._fb.group({
        id:[this.id],
        cvName: [item.cvName],
        isDraft: [item.isDraft],
        picture: [item.picture],  
        userName: [item.userName],
        lastName: [item.lastName],
        aboutMe: [item.aboutMe],
        requiredPosition: [item.requiredPosition],
        birthdate: [item.birthdate],
        about: [item.aboutMe],
        country: [item.country],
        city: [item.city],
        street: [item.street],
        code: [item.code],
        phone: [item.phone],
        email: [item.email],
        site: [item.site],
        skills: this._fb.array([]),
        educations: this._fb.array([]),
        experiences: this._fb.array([]),
        userLanguages:this._fb.array([]),
        rskills: this._fb.array([]),
        reducations: this._fb.array([]),
        rexperiences: this._fb.array([]),
        ruserLanguages:this._fb.array([]),

      })}
    addSkilsFromIPI(item:Skill){
      this.skills.push(this._fb.group({
        id: [item.id],
        name: [item.name],
        level: [item.level],
        cvId:[item.cvId]
      }))
    }
    addSkils(){
      this.skills.push(this._fb.group({
        name: [],
        level: ["1"],
        cvId:[this.cv.id]
      }))
    }
 
    

    addEducationsFromIPI(item:Education){
      this.educations.push(this._fb.group({
        id: [item.id],
        institutionName: [ (item.institutionName)],
        specialization: [item.specialization],
        degree: [item.degree],
        description: [item.description],
        startDate: [this.datepipe.transform(item.startDate,'yyyy-MM-dd')],
        endDate: [this.datepipe.transform(item.endDate,'yyyy-MM-dd')],
        cvId:[this.cv.id]
      }))
    }
    addEducations(){
      this.educations.push(this._fb.group({
        institutionName: [],
        specialization: [],
        degree: [],
        description: [],
        startDate: [],
        endDate: [],
        cvId:[this.cv.id]
      }))
    }

   


    addUserLanguagesFromAPI(item:Language){
      this.userLanguages.push(this._fb.group({
        id: [item.id],
        name: [item.name],
        level: [item.level],
        cvId:[this.cv.id],
      }))
    }

    addUserLanguages(){
      this.userLanguages.push(this._fb.group({
        name: [],
        level: ["1"],
        cvId:[this.cv.id]
      }))
    }
   
 
   
    addExperienceFromAPI(item:Experience){
      this.experiences.push(this._fb.group({
        id:[item.id],
        company: [item.company],
        position: [item.position],
        description: [item.description],
        startDate: [this.datepipe.transform(item.startDate,'yyyy-MM-dd')],
        endDate: [this.datepipe.transform(item.endDate,'yyyy-MM-dd')],
        cvId:[this.cv.id]
      }))
    }
   
    addExperience(){
      this.experiences.push(this._fb.group({
        company: [],
        position: [],
        description: [],
        startDate: [],
        endDate: [],
        cvId:[this.cv.id]
      }))
    }


    removeSkils(id:number){
      if(this.skills.at(id).value.id!= undefined){
          this.rskills.push(this.skills.at(id))
          this.skills.removeAt(id)
      }
      else{
        this.skills.removeAt(id)
      }
    }
    removeEducations(id:number){
      if(this.educations.at(id).value.id!= undefined){
        this.reducations.push(this.educations.at(id))
        this.educations.removeAt(id)
      }
      else{
        this.educations.removeAt(id)
      }
    }
    removeUserLanguages(id:number){
      if(this.userLanguages.at(id).value.id! = undefined){
        this.ruserLanguages.push(this.userLanguages.at(id))
       this.userLanguages.removeAt(id)
      }
      else this.userLanguages.removeAt(id)
    }
    removeExperience(id:number){
      if(this.experiences.at(id).value.id!= undefined){
          this.rexperiences.push(this.experiences.at(id))
          this.experiences.removeAt(id)
      }
      else this.experiences.removeAt(id)
    }
}
