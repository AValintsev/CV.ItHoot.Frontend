import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ResumeService} from 'src/app/services/resume.service';
import {map} from 'rxjs/operators';
import {ResumeDto} from 'src/app/models/resume-dto';
import {UserEventService} from 'src/app/services/userEvent.service';


@Component({
  selector: 'cv-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: ['./cv-full.component.scss']
})
export class CvFullComponent implements OnInit {
  @Input() id: number = 0;
  resume!: ResumeDto;

  constructor(
    private userEventService: UserEventService,
    private route: ActivatedRoute,
    private router: Router,
    private resumeService: ResumeService) {
  }

  ngOnInit(): void {

    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.resumeService.getResumeById(id).subscribe(
        {
          next:resume=>{
            this.resume = resume
          },
          error:error=>console.log(error)
        }
        );

    });
  }

  toDataURL = async (url: string) => {
    var res = await fetch(url);
    var blob = await res.blob();

    return await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  };


  // async load() {
  //   var temp = await this.toDataURL(this.photoUrl)
  //   // @ts-ignore
  //   document.getElementById('img-full').setAttribute("src", temp as string)
  //   console.log(typeof temp)
  //   return temp
  // }

  // public openPDF2(): void {
  //   this.load().then(() => {
  //     let DATA = document.getElementById('container-cv');

  //     // @ts-ignore
  //     html2canvas(DATA).then(canvas => {

  //       let fileWidth = 208;
  //       let fileHeight = canvas.height * fileWidth / canvas.width;

  //       const FILEURI = canvas.toDataURL('image/png')
  //       let PDF = new jsPDF('p', 'mm', 'a4');
  //       let position = 0;
  //       PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

  //       PDF.save('angular-demo.pdf');
  //     });
  //   })

  // }
  // ===================================


  // pdf() {
  //   let Doc = document.getElementById('doc');
  //   if (Doc) {
  //     html2canvas(Doc).then(canvas => {

  //       let docWidth = 208;
  //       let docHeight = canvas.height * docWidth / canvas.width;

  //       const contentDataURL = canvas.toDataURL('image/png')
  //       let doc = new jsPDF('p', 'mm', 'a4');
  //       let position = 0;
  //       doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)

  //       doc.save('exportedPdf.pdf');
  //     });
  //   }

  // }




  // @ts-ignore
  // getImgFromUrl(logo_url, callback) {
  //   var img = new Image();
  //   img.src = logo_url;
  //   img.onload = function () {
  //     callback(img);
  //   };
  // }
  // change() {
  //   this.isChange = !this.isChange
  //   console.log(this.isChange)
  //   console.log(this.cv)
  // }

  // rmveLanguage(id:number) {
  //   console.log(id)
  //   this.cv.userLanguages.splice(0,id+1)
  //   console.log(this.cv.userLanguages)
  // }

  // addLanguage(language:any){
  //  this.cv.userLanguages.push(language)
  //  console.log(language);
  // }

  // addExperiences($event: any) {
  //  this.cv.experiences.push($event)
  //   console.log($event)
  // }

  // addEducations($event: any) {
  //  this.cv.educations.push($event)
  //   console.log($event)
  // }

  // addSkills($event: any) {
  //  this.cv.skills.push($event)
  //   console.log($event)
  // }

  // removeExperience(id:number) {
  //   this.cv.experiences.splice(0,id+1)
  // }

  // removeEducation(id:number) {
  //   this.cv.educations.splice(0,id+1)
  // }

  // removeSkill(id:number) {
  //   this.cv.skills.splice(0,id+1)
  // }
}
