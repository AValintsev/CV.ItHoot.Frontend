import {map} from 'rxjs/operators';
import {AccountService} from '../../../services/account.service';
import {Component, OnInit} from '@angular/core';
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ResumeService} from "../../../services/resume.service";
import {SnackBarService} from "../../../services/snack-bar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ResumeDto} from "../../../models/resume/resume-dto";
import {Users} from 'src/app/models/users-type';
import {Subject} from 'rxjs';
import {UserHeaderBtnService} from 'src/app/services/user-header-btn.service';

@Component({
  selector: 'cv-cv-create-page',
  templateUrl: './cv-create-page.component.html',
  styleUrls: ['./cv-create-page.component.scss']
})
export class CvCreatePageComponent implements OnInit {
  resumeCreateDto: ResumeDto = {} as ResumeDto;
  resumeChanged: Subject<ResumeDto> = new Subject<ResumeDto>();
  templateChanged: Subject<number> = new Subject<number>();
  resumeCreateForm: UntypedFormGroup = {} as UntypedFormGroup;


  constructor(private resumeService: ResumeService,
    private snackbarService: SnackBarService,
    private router: Router,
    private accountService: AccountService,
    private activatedRoute:ActivatedRoute,
    private userHeaderBtnService:UserHeaderBtnService
  ) { }

  ngOnInit(): void {
    this.validateForm();
    this.resumeCreateDto.experiences = [];
    this.resumeCreateDto.skills = [];
    this.resumeCreateDto.educations = [];
    this.resumeCreateDto.languages = [];
    this.changeFormDate()
    this.getFieldDate()
    this.setHeaderBtn(['back','menu-list'])
  }

  setHeaderBtn(params:string[]){
    this.userHeaderBtnService.setBTNs(params)
  }

  private changeFormDate() {
    this.resumeCreateForm.valueChanges.subscribe(resume =>{
      this.resumeCreateDto = resume;
      this.resumeChanged.next(resume);
    })
  }
  private validateForm() {
    this.resumeCreateForm = new UntypedFormGroup({
      resumeName: new UntypedFormControl(this.resumeCreateDto.resumeName, [
        Validators.required
      ]),
      firstName: new UntypedFormControl(this.resumeCreateDto.firstName, [
        Validators.required
      ]),
      lastName: new UntypedFormControl(this.resumeCreateDto.lastName, [
        Validators.required
      ]),
      position: new UntypedFormControl(this.resumeCreateDto.position,[
        Validators.required
      ]),
      email: new UntypedFormControl(this.resumeCreateDto.email, [
        Validators.required,
        Validators.email
      ]),
      site: new UntypedFormControl(this.resumeCreateDto.site),
      phone: new UntypedFormControl(this.resumeCreateDto.phone, [
       Validators.pattern('[- +()0-9]+'),Validators.minLength(10)
      ]),
      code: new UntypedFormControl(this.resumeCreateDto.code),
      country: new UntypedFormControl(this.resumeCreateDto.country, [
        Validators.required
      ]),
      city: new UntypedFormControl(this.resumeCreateDto.city, [
        Validators.required
      ]),
      street: new UntypedFormControl(this.resumeCreateDto.street, [
        Validators.required
      ]),
      requiredPosition: new UntypedFormControl(this.resumeCreateDto.requiredPosition, [
        Validators.required
      ]),
      birthdate: new UntypedFormControl(this.resumeCreateDto.requiredPosition, [
        Validators.required
      ]),
      aboutMe: new UntypedFormControl(this.resumeCreateDto.requiredPosition, [
        Validators.required
      ]),
      resumeTemplateId: new UntypedFormControl(this.resumeCreateDto.resumeTemplateId, [
        Validators.required
      ]),
      imageId:  new UntypedFormControl(this.resumeCreateDto.imageId),
      educations: new UntypedFormArray([]),
      experiences: new UntypedFormArray([]),
      skills: new UntypedFormArray([]),
      languages: new UntypedFormArray([]),
    });
  }

