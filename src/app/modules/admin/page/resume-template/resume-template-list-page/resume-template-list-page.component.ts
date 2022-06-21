import {Component, OnInit} from '@angular/core';
import {ResumeTemplateDto} from "../../../../../models/resume/resume-template-dto";
import {ResumeService} from "../../../../../services/resume.service";

@Component({
  selector: 'cv-resume-template-list-page',
  templateUrl: './resume-template-list-page.component.html',
  styleUrls: ['./resume-template-list-page.component.scss']
})
export class ResumeTemplateListPageComponent implements OnInit {

  displayedColumns: string[] = ['id', 'templateName', 'action'];
  templates!:ResumeTemplateDto[];

  constructor(private resumeService:ResumeService) {
    resumeService.getAllTemplates().subscribe(templates => this.templates = templates);
  }

  ngOnInit(): void {
  }

}
