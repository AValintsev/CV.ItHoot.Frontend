import {map, takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {ResumeService} from '../../../services/resume.service';
import {SnackBarService} from '../../../services/snack-bar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {Users} from 'src/app/models/users-type';
import {ResumeDto} from '../../../models/resume/resume-dto';
import {Subject} from 'rxjs';
import { UserHeaderBtnService } from 'src/app/services/user-header-btn.service';

@Component({
  selector: 'cv-cv-edit-page',
  templateUrl: './cv-edit-page.component.html',
  styleUrls: ['./cv-edit-page.component.scss'],
})
export class CvEditPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  resumeEditDto: ResumeDto | null = null;
  templateForm!: ResumeDto;
  public resumeEditForm: FormGroup = {} as FormGroup;

  constructor(
    private resumeService: ResumeService,
    private snackbarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private userHeaderBtnService:UserHeaderBtnService
  ) {}

  ngOnInit(): void {
    this.validateForm();
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      this.resumeService.getResumeById(id).pipe(
        takeUntil(this.destroy$)
      ).subscribe((resume) => {
        this.resumeEditDto = resume;
        this.patchForm(this.resumeEditDto!);
      });
    });

    this.changeFormDate();
    this.setHeaderBtn(['back','create'])
  }

  setHeaderBtn(params:string[]){
    this.userHeaderBtnService.setBTNs(params)
  }
  private changeFormDate() {
    this.resumeEditForm.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (resume) => (this.templateForm = resume)
    );
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
    this.resumeEditForm.patchValue({requiredPosition: resume.requiredPosition,});
    this.resumeEditForm.patchValue({ birthdate: resume.birthdate });
    this.resumeEditForm.patchValue({ aboutMe: resume.aboutMe });
    this.resumeEditForm.patchValue({ picture: resume.picture });
    this.resumeEditForm.patchValue({ position: resume.position });
    this.resumeEditForm.patchValue({ resumeTemplateId: resume.resumeTemplateId });

    resume.skills?.forEach((skill) => {
      (<FormArray>this.resumeEditForm.controls['skills']).push(
        new FormGroup({
          id: new FormControl(skill.id),
          skillId: new FormControl(skill.skillId),
          skillName: new FormControl(skill.skillName),
          level: new FormControl(skill.level),
        })
      );
    });

    resume.languages?.forEach((languages) => {
      (<FormArray>this.resumeEditForm.controls['languages']).push(
        new FormGroup({
          id: new FormControl(languages.id),
          languageId: new FormControl(languages.languageId),
          languageName: new FormControl(languages.languageName),
          level: new FormControl(languages.level),
        })
      );
    });

    resume.educations?.forEach((education) => {
      (<FormArray>this.resumeEditForm.controls['educations']).push(
        new FormGroup({
          id: new FormControl(education.id),
          institutionName: new FormControl(education.institutionName),
          specialization: new FormControl(education.specialization),
          description: new FormControl(education.description),
          degree: new FormControl(education.degree),
          startDate: new FormControl(education.startDate),
          endDate: new FormControl(education.endDate),
        })
      );
    });

    resume.experiences?.forEach((experience) => {
      (<FormArray>this.resumeEditForm.controls['experiences']).push(
        new FormGroup({
          id: new FormControl(experience.id),
          position: new FormControl(experience.position),
          description: new FormControl(experience.description),
          company: new FormControl(experience.company),
          startDate: new FormControl(experience.startDate),
          endDate: new FormControl(experience.endDate),
        })
      );
    });
  }

  validateForm() {
    this.resumeEditForm = new FormGroup({
      id: new FormControl(this.resumeEditDto?.id, [Validators.required]),
      resumeName: new FormControl(this.resumeEditDto?.resumeName, [
        Validators.required,
      ]),
      firstName: new FormControl(this.resumeEditDto?.firstName, [
        Validators.required,
      ]),
      lastName: new FormControl(this.resumeEditDto?.lastName, [
        Validators.required,
      ]),
      position: new FormControl(this.resumeEditDto?.position, [
        Validators.required,
      ]),
      birthdate: new FormControl(this.resumeEditDto?.birthdate, [
        Validators.required,
      ]),
      email: new FormControl(this.resumeEditDto?.email, [
        Validators.required,
        Validators.email,
      ]),
      site: new FormControl(this.resumeEditDto?.site),
      phone: new FormControl(this.resumeEditDto?.phone, [
       Validators.pattern('[- +()0-9]+'),Validators.minLength(10),
      ]),
      code: new FormControl(this.resumeEditDto?.code),
      country: new FormControl(this.resumeEditDto?.country, [
        Validators.required,
      ]),
      city: new FormControl(this.resumeEditDto?.city, [Validators.required]),
      street: new FormControl(this.resumeEditDto?.street, [
        Validators.required,
      ]),
      requiredPosition: new FormControl(this.resumeEditDto?.requiredPosition, [
        Validators.required,
      ]),
      aboutMe: new FormControl(this.resumeEditDto?.aboutMe, [
        Validators.required,
      ]),
      resumeTemplateId: new FormControl(this.resumeEditDto?.resumeTemplateId),
      picture: new FormControl(this.resumeEditDto?.picture),
      educations: new FormArray([]),
      experiences: new FormArray([]),
      skills: new FormArray([]),
      languages: new FormArray([]),
    });
  }

  submit(resume: ResumeDto) {
    if (this.resumeEditForm.valid) {
      this.resumeService.updateResume(resume).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.snackbarService.showSuccess('Edited');
          const role = this.accountService.getStoreRole();
          if (role === Users[2]) {
            this.router.navigate([
              '/home/cv/user-list',
              this.accountService.getUserId(),
            ]);
          }
          if (role === Users[0] || role === Users[1])
            this.router.navigate(['/admin/resume']);
          else {
            this.router.navigate(['/home/cv']);
          }
        },
        error: () => {
          this.snackbarService.showDanger('Something went wrong!');
        },
      });
    }
  }
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
