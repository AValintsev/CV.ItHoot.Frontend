import {map, takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ResumeDto} from 'src/app/models/resume/resume-dto';
import {ResumeService} from 'src/app/services/resume.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {AccountService} from 'src/app/services/account.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'cv-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss'],
})
export class CreatePageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  resumeCreateDto: ResumeDto = {} as ResumeDto;
  public resumeCreateForm: UntypedFormGroup = {} as UntypedFormGroup;
  templateForm!: ResumeDto;

  constructor(
    private resumeService: ResumeService,
    private snackbarService: SnackBarService,
    private router: Router,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.validateForm();
    this.resumeCreateDto.experiences = [];
    this.resumeCreateDto.skills = [];
    this.resumeCreateDto.educations = [];
    this.resumeCreateDto.languages = [];
    this.changeFormDate();
    this.getFieldDate();
  }

  private getFieldDate() {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$), map((params) => params.userId))
      .subscribe({
        next: (params) => {
          if (params) {
            this.resumeService.getResumeById(params).pipe(
              takeUntil(this.destroy$)
            ).subscribe({
              next: (response) => this.patchForm(response),
            });
          }
        },
        error: (error) => console.log(error),
      });
  }

  private changeFormDate() {
    this.resumeCreateForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (resume) => (this.templateForm = resume)
    );
  }

  private validateForm() {
    this.resumeCreateForm = new UntypedFormGroup({
      resumeName: new UntypedFormControl(this.resumeCreateDto.resumeName, [
        Validators.required,
      ]),
      firstName: new UntypedFormControl(this.resumeCreateDto.firstName, [
        Validators.required,
      ]),
      lastName: new UntypedFormControl(this.resumeCreateDto.lastName, [
        Validators.required,
      ]),
      position: new UntypedFormControl(this.resumeCreateDto.position, [
        Validators.required,
      ]),
      email: new UntypedFormControl(this.resumeCreateDto.email, [
        Validators.required,
        Validators.email,
      ]),
      site: new UntypedFormControl(this.resumeCreateDto.site),
      phone: new UntypedFormControl(this.resumeCreateDto.phone, [
       Validators.pattern('[- +()0-9]+'),Validators.minLength(10),
      ]),
      code: new UntypedFormControl(this.resumeCreateDto.code),
      country: new UntypedFormControl(this.resumeCreateDto.country, [
        Validators.required,
      ]),
      city: new UntypedFormControl(this.resumeCreateDto.city, [Validators.required]),
      street: new UntypedFormControl(this.resumeCreateDto.street, [
        Validators.required,
      ]),
      requiredPosition: new UntypedFormControl(this.resumeCreateDto.requiredPosition, [
        Validators.required,
      ]),
      birthdate: new UntypedFormControl(this.resumeCreateDto.birthdate, [
        Validators.required,
      ]),
      aboutMe: new UntypedFormControl(this.resumeCreateDto.aboutMe, [
        Validators.required,
      ]),
      resumeTemplateId: new UntypedFormControl(this.resumeCreateDto.resumeTemplateId, [
        Validators.required,
      ]),
      imageId:  new UntypedFormControl(this.resumeCreateDto.imageId),
      salaryRate: new UntypedFormControl(this.resumeCreateDto?.salaryRate),
      availabilityStatus: new UntypedFormControl(this.resumeCreateDto?.availabilityStatus),
      countDaysUnavailable: new UntypedFormControl(this.resumeCreateDto?.countDaysUnavailable),
      educations: new UntypedFormArray([]),
      experiences: new UntypedFormArray([]),
      skills: new UntypedFormArray([]),
      languages: new UntypedFormArray([]),
    });
  }

  patchForm(resume: ResumeDto) {
    this.resumeCreateForm.patchValue({id: resume.id});
    this.resumeCreateForm.patchValue({resumeName: resume.resumeName});
    this.resumeCreateForm.patchValue({firstName: resume.firstName});
    this.resumeCreateForm.patchValue({lastName: resume.lastName});
    this.resumeCreateForm.patchValue({email: resume.email});
    this.resumeCreateForm.patchValue({site: resume.site});
    this.resumeCreateForm.patchValue({phone: resume.phone});
    this.resumeCreateForm.patchValue({code: resume.code});
    this.resumeCreateForm.patchValue({country: resume.country});
    this.resumeCreateForm.patchValue({city: resume.city});
    this.resumeCreateForm.patchValue({street: resume.street});
    this.resumeCreateForm.patchValue({requiredPosition: resume.requiredPosition,});
    this.resumeCreateForm.patchValue({birthdate: resume.birthdate});
    this.resumeCreateForm.patchValue({aboutMe: resume.aboutMe});
    this.resumeCreateForm.patchValue({picture: resume.picture});
    this.resumeCreateForm.patchValue({position: resume.position});
    this.resumeCreateForm.patchValue({salaryRate: resume.salaryRate});
    this.resumeCreateForm.patchValue({resumeTemplateId: resume.resumeTemplateId});
    this.resumeCreateForm.patchValue({availabilityStatus: resume.availabilityStatus});
    this.resumeCreateForm.patchValue({countDaysUnavailable: resume.countDaysUnavailable});


    resume.skills?.forEach((skill) => {
      (<UntypedFormArray>this.resumeCreateForm.controls['skills']).push(
        new UntypedFormGroup({
          id: new UntypedFormControl(skill.id),
          skillId: new UntypedFormControl(skill.skillId),
          skillName: new UntypedFormControl(skill.skillName),
          level: new UntypedFormControl(skill.level),
        })
      );
    });

    resume.languages?.forEach((languages) => {
      (<UntypedFormArray>this.resumeCreateForm.controls['languages']).push(
        new UntypedFormGroup({
          id: new UntypedFormControl(languages.id),
          languageId: new UntypedFormControl(languages.languageId),
          languageName: new UntypedFormControl(languages.languageName),
          level: new UntypedFormControl(languages.level),
        })
      );
    });

    resume.educations?.forEach((education) => {
      (<UntypedFormArray>this.resumeCreateForm.controls['educations']).push(
        new UntypedFormGroup({
          id: new UntypedFormControl(education.id),
          institutionName: new UntypedFormControl(education.institutionName),
          specialization: new UntypedFormControl(education.specialization),
          description: new UntypedFormControl(education.description,),
          degree: new UntypedFormControl(education.degree),
          startDate: new UntypedFormControl(education.startDate),
          endDate: new UntypedFormControl(education.endDate),
        })
      );
    });

    resume.experiences?.forEach((experience) => {
      (<UntypedFormArray>this.resumeCreateForm.controls['experiences']).push(
        new UntypedFormGroup({
          id: new UntypedFormControl(experience.id),
          position: new UntypedFormControl(experience.position),
          description: new UntypedFormControl(experience.description),
          company: new UntypedFormControl(experience.company),
          startDate: new UntypedFormControl(experience.startDate),
          endDate: new UntypedFormControl(experience.endDate),
        })
      );
    });
  }

  public submit(resume: ResumeDto) {
    this.resumeService.createResume(resume).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.snackbarService.showSuccess('Created resume successfully')
      this.router.navigate(['/admin/resume']);
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
