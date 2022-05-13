import { AccountService } from 'src/app/services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CVService } from '../../../services/cv.service';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { faAt, faGlobe, faMapMarkerAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { CV } from 'src/app/models/cv';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeService } from 'src/app/services/resume.service';
import { map, catchError } from 'rxjs/operators';
import { ResumeDto } from 'src/app/models/resume-dto';
import { UserEventService } from 'src/app/services/userEvent.service';
import { Users } from 'src/app/models/users-type';

// import objectContaining = jasmine.objectContaining;

@Component({
  selector: 'app-cv-full',
  templateUrl: './cv-full.component.html',
  styleUrls: [
    '../../../shared/styles/cvfull.scss',
    './cv-full.component.scss']
})
export class CvFullComponent implements OnInit {
  // @ViewChild('doc') doc!: ElementRef
  @Input() id: number = 0;
  public cv$!: Observable<CV>;


  photoUrl!: string
  photoString!: string;
  isChange: boolean = false;
  userId$!: Observable<string>
  cv!: ResumeDto;

  constructor(
    private userEventService: UserEventService,
    private route: ActivatedRoute,
    private router: Router,
    private resumeService: ResumeService,
    private accountService: AccountService
  ) {

  }

  name = 'Angular'

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id'])
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.userEventService.setUserId(id)
      this.resumeService.getAllResume().subscribe({
        next: next => {
          if (next[0]){
            this.resumeService.getResumeById(next[0].id).pipe(
              catchError(error => {
                if (this.accountService.getStoreRole() === Users[2]) {
                  if (error instanceof HttpErrorResponse && error.status === 400) {
                    this.router.navigate([`/home/cv/create`])
                  }
                }
                return of(error)
              })
            ).subscribe(resume => {
              this.cv = resume;
            });
          }else{
            this.router.navigate([`/home/cv/create`])
          }
        
        },
        error: error => { }
      }
      )

    });
  }

  toDataURL = async (url: string) => {
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


  async load() {
    var temp = await this.toDataURL(this.photoUrl)
    // @ts-ignore
    document.getElementById('img-full').setAttribute("src", temp as string)
    console.log(typeof temp)
    return temp
  }

  public openPDF2(): void {
    this.load().then(() => {
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
  // ===================================


  pdf() {
    let Doc = document.getElementById('doc');
    if (Doc) {
      html2canvas(Doc).then(canvas => {

        let docWidth = 208;
        let docHeight = canvas.height * docWidth / canvas.width;

        const contentDataURL = canvas.toDataURL('image/png')
        let doc = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)

        doc.save('exportedPdf.pdf');
      });
    }

  }




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
