import {Component, OnInit} from '@angular/core';
import {ResumeTemplateDto} from "../../../../../models/resume/resume-template-dto";
import {Router} from "@angular/router";
import {ResumeService} from "../../../../../services/resume.service";
import {SnackBarService} from "../../../../../services/snack-bar.service";

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

  template!: ResumeTemplateDto;

  constructor(
    private router: Router,
    private resumeService: ResumeService,
    private snackbarService: SnackBarService
  ) {
    this.template = {} as ResumeTemplateDto;
  }

  ngOnInit() {

  }

  createResume() {
    this.resumeService.createTemplate(this.template).subscribe(template => {
      this.template = template;
      this.snackbarService.showSuccess('Created');
      this.router.navigate(['/admin/templates']);
    });
  }

  onInit(editor: any) {
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
    }, 150);
  }

}
