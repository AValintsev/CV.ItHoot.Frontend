import {
  Component,
  createNgModuleRef,
  Injector,
  Input,
  NgModule,
  NgModuleRef,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ResumeDto} from "../../../models/resume/resume-dto";
import {Observable} from "rxjs";
import {ResumeService} from "../../../services/resume.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'template-builder',
  templateUrl: './template-builder.component.html',
  styleUrls: ['./template-builder.component.scss']
})
export class TemplateBuilderComponent implements OnInit {

  @ViewChild('resumeContainer', {static: true, read: ViewContainerRef}) containerRef: ViewContainerRef;
  @Input() resume: ResumeDto;
  @Input() templatedChanged: Observable<string> | null;
  @Input() templateHtml: string;
  isException: boolean = false;


  constructor(private resumeService: ResumeService,
              private injector: Injector) {


  }


  private addComponent() {
    try {
      this.containerRef.clear();
      const html = this.templateHtml;
      const componentType = Component({template: html, selector: 'template-resumes'})(class {
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
    } catch (e) {
      console.log(e)
      this.containerRef.clear();
      this.isException = true;
    }


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
    this.templatedChanged?.subscribe((html) => {
      this.templateHtml = html;
      this.addComponent();
    });
    this.isException = false;
    this.addComponent();

  }


}
