import {map} from 'rxjs/operators';
import {
  Compiler,
  Component,
  ComponentFactoryResolver, createNgModuleRef,
  Injector, ModuleWithComponentFactories,
  NgModule,
  NgModuleRef,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {UntypedFormArray, UntypedFormControl, UntypedFormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {AccountService} from 'src/app/services/account.service';
import {ResumeDto} from 'src/app/models/resume/resume-dto';
import {ResumeService} from 'src/app/services/resume.service';
import {SnackBarService} from 'src/app/services/snack-bar.service';
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";
import {AdminCvListModule} from "../resume/admin-cv-list.module";
import {MatNativeDateModule} from "@angular/material/core";
import {AppRoutingModule} from "../../../../app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {AdminModule} from "../../admin.module";
import {Users} from "../../../../models/users-type";


@Component({
  selector: 'cv-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {

  @ViewChild('resume', {read: ViewContainerRef}) _container: ViewContainerRef;

  resumeEditDto: ResumeDto | null = null;
  templateForm!: ResumeDto;
  public resumeEditForm: UntypedFormGroup = {} as UntypedFormGroup;

  constructor(
    private resumeService: ResumeService,
    private snackbarService: SnackBarService,
    private router: Router,
    private route: ActivatedRoute,
    private accountService: AccountService,
    // private componentFactoryResolver: ComponentFactoryResolver,
    private compiler: Compiler,
    private _injector: Injector,
    // private _m: NgModuleRef<any>
  ) {
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      this.resumeService.getResumeById(id).subscribe((resume) => {
        this.resumeEditDto = resume;
        this.patchForm(this.resumeEditDto!);
        this.resumeService.getResumeHtmlById(id).subscribe((data) => {
          // document.getElementById('resume')!.innerHTML = data.html;
          this.addComponent(data.html);
        });
      });
    });
    this.validateForm();
    this.changeFormDate();
  }


  private async addComponent(html: string) {

    const resume = this.resumeEditDto;

    const tmpCmp = Component({template: html,selector:'resume-templates', moduleId:'dynamic-module'})(class {
      public resume: ResumeDto|null = resume;
    });
    const tmpModule = NgModule({imports: [CommonModule],id:'dynamic-module', declarations: [tmpCmp]})(class{});
    // const moduleRef: NgModuleRef<any> = createNgModuleRef<any>(tmpModule, this._injector);
    const componentModule = this.compiler.compileModuleAndAllComponentsSync(tmpModule);
    const factory = componentModule.componentFactories.find(c => c.selector === 'resume-templates')!.componentType;
    this._container.createComponent(factory,{injector: this._injector});
    // this._container.createComponent(tmpCmp, {ngModuleRef: moduleRef});
    // const factories = this.compiler.compileModuleAndAllComponentsSync(tmpModule);
    // const module = factories.ngModuleFactory.create(this._injector);
    // const f = factories.componentFactories[0];
    // const cmpRef = f.create(this._injector, [], null,module);
    // cmpRef.instance.name = 'dynamic';
    // console.log(module.instance)
    // console.log(cmpRef)
    // this._container.insert(cmpRef.hostView);
  }

  ngOnInit(): void {
  }

  private changeFormDate() {
    this.resumeEditForm.valueChanges.subscribe(
      (resume) => (this.templateForm = resume)
    );
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
    this.resumeEditForm.patchValue({
      requiredPosition: resume.requiredPosition,
    });
    this.resumeEditForm.patchValue({birthdate: resume.birthdate});
    this.resumeEditForm.patchValue({aboutMe: resume.aboutMe});
    this.resumeEditForm.patchValue({picture: resume.picture});
    this.resumeEditForm.patchValue({position: resume.position});
    this.resumeEditForm.patchValue({resumeTemplateId: resume.resumeTemplateId});
    this.resumeEditForm.patchValue({salaryRate: resume.salaryRate});
    this.resumeEditForm.patchValue({availabilityStatus: resume.availabilityStatus});
    this.resumeEditForm.patchValue({countDaysUnavailable: resume.countDaysUnavailable});

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
      picture: new UntypedFormControl(this.resumeEditDto?.picture),
      resumeTemplateId: new UntypedFormControl(this.resumeEditDto?.resumeTemplateId),
      salaryRate: new UntypedFormControl(this.resumeEditDto?.salaryRate),
      availabilityStatus: new UntypedFormControl(this.resumeEditDto?.availabilityStatus),
      countDaysUnavailable: new UntypedFormControl(this.resumeEditDto?.countDaysUnavailable),
      educations: new UntypedFormArray([]),
      experiences: new UntypedFormArray([]),
      skills: new UntypedFormArray([]),
      languages: new UntypedFormArray([]),
    });
  }

  submit(resume: ResumeDto) {
    // cmpRef.changeDetectorRef.detectChanges();
    // this.resumeService.updateResume(resume).subscribe({
    //   next: () => {
    //     this.snackbarService.showSuccess('Edited');
    //     const role = this.accountService.getStoreRole();
    //     if (role === Users[2]) {
    //       this.router.navigate([
    //         '/home/cv/user-list',
    //         this.accountService.getUserId(),
    //       ]);
    //     }
    //     if (role === Users[0] || role === Users[1])
    //       this.router.navigate(['/admin/resume']);
    //     else {
    //       this.router.navigate(['/home/cv']);
    //     }
    //   },
    //   error: () => {
    //     this.snackbarService.showDanger('Something went wrong!');
    //   },
    // });
  }

  ngOnDestroy() {
  }
}
