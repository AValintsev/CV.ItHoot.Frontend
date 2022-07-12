import { Component, OnInit } from '@angular/core';
import { ResumeTemplateDto } from "../../../../../models/resume/resume-template-dto";
import { Router } from "@angular/router";
import { ResumeService } from "../../../../../services/resume.service";
import { SnackBarService } from "../../../../../services/snack-bar.service";
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { requiredFileType } from 'src/app/modules/shared/validators/file.validators';

@Component({
  selector: 'cv-resume-template-create-page',
  templateUrl: './resume-template-create-page.component.html',
  styleUrls: ['./resume-template-create-page.component.scss']
})
export class ResumeTemplateCreatePageComponent implements OnInit {

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

}
