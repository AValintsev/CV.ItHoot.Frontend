import { map, takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResumeTemplateDto } from '../../../../../models/resume/resume-template-dto';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../../../../../services/resume.service';
import { SnackBarService } from '../../../../../services/snack-bar.service';
import { Subject } from 'rxjs';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { requiredFileType } from 'src/app/modules/shared/validators/file.validators';
import { saveAs } from 'file-saver';

@Component({
  selector: 'cv-resume-template-edit-page',
  templateUrl: './resume-template-edit-page.component.html',
  styleUrls: ['./resume-template-edit-page.component.scss'],
})
export class ResumeTemplateEditPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
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
  template!: ResumeTemplateDto;

  private docxFile: File | null = null;

  templateForm: UntypedFormGroup;
  isServerError: boolean = false;
  serverErrorMsg: string;

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService,
    private snackbarService: SnackBarService
  ) {

    this.templateForm = new UntypedFormGroup({
      "id": new UntypedFormControl("", Validators.required),
      "name": new UntypedFormControl("", Validators.required),
      "html": new UntypedFormControl("", Validators.required),
      "docxFile": new UntypedFormControl("", requiredFileType('docx')),
    });
  }

  ngOnInit() {
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      this.resumeService.getTemplateById(id).pipe(
        takeUntil(this.destroy$)
      ).subscribe((template) => {
        this.template = template;

        this.templateForm.controls["name"].setValue(this.template.templateName);
        this.templateForm.controls["html"].setValue(this.template.html);
        this.templateForm.controls["id"].setValue(this.template.templateId);
      });
    });
  }

  submit() {
    this.isServerError = false;

    this.template.html = this.templateForm.controls["html"].value;
    this.template.templateName = this.templateForm.controls["name"].value;
    this.template.templateId = this.templateForm.controls["id"].value;

    this.resumeService.updateTemplate(this.template).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      (template) => {
        this.template = template;
        if (this.docxFile != null) {
          this.resumeService.addDocxTemplate(this.template.templateId, this.docxFile!).subscribe(
            (data) => {
              this.snackbarService.showSuccess('Updated');
            },
            err => {
              this.serverError(err);
            }
          );
        }
        else {
          this.snackbarService.showSuccess('Updated');
        }
      },
      err => {
        this.serverError(err);
      }
    );
  }

  downloadDocxTemplate(template: ResumeTemplateDto) {
    this.resumeService.getTemplateDocx(template.templateId).subscribe((response) => {
      saveAs(response, `${template.templateName}.docx`);
    });
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

  onInit(editor: any) {
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
    }, 150);
  }

  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
