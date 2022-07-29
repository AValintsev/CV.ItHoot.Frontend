import {Component, OnInit} from '@angular/core';
import {ResumeTemplateDto} from "../../../../../models/resume/resume-template-dto";
import {Router} from "@angular/router";
import {ResumeService} from "../../../../../services/resume.service";
import {SnackBarService} from "../../../../../services/snack-bar.service";
import {ResumeDto} from "../../../../../models/resume/resume-dto";
import {PositionDto} from "../../../../../models/position/position-dto";
import {PreviewDialogComponent} from "../preview-dialog/preview-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {requiredFileType} from 'src/app/modules/shared/validators/file.validators';

@Component({
  selector: 'cv-resume-template-create-page',
  templateUrl: './resume-template-create-page.component.html',
  styleUrls: ['./resume-template-create-page.component.scss']
})
export class ResumeTemplateCreatePageComponent implements OnInit {

  resume:ResumeDto = {
    resumeName: 'This Test Name',
    firstName: 'Name',
    lastName: 'LastName',
    position: {positionName: 'Test Position'} as PositionDto,
    email: 'email@gmail.com',
    site: 'test-site.com',
    phone: '+38096000001',
    code: '29000',
    city: 'City',
    country: 'country',
    street: 'street',
    requiredPosition: 'required Position',
    birthdate: '11/11/2011',
    aboutMe: 'about me',
    experiences: [{
      company: 'Company Name',
      position: 'Position Name',
      description: 'description',
      startDate: '11/11/2011',
      endDate: '12/12/2012'
    }],
    educations: [{
      institutionName: 'Institution Name',
      specialization: 'Specialization Name',
      degree: 'Bachelors',
      description: 'description',
      startDate: '11/11/2011',
      endDate: '12/12/2012'
    }],
    skills: [{skillName: 'Skill name', level: 5}, {skillName: 'Skill name', level: 4}, {
      skillName: 'Skill name',
      level: 3
    }],
    languages: [{languageName: 'Language name', level: 5}, {
      languageName: 'Language name',
      level: 4
    }, {languageName: 'Language name', level: 3}]
  } as ResumeDto;

  editorOptions = {
    theme: 'vs',
    language: 'html',
    autoIndent: true,
    formatOnPaste: true,
    formatOnType: true,
    minimap: {
      enabled: false,
    },
  };

  templateForm: UntypedFormGroup;
  isServerError: boolean = false;
  serverErrorMsg: string;

  private docxFile: File | null = null;

  template!: ResumeTemplateDto;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private resumeService: ResumeService,
    private snackbarService: SnackBarService
  ) {
    this.template = {} as ResumeTemplateDto;

    this.templateForm = new UntypedFormGroup({
      "name": new UntypedFormControl("", Validators.required),
      "html": new UntypedFormControl("", Validators.required),
      "docxFile": new UntypedFormControl("", [Validators.required, requiredFileType('docx')]),
    });
  }

  ngOnInit() {
  }

  submit() {
    this.isServerError = false;

    this.template.html = this.templateForm.controls["html"].value;
    this.template.templateName = this.templateForm.controls["name"].value;

    this.resumeService.createTemplate(this.template).subscribe(
      template => {
        this.template = template;

        this.resumeService.addDocxTemplate(this.template.templateId, this.docxFile!).subscribe(
          (data) => {
            this.snackbarService.showSuccess('Created');
            this.router.navigate(['/admin/templates']);
          },
          err => {
            this.serverError(err);
          }
        );
      },
      err => {
        this.serverError(err);
      }
    );
  }

  onInit(editor: any) {
    console.log(editor);
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
    }, 150);
  }

  serverError(err: any) {
    this.isServerError = true;
    this.serverErrorMsg = err.error.message;
    console.warn(err);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.docxFile = file;
    }
  }

  viewTemplate() {
    this.dialog.open(PreviewDialogComponent, {
      width: '220mm',
      autoFocus: false,
      data: {html: this.template.html,resume:this.resume},
    });
  }
}
