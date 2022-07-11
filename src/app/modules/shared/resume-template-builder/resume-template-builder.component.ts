import {
  Component,
  createNgModuleRef,
  Injector,
  Input,
  NgModule,
  NgModuleRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import {ResumeDto} from "../../../models/resume/resume-dto";
import {ResumeService} from "../../../services/resume.service";
import {CommonModule} from "@angular/common";
import {Observable} from "rxjs";

@Component({
  selector: 'resume-template-builder',
  templateUrl: './resume-template-builder.component.html',
  styleUrls: ['./resume-template-builder.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResumeTemplateBuilderComponent implements OnInit {

  @ViewChild('resumeContainer', {read: ViewContainerRef}) containerRef: ViewContainerRef;
  @Input() resume: ResumeDto;
  @Input() imports = [];
  @Input() resumeChanged: Observable<ResumeDto> | null;
  @Input() templatedChanged: Observable<number> | null;
  templateHtml: string;
  loaded: boolean = false;

  constructor(private resumeService: ResumeService,
              private injector: Injector) {
  }

  private addComponent() {
    this.containerRef.clear();
    const html = this.templateHtml;
    const componentType = Component({template: html, selector: 'template-resume'})(class {
    });
    const moduleType = NgModule({imports: [CommonModule], declarations: [componentType]})(class {
    });

    const properties = {
      resume: this.resume,
      getYear: this.getYear,
      getMonth: this.getMonth,
      howOld: this.howOld
    };

    const moduleRef: NgModuleRef<any> = createNgModuleRef(moduleType, this.injector);
    const component: any = this.containerRef.createComponent(componentType, {
      injector: this.injector,
      ngModuleRef: moduleRef
    });
    Object.assign(component.instance, properties);

    this.resumeChanged?.subscribe((resume) => {
      component.instance.resume = resume;
    })

    this.loaded = true;
  }

  howOld(birthDay: string) {
    return Math.floor(new Date(Date.now()).getFullYear() - new Date(birthDay!).getFullYear())
  }

  getYear(startDate: string, endDate: string) {
    let start = Date.parse(startDate)
    let end = Date.parse(endDate)
    if (end >= start) {
      let time = end - start;
      return Math.floor(time / (1000 * 60 * 60 * 24 * 30 * 12));
    }
    return 0
  }

  getMonth(startDate: string, endDate: string) {
    let start = Date.parse(startDate)
    let end = Date.parse(endDate)
    if (end >= start) {
      let time = end - start;
      return Math.floor(time / (1000 * 60 * 60 * 24 * 30) % 12);
    }
    return 0
  }


  ngOnInit(): void {
    if (this.resume?.resumeTemplateId) {
      this.resumeService.getTemplateById(this.resume?.resumeTemplateId).subscribe(data => {
        this.templateHtml = data.html;
        this.addComponent();
      });
    }

    this.templatedChanged?.subscribe((templateId) => {
      this.resumeService.getTemplateById(templateId).subscribe(data => {
        this.templateHtml = data.html;
        this.addComponent();
      });
    });
  }

}
