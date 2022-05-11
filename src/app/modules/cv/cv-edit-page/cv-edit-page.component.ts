import { CV } from './../../../models/cv';
import { Component, OnInit } from '@angular/core';
import { ResumeDto } from "../../../models/resume-dto";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { ResumeService } from "../../../services/resume.service";
import { SnackBarService } from "../../../services/snack-bar.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { faAt, faGlobe, faMapMarkerAlt, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { AccountService } from 'src/app/services/account.service';
@Component({
  selector: 'app-cv-edit-page',
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
  templateForm!:ResumeDto
  public resumeEditForm: FormGroup = {} as FormGroup;

  constructor(private resumeService: ResumeService,
    private snackbarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService
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
    this.resumeEditForm.patchValue({ cvName: resume.cvName });
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

    resume.skills?.forEach(skill => {
      (<FormArray>this.resumeEditForm.controls["skills"])
        .push(new FormGroup({
          id: new FormControl(skill.id),
          skillId: new FormControl(skill.skillId),
          name: new FormControl(skill.name),
          level: new FormControl(skill.level)
        }));
    });

    resume.userLanguages?.forEach(languages => {
      (<FormArray>this.resumeEditForm.controls["userLanguages"])
        .push(new FormGroup({
          id: new FormControl(languages.id),
          languageId: new FormControl(languages.languageId),
          name: new FormControl(languages.name),
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
      cvName: new FormControl(this.resumeEditDto.cvName, [
        Validators.required
      ]),
      firstName: new FormControl(this.resumeEditDto.firstName, [
        Validators.required
      ]),
      lastName: new FormControl(this.resumeEditDto.lastName, [
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
      birthdate: new FormControl(this.resumeEditDto.birthdate, [
        Validators.required
      ]),
      aboutMe: new FormControl(this.resumeEditDto.aboutMe, [
        Validators.required
      ]),
      educations: new FormArray([]),
      experiences: new FormArray([]),
      skills: new FormArray([]),
      userLanguages: new FormArray([]),
    });
  }


  public submit(resume: ResumeDto) {
    // console.log(resume)
    this.resumeService.updateResume(resume).subscribe({
      next: () => {
        this.snackbarService.showSuccess('Created');
        this.router.navigate(['/home/cv',this.accountService.getUserId()])
      },
      error: (error) => {
        this.snackbarService.showDanger('Something went wrong!')
      }
    })
  }


}