  private getFieldDate() {
    this.activatedRoute.queryParams.pipe(map(params=>params.userId)).subscribe({
      next:params=>{
        if(params){
          this.resumeService.getResumeById(params).subscribe(resume=>{
              this.patchForm(resume)
                this.templateChanged.next(resume.resumeTemplateId);
          })
        }
      },
      error:error=>console.log(error)
    })
  }

  patchForm(resume: ResumeDto) {
    this.resumeCreateForm.patchValue({ id: resume.id });
    this.resumeCreateForm.patchValue({ resumeName: resume.resumeName });
    this.resumeCreateForm.patchValue({ firstName: resume.firstName });
    this.resumeCreateForm.patchValue({ lastName: resume.lastName });
    this.resumeCreateForm.patchValue({ email: resume.email });
    this.resumeCreateForm.patchValue({ site: resume.site });
    this.resumeCreateForm.patchValue({ phone: resume.phone });
    this.resumeCreateForm.patchValue({ code: resume.code });
    this.resumeCreateForm.patchValue({ country: resume.country });
    this.resumeCreateForm.patchValue({ city: resume.city });
    this.resumeCreateForm.patchValue({ street: resume.street });
    this.resumeCreateForm.patchValue({ requiredPosition: resume.requiredPosition });
    this.resumeCreateForm.patchValue({ birthdate: resume.birthdate });
    this.resumeCreateForm.patchValue({ aboutMe: resume.aboutMe });
    this.resumeCreateForm.patchValue({ picture: resume.picture });
    this.resumeCreateForm.patchValue({ position: resume.position });
    this.resumeCreateForm.patchValue({ resumeTemplateId: resume.resumeTemplateId });
    resume.skills?.forEach(skill => {
      (<UntypedFormArray>this.resumeCreateForm.controls["skills"])
        .push(new UntypedFormGroup({
          id: new UntypedFormControl(skill.id),
          skillId: new UntypedFormControl(skill.skillId),
          skillName: new UntypedFormControl(skill.skillName),
          level: new UntypedFormControl(skill.level)
        }));
    });

    resume.languages?.forEach(languages => {
      (<UntypedFormArray>this.resumeCreateForm.controls["languages"])
        .push(new UntypedFormGroup({
          id: new UntypedFormControl(languages.id),
          languageId: new UntypedFormControl(languages.languageId),
          languageName: new UntypedFormControl(languages.languageName),
          level: new UntypedFormControl(languages.level)
        }));
    });


    resume.educations?.forEach(education => {
      (<UntypedFormArray>this.resumeCreateForm.controls["educations"])
        .push(new UntypedFormGroup({
          id: new UntypedFormControl(education.id),
          institutionName: new UntypedFormControl(education.institutionName),
          specialization: new UntypedFormControl(education.specialization),
          description: new UntypedFormControl(education.description),
          degree: new UntypedFormControl(education.degree),
          startDate: new UntypedFormControl(education.startDate),
          endDate: new UntypedFormControl(education.endDate),
        }))
    });

    resume.experiences?.forEach(experience => {
      (<UntypedFormArray>this.resumeCreateForm.controls["experiences"])
        .push(new UntypedFormGroup({
          id: new UntypedFormControl(experience.id),
          position: new UntypedFormControl(experience.position),
          description: new UntypedFormControl(experience.description),
          company: new UntypedFormControl(experience.company),
          startDate: new UntypedFormControl(experience.startDate),
          endDate: new UntypedFormControl(experience.endDate),
        }));
    })
  }


  public submit(resume: ResumeDto) {
    this.resumeService.createResume(resume).subscribe({
      next: () => {
        this.snackbarService.showSuccess('Created');
        if (this.accountService.getStoreRole() === Users[2]) {
          this.router.navigate(['/home/cv/user-list'])
        } else {
          this.router.navigate(['/home/cv'])
        }

      },
      error: () => {
        this.snackbarService.showDanger('Something went wrong!')
      }
    })
  }
  templateChange(templateId: number) {
    this.templateChanged.next(templateId);
  }
}
