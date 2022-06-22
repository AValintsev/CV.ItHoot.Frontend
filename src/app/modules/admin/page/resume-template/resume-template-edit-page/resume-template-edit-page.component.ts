import { takeUntil } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResumeTemplateDto } from '../../../../../models/resume/resume-template-dto';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from '../../../../../services/resume.service';
import { map } from 'rxjs/operators';
import { SnackBarService } from '../../../../../services/snack-bar.service';
import { Subject } from 'rxjs';

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

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService,
    private snackbarService: SnackBarService
  ) {}

  ngOnInit() {
    this.route.params.pipe(map((params) => params['id'])).subscribe((id) => {
      this.resumeService.getTemplateById(id).pipe(
        takeUntil(this.destroy$)
      ).subscribe((template) => {
        this.template = template;
      });
    });
  }

  updateResume() {
    this.resumeService.updateTemplate(this.template).pipe(
      takeUntil(this.destroy$)
    ).subscribe((template) => {
      this.template = template;
      this.snackbarService.showSuccess('Updated');
    });
  }

  onInit(editor: any) {
    setTimeout(() => {
      editor.getAction('editor.action.formatDocument').run();
    }, 150);
  }

   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
