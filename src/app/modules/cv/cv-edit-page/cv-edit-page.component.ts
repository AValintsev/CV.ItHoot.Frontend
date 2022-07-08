import {map, takeUntil} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {ResumeService} from '../../../services/resume.service';
import {SnackBarService} from '../../../services/snack-bar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {Users} from 'src/app/models/users-type';
import {ResumeDto} from '../../../models/resume/resume-dto';
import {Subject} from 'rxjs';
import {UserHeaderBtnService} from 'src/app/services/user-header-btn.service';

@Component({
  selector: 'cv-cv-edit-page',
  templateUrl: './cv-edit-page.component.html',
  styleUrls: ['./cv-edit-page.component.scss'],
})
export class CvEditPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  resumeEditDto: ResumeDto | null = null;
  resumeChanged: Subject<ResumeDto> = new Subject<ResumeDto>();
  templateChanged: Subject<number> = new Subject<number>();
  public resumeEditForm: UntypedFormGroup = {} as UntypedFormGroup;

  constructor(
    private resumeService: ResumeService,
    private snackbarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private userHeaderBtnService: UserHeaderBtnService
  ) {
  }

  ngOnInit(): void {
    this.validateForm();
    this.setDataDependentToId()
    this.changeFormDate();
    this.setHeaderBtn(['back', 'create', 'menu-list'])
  }

  setDataDependentToId() {
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      this.resumeService.getResumeById(id).subscribe((resume) => {
        this.resumeEditDto = resume;
        this.patchForm(this.resumeEditDto!);
        this.resumeService.getResumeById(id).subscribe(resume => {
          this.userHeaderBtnService.setUserData({
            id: resume.id,
            firstName: resume.firstName,
            lastName: resume.lastName
          })
        })
      });
    });
  }

  setHeaderBtn(params: string[]) {
    this.userHeaderBtnService.setBTNs(params)
  }

  private changeFormDate() {
    this.resumeEditForm.valueChanges.subscribe(resume => {
      this.resumeEditDto = resume;
      this.resumeChanged.next(this.resumeEditDto!)
    });
  }

  patchForm(resume: ResumeDto) {
    this.resumeEditForm.patchValue({id: resume.id});
    this.resumeEditForm.patchValue({resumeName: resume.resumeName});
    this.resumeEditForm.patchValue({firstName: resume.firstName});
    this.resumeEditForm.patchValue({lastName: resume.lastName});
    this.resumeEditForm.patchValue({email: resume.email});
    this.resumeEditForm.patchValue({site: resume.site});
    this.resumeEditForm.patchValue({phone: resume.phone});
    this.resumeEditForm.patchValue({code: resume.code});
    this.resumeEditForm.patchValue({country: resume.country});
    this.resumeEditForm.patchValue({city: resume.city});
    this.resumeEditForm.patchValue({street: resume.street});
    this.resumeEditForm.patchValue({requiredPosition: resume.requiredPosition,});
    this.resumeEditForm.patchValue({birthdate: resume.birthdate});
    this.resumeEditForm.patchValue({aboutMe: resume.aboutMe});
    this.resumeEditForm.patchValue({picture: resume.picture});
    this.resumeEditForm.patchValue({position: resume.position});
    this.resumeEditForm.patchValue({resumeTemplateId: resume.resumeTemplateId});

    resume.skills?.forEach((skill) => {
      (<UntypedFormArray>this.resumeEditForm.controls['skills']).push(
        new UntypedFormGroup({
          id: new UntypedFormControl(skill.id),
          skillId: new UntypedFormControl(skill.skillId),
          skillName: new UntypedFormControl(skill.skillName),
          level: new UntypedFormControl(skill.level),
        })
      );
    });

    resume.languages?.forEach((languages) => {
      (<UntypedFormArray>this.resumeEditForm.controls['languages']).push(
        new UntypedFormGroup({
          id: new UntypedFormControl(languages.id),
          languageId: new UntypedFormControl(languages.languageId),
          languageName: new UntypedFormControl(languages.languageName),
          level: new UntypedFormControl(languages.level),
        })
      );
    });

    resume.educations?.forEach((education) => {
      (<UntypedFormArray>this.resumeEditForm.controls['educations']).push(
        new UntypedFormGroup({
          id: new UntypedFormControl(education.id),
          institutionName: new UntypedFormControl(education.institutionName),
          specialization: new UntypedFormControl(education.specialization),
          description: new UntypedFormControl(education.description),
          degree: new UntypedFormControl(education.degree),
          startDate: new UntypedFormControl(education.startDate),
          endDate: new UntypedFormControl(education.endDate),
        })
      );
    });

    resume.experiences?.forEach((experience) => {
      (<UntypedFormArray>this.resumeEditForm.controls['experiences']).push(
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

  validateForm() {
    this.resumeEditForm = new UntypedFormGroup({
      id: new UntypedFormControl(this.resumeEditDto?.id, [Validators.required]),
      resumeName: new UntypedFormControl(this.resumeEditDto?.resumeName, [
        Validators.required,
      ]),
      firstName: new UntypedFormControl(this.resumeEditDto?.firstName, [
        Validators.required,
      ]),
      lastName: new UntypedFormControl(this.resumeEditDto?.lastName, [
        Validators.required,
      ]),
      position: new UntypedFormControl(this.resumeEditDto?.position, [
        Validators.required,
      ]),
      birthdate: new UntypedFormControl(this.resumeEditDto?.birthdate, [
        Validators.required,
      ]),
      email: new UntypedFormControl(this.resumeEditDto?.email, [
        Validators.required,
        Validators.email,
      ]),
      site: new UntypedFormControl(this.resumeEditDto?.site),
      phone: new UntypedFormControl(this.resumeEditDto?.phone, [
        Validators.pattern('[- +()0-9]+'), Validators.minLength(10),
      ]),
      code: new UntypedFormControl(this.resumeEditDto?.code),
      country: new UntypedFormControl(this.resumeEditDto?.country, [
        Validators.required,
      ]),
      city: new UntypedFormControl(this.resumeEditDto?.city, [Validators.required]),
      street: new UntypedFormControl(this.resumeEditDto?.street, [
        Validators.required,
      ]),
      requiredPosition: new UntypedFormControl(this.resumeEditDto?.requiredPosition, [
        Validators.required,
      ]),
      aboutMe: new UntypedFormControl(this.resumeEditDto?.aboutMe, [
        Validators.required,
      ]),
      resumeTemplateId: new UntypedFormControl(this.resumeEditDto?.resumeTemplateId),
      picture: new UntypedFormControl(this.resumeEditDto?.picture),
      educations: new UntypedFormArray([]),
      experiences: new UntypedFormArray([]),
      skills: new UntypedFormArray([]),
      languages: new UntypedFormArray([]),
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

  templateChange(templateId: number) {
    this.templateChanged.next(templateId);
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
