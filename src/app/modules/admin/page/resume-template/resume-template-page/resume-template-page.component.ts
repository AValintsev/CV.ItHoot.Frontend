import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {ResumeTemplateDto} from "../../../../../models/resume/resume-template-dto";
import {ResumeService} from "../../../../../services/resume.service";

@Component({
  selector: 'cv-resume-template-page',
  templateUrl: './resume-template-page.component.html',
  styleUrls: ['./resume-template-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResumeTemplatePageComponent implements OnInit,OnDestroy {

  template!:ResumeTemplateDto;

  constructor(private route: ActivatedRoute, private resumeService:ResumeService) {
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.resumeService.getTemplateById(id).subscribe(template => {
        this.template = template;
        document.getElementById('resume')!.innerHTML = this.template.html;
      });
    });
  }

  ngOnInit(): void {
  }
  ngOnDestroy() { }
}
