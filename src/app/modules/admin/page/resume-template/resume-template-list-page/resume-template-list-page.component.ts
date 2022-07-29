import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ResumeTemplateDto} from '../../../../../models/resume/resume-template-dto';
import {ResumeService} from '../../../../../services/resume.service';
import {saveAs} from 'file-saver';

@Component({
  selector: 'cv-resume-template-list-page',
  templateUrl: './resume-template-list-page.component.html',
  styleUrls: ['./resume-template-list-page.component.scss'],
})
export class ResumeTemplateListPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();
  // displayedColumns: string[] = ['id', 'templateName', 'action'];
  displayedColumns: string[] = [ 'action','templateName'];
  templates!: ResumeTemplateDto[];

  constructor(private resumeService: ResumeService) {
    resumeService
      .getAllTemplates().pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((templates) => (this.templates = templates));
  }

  ngOnInit(): void {}
   ngOnDestroy(){
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

  downloadDocxTemplate(template: ResumeTemplateDto) {
    this.resumeService.getTemplateDocx(template.templateId).subscribe((response) => {
      saveAs(response, `${template.templateName}.docx`);
    });
  }
}
