import { Component, OnInit } from '@angular/core';
import { ResumeDto } from "../../../models/resume-dto";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ResumeService } from "../../../services/resume.service";
import { SnackBarService } from "../../../services/snack-bar.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { faAt, faGlobe, faMapMarkerAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';
import jsPDF from "jspdf";

@Component({
  selector: 'cv-cv-edit-page',
  templateUrl: './cv-edit-page.component.html',
  styleUrls: ['./cv-edit-page.component.scss']
})
export class CvEditPageComponent implements OnInit {

  faGlobe = faGlobe;
  faMapMarkerAlt = faMapMarkerAlt;
  faMobileAlt = faMobileAlt;
  faAt = faAt;
  resumeId: number = 0;
  resumeEditDto: ResumeDto = {} as ResumeDto;
  templateForm!: ResumeDto
  public resumeEditForm: FormGroup = {} as FormGroup;



  constructor(private resumeService: ResumeService,
    private snackbarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,

  ) {

  }

  ngOnInit(): void {
    this.validateForm()
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.resumeService.getResumeById(id).subscribe(resume => {
        this.resumeEditDto = resume;
        this.patchForm(this.resumeEditDto)
      });
    });
    this.changeFormDate()
  }
  private changeFormDate() {
    this.resumeEditForm.valueChanges.subscribe(resume => this.templateForm = resume)
  }
  patchForm(resume: ResumeDto) {
    this.resumeEditForm.patchValue({ id: resume.id });
    this.resumeEditForm.patchValue({ resumeName: resume.resumeName });
    this.resumeEditForm.patchValue({ firstName: resume.firstName });
    this.resumeEditForm.patchValue({ lastName: resume.lastName });
    this.resumeEditForm.patchValue({ email: resume.email });
    this.resumeEditForm.patchValue({ site: resume.site });
    this.resumeEditForm.patchValue({ phone: resume.phone });
    this.resumeEditForm.patchValue({ code: resume.code });
    this.resumeEditForm.patchValue({ country: resume.country });
    this.resumeEditForm.patchValue({ city: resume.city });
    this.resumeEditForm.patchValue({ street: resume.street });
    this.resumeEditForm.patchValue({ requiredPosition: resume.requiredPosition });
    this.resumeEditForm.patchValue({ birthdate: resume.birthdate });
    this.resumeEditForm.patchValue({ aboutMe: resume.aboutMe });
    this.resumeEditForm.patchValue({ picture: resume.picture });

    resume.skills?.forEach(skill => {
      (<FormArray>this.resumeEditForm.controls["skills"])
        .push(new FormGroup({
          id: new FormControl(skill.id),
          skillId: new FormControl(skill.skillId),
          skillName: new FormControl(skill.skillName),
          level: new FormControl(skill.level)
        }));
    });

    resume.languages?.forEach(languages => {
      (<FormArray>this.resumeEditForm.controls["languages"])
        .push(new FormGroup({
          id: new FormControl(languages.id),
          languageId: new FormControl(languages.languageId),
          languageName: new FormControl(languages.languageName),
          level: new FormControl(languages.level)
        }));
    });


    resume.educations?.forEach(education => {
      (<FormArray>this.resumeEditForm.controls["educations"])
        .push(new FormGroup({
          id: new FormControl(education.id),
          institutionName: new FormControl(education.institutionName),
          specialization: new FormControl(education.specialization),
          description: new FormControl(education.description),
          degree: new FormControl(education.degree),
          startDate: new FormControl(education.startDate),
          endDate: new FormControl(education.endDate),
        }))
    });

    resume.experiences?.forEach(experience => {
      (<FormArray>this.resumeEditForm.controls["experiences"])
        .push(new FormGroup({
          id: new FormControl(experience.id),
          position: new FormControl(experience.position),
          description: new FormControl(experience.description),
          company: new FormControl(experience.company),
          startDate: new FormControl(experience.startDate),
          endDate: new FormControl(experience.endDate),
        }));
    })
  }

  validateForm() {
    this.resumeEditForm = new FormGroup({
      id: new FormControl(this.resumeEditDto.id, [Validators.required]),
      resumeName: new FormControl(this.resumeEditDto.resumeName, [
        Validators.required
      ]),
      firstName: new FormControl(this.resumeEditDto.firstName, [
        Validators.required
      ]),
      lastName: new FormControl(this.resumeEditDto.lastName, [
        Validators.required
      ]),
      birthdate: new FormControl(this.resumeEditDto.birthdate, [
        Validators.required
      ]),
      email: new FormControl(this.resumeEditDto.email, [
        Validators.required,
        Validators.email
      ]),
      site: new FormControl(this.resumeEditDto.site),
      phone: new FormControl(this.resumeEditDto.phone, [
        Validators.pattern('[- +()0-9]+')
      ]),
      code: new FormControl(this.resumeEditDto.code),
      country: new FormControl(this.resumeEditDto.country, [
        Validators.required
      ]),
      city: new FormControl(this.resumeEditDto.city, [
        Validators.required
      ]),
      street: new FormControl(this.resumeEditDto.street, [
        Validators.required
      ]),
      requiredPosition: new FormControl(this.resumeEditDto.requiredPosition, [
        Validators.required
      ]),
      aboutMe: new FormControl(this.resumeEditDto.aboutMe, [
        Validators.required
      ]),
      picture: new FormControl(this.resumeEditDto.picture),
      educations: new FormArray([]),
      experiences: new FormArray([]),
      skills: new FormArray([]),
      languages: new FormArray([]),
    });
  }


  submit(resume: ResumeDto) {
    // console.log(resume)
    this.resumeService.updateResume(resume).subscribe({
      next: () => {
        this.snackbarService.showSuccess('Edited');
        this.router.navigate(['/home/cv'])
      },
      error: (error) => {
        this.snackbarService.showDanger('Something went wrong!')
      }
    })
  }

  saveAsPdf() {
    {
      // let DATA: any = document.getElementById('resume-templete');
      // html2canvas(DATA).then((canvas) => {
      //   let fileWidth = 208;
      //   // console.log(canvas.height)
      //   let fileHeight = (canvas.height * fileWidth) / canvas.width;
      //   const FILEURI = canvas.toDataURL('image/png');
      //   let PDF = new jsPDF('p', 'cm', 'a4');
      //   let position = 0;
      //   PDF.addImage(FILEURI, 'PNG', 0, 0);
      //   PDF.save('angular-demo.pdf');
      // });

      let data = document.getElementById('cv-template');
      var pdf = new jsPDF('p', 'pt', 'a4');
      pdf.html(data!, {
        callback: () => pdf.save('DOC.pdf')
      })
      // html2canvas(data!).then(canvas => {
      //   const contentDataURL = canvas.toDataURL('image/png')
      //   let pdf = new jsPDF('l', 'cm', 'a4'); //Generates PDF in landscape mode
      //   pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      //   pdf.save('Filename.pdf');
      // });
    }
  }

}
