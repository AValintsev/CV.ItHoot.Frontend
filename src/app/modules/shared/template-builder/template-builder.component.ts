import {
  Component,
  createNgModuleRef,
  Injector,
  Input,
  NgModule,
  NgModuleRef,
  OnChanges,
  OnInit, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ResumeDto} from "../../../models/resume/resume-dto";
import {ResumeService} from "../../../services/resume.service";
import {CommonModule} from "@angular/common";
import {Observable} from "rxjs";

@Component({
  selector: 'template-builder',
  templateUrl: './template-builder.component.html',
  styleUrls: ['./template-builder.component.scss']
})
export class TemplateBuilderComponent implements OnInit {

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

    const properties = {resume: this.resume};

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


  ngOnInit(): void {
    if (this.resume.resumeTemplateId) {
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
