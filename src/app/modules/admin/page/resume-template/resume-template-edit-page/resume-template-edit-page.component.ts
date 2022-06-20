import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ResumeTemplateDto} from "../../../../../models/resume/resume-template-dto";
import {ActivatedRoute} from "@angular/router";
import {ResumeService} from "../../../../../services/resume.service";
import {map} from "rxjs/operators";

const defaults = {
  markdown:
    '# Heading\n\nSome **bold** and _italic_ text\nBy [Scott Cooper](https://github.com/scttcper)',
  'text/typescript': `const component = {
  name: "@ctrl/ngx-codemirror",
  author: "Scott Cooper",
  repo: "https://github.com/scttcper/ngx-codemirror"
};
const hello: string = 'world';`,
};

@Component({
  selector: 'cv-resume-template-edit-page',
  templateUrl: './resume-template-edit-page.component.html',
  styleUrls: ['./resume-template-edit-page.component.scss']
})
export class ResumeTemplateEditPageComponent implements OnInit {

  readOnly = false;
  mode: keyof typeof defaults = 'markdown';
  options = {
    lineNumbers: true,
    mode: this.mode,
  };
  defaults = defaults;

  changeMode(): void {
    this.options = {
      ...this.options,
      mode: this.mode,
    };
  }

  handleChange($event: Event): void {
    console.log('ngModelChange', $event);
  }

  clear(): void {
    this.defaults[this.mode] = '';
  }

  template!:ResumeTemplateDto;

  constructor(private route: ActivatedRoute, private resumeService:ResumeService) {
    this.route.params.pipe(map(params => params['id'])).subscribe(id => {
      this.resumeService.getTemplateById(id).subscribe(template => {
        this.template = template;
      });
    });
  }
  ngOnInit() {

  }

}
