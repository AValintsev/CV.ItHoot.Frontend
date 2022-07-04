import {map, takeUntil} from 'rxjs/operators';
import {AccountService} from '../../../services/account.service';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {ResumeService} from "../../../services/resume.service";
import {SnackBarService} from "../../../services/snack-bar.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ResumeDto} from "../../../models/resume/resume-dto";
import {Users} from 'src/app/models/users-type';
import {Subject} from 'rxjs';

@Component({
  selector: 'cv-cv-create-page',
  templateUrl: './cv-create-page.component.html',
  styleUrls: ['./cv-create-page.component.scss']
})
export class CvCreatePageComponent implements OnInit,OnDestroy,OnDestroy {
  private destroy$ = new Subject<boolean>();
  resumeCreateDto: ResumeDto = {} as ResumeDto;
  public resumeCreateForm: FormGroup = {} as FormGroup;
  templateForm!: ResumeDto
  constructor(private resumeService: ResumeService,
    private snackbarService: SnackBarService,
    private router: Router,
    private accountService: AccountService,
    private activatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.validateForm();
    this.resumeCreateDto.experiences = [];
    this.resumeCreateDto.skills = [];
    this.resumeCreateDto.educations = [];
    this.resumeCreateDto.languages = [];
    this.changeFormDate()
    this.getFieldDate()
  }
  private getFieldDate() {
    this.activatedRoute.queryParams.pipe(
      takeUntil(this.destroy$),
      map(params=>params.userId)).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
      next:params=>{
        if(params){
           this.resumeService.getResumeById(params).pipe(
            takeUntil(this.destroy$)
          ).subscribe({
             next:response=>{
              this.patchForm(response)
             },
           })
        }
      },
      error:error=>console.log(error)
    })
  }

  private changeFormDate() {
    this.resumeCreateForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(resume => this.templateForm = resume)
  }
  private validateForm() {
    this.resumeCreateForm = new FormGroup({
      resumeName: new FormControl(this.resumeCreateDto.resumeName, [
        Validators.required
      ]),
      firstName: new FormControl(this.resumeCreateDto.firstName, [
        Validators.required
      ]),
      lastName: new FormControl(this.resumeCreateDto.lastName, [
        Validators.required
      ]),
      position: new FormControl(this.resumeCreateDto.position,[
        Validators.required
      ]),
      email: new FormControl(this.resumeCreateDto.email, [
        Validators.required,
        Validators.email
      ]),
      site: new FormControl(this.resumeCreateDto.site),
      phone: new FormControl(this.resumeCreateDto.phone, [
       Validators.pattern('[- +()0-9]+'),Validators.minLength(10)
      ]),
      code: new FormControl(this.resumeCreateDto.code),
      country: new FormControl(this.resumeCreateDto.country, [
        Validators.required
      ]),
      city: new FormControl(this.resumeCreateDto.city, [
        Validators.required
      ]),
      street: new FormControl(this.resumeCreateDto.street, [
        Validators.required
      ]),
      requiredPosition: new FormControl(this.resumeCreateDto.requiredPosition, [
        Validators.required
      ]),
      birthdate: new FormControl(this.resumeCreateDto.requiredPosition, [
        Validators.required
      ]),
      aboutMe: new FormControl(this.resumeCreateDto.requiredPosition, [
        Validators.required
      ]),
      resumeTemplateId: new FormControl(this.resumeCreateDto.resumeTemplateId, [
        Validators.required
      ]),
      educations: new FormArray([]),
      experiences: new FormArray([]),
      skills: new FormArray([]),
      languages: new FormArray([]),
    });
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
      (<FormArray>this.resumeCreateForm.controls["skills"])
        .push(new FormGroup({
          id: new FormControl(skill.id),
          skillId: new FormControl(skill.skillId),
          skillName: new FormControl(skill.skillName),
          level: new FormControl(skill.level)
        }));
    });

    resume.languages?.forEach(languages => {
      (<FormArray>this.resumeCreateForm.controls["languages"])
        .push(new FormGroup({
          id: new FormControl(languages.id),
          languageId: new FormControl(languages.languageId),
          languageName: new FormControl(languages.languageName),
          level: new FormControl(languages.level)
        }));
    });


    resume.educations?.forEach(education => {
      (<FormArray>this.resumeCreateForm.controls["educations"])
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
      (<FormArray>this.resumeCreateForm.controls["experiences"])
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


  public submit(resume: ResumeDto) {
    this.resumeService.createResume(resume).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
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
    ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
