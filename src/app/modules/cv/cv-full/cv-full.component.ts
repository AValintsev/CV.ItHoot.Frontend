import { Component, Input, OnInit } from '@angular/core';
import { CVService } from '../../../services/cv.service';
import {interval, Observable} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { faGlobe, faMapMarkerAlt, faMobileAlt, faAt } from '@fortawesome/free-solid-svg-icons';
import { CV } from 'src/app/shared/models/cv';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {filter, map, take} from "rxjs/operators";
// import objectContaining = jasmine.objectContaining;

@Component({
  selector: 'app-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: [
    '../../../shared/styles/cvfull.scss',
    './cv-full.component.scss']
})
export class CvFullComponent implements OnInit {
  @Input() id: number = 0;
  public cv$!: Observable<CV>;

  faGlobe = faGlobe;
  faMapMarkerAlt = faMapMarkerAlt;
  faMobileAlt = faMobileAlt;
  faAt = faAt;
  photoUrl!:string
  photoString!: string;
  isChange:boolean=false;
  cv!:CV;

  constructor(public cVService: CVService,private route: ActivatedRoute,
    private router: Router) {

     }

  name ='Angular'

  ngOnInit(): void {
    this.route.params.subscribe(params=>this.id=params['id']);
    this.cv$ = this.cVService.cv$;
    this.cVService.getCVbyId(this.id).subscribe(data => {
      this.photoUrl = data.picture
      this.cv = data
    });
  }

  toDataURL = async (url: string ) => {
    console.log("Downloading image...");
    var res = await fetch(url);
    var blob = await res.blob();

    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
    return result
  };


 async load(){
    var temp = await this.toDataURL(this.photoUrl)
    // @ts-ignore
   document.getElementById('img-full').setAttribute("src",temp as string)
    console.log(typeof temp)
    return temp
  }

  public openPDF2():void {
   this.load().then(()=>{
     let DATA = document.getElementById('container-cv');

     // @ts-ignore
     html2canvas(DATA).then(canvas => {

       let fileWidth = 208;
       let fileHeight = canvas.height * fileWidth / canvas.width;

       const FILEURI = canvas.toDataURL('image/png')
       let PDF = new jsPDF('p', 'mm', 'a4');
       let position = 0;
       PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

       PDF.save('angular-demo.pdf');
     });
   })

  }
  // @ts-ignore
  getImgFromUrl(logo_url, callback) {
    var img = new Image();
    img.src = logo_url;
    img.onload = function () {
      callback(img);
    };
  }
  change() {
    this.isChange = !this.isChange
    console.log(this.isChange)
    console.log(this.cv)
  }

  rmveLanguage(id:number) {
    console.log(id)
    this.cv.userLanguages.splice(0,id+1)
    console.log(this.cv.userLanguages)
  }

  addLanguage(language:any){
   this.cv.userLanguages.push(language)
   console.log(language);
  }

  addExperiences($event: any) {
   this.cv.experiences.push($event)
    console.log($event)
  }

  addEducations($event: any) {
   this.cv.educations.push($event)
    console.log($event)
  }

  addSkills($event: any) {
   this.cv.skills.push($event)
    console.log($event)
  }

  removeExperience(id:number) {
    this.cv.experiences.splice(0,id+1)
  }

  removeEducation(id:number) {
    this.cv.educations.splice(0,id+1)
  }

  removeSkill(id:number) {
    this.cv.skills.splice(0,id+1)
  }
}
